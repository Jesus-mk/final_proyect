
const express = require("express");
const router = express.Router();
const { MongoClient } = require('mongodb');

const User = require("../models/users.js");
const Company = require("../models/companies.js");
const bcrypt = require('bcrypt');

const { verifyToken } = require("../middlewares/auth");
const { blockAdmin, blockUser } = require("../middlewares/authorization");
const { metaProtection, adminProtection, cifProtection } = require("../middlewares/protection");

const tools = require("../config/tools");
const response = require("../config/responses");
const R = require("ramda");



// Import the library:
var cors = require('cors');

var app = express();

// Then use it before your routes are set up:
app.use(cors());






router.get("/", verifyToken, (req, res) => {
    let from = req.query.from || 0;
    from = Number(from);
    let limit = req.query.limit || 5;
    limit = Number(limit);

    let userRole = tools.getRole(req);
    let userCIF = tools.getCIF(req);
    let search = R.pick(["username", "CIF", "email", "role"], req.query);
    
    tools.cleanObject(search);

    userRole !== "METADATA" ?
        search = Object.assign({}, search, { CIF: userCIF }) : '';

    User.find(search, "username email role CIF")
        .skip(from)
        .limit(limit)
        .sort({ CIF: "ascending" })
        .exec((error, users) => {
            if (error !== null) {
                return response.badRequest(error, "Error", 400, res);
            } else {
                tools.isEmptyObject(users) == true ? 
                    response.badRequest(error, "Not found", 404, res) :
                    response.okRequest(users, res);
            }
        });
});

router.post("/", verifyToken, blockUser, async(req, res) => {

    let userRole = tools.getRole(req);
    let userCIF = tools.getCIF(req);
    const body = req.body;
    const newCompany = req.query.newCompany;
    
    /* Check if boddy password exist and generate an custom error */
    try {
        if (body.password === '') {
            let error = {
                message: "no password",
                errors: {
                    password: "no password",
                },
            };
            throw error;
        }
    } catch (error) {
        return response.badRequest(error, "Error al crear el Usuario", 400, res);
    }

    if (userRole == "METADATA" && newCompany == "true") {
        run().catch(error => console.error(error.stack));
    } else {
        // if (userRole == "ADMIN") body.role = "USER";
        userRole == "ADMIN" ? body.role = "USER" : "";
        userRole == "ADMIN" ? body.CIF = userCIF : "";
        const user = new User({
            username: body.username,
            email: body.email,
            password: bcrypt.hashSync(body.password, 10),
            role: body.role,
            CIF: body.CIF,
        });

        user.save((error, data) => {
            if (error !== null) {
                response.badRequest(error, "Error al crear el Usuario", 400, res);
            } else {
                tools.sendMail(req, body.email, body.password);
                response.okRequest(data, res);
            }
        });
    }

    async function run() {
        const uri = 'mongodb+srv://user:123@metadatacluster.na1tn.mongodb.net/metadata?retryWrites=true&w=majority';
        const client = await MongoClient.connect(uri, { useNewUrlParser: true });
        const session = client.startSession();
        session.startTransaction();

        try {
            await User.create([{
                username: body.username,
                email: body.email,
                password: bcrypt.hashSync(body.password, 10),
                role: body.role,
                CIF: body.CIF,
            }], { session: session });

            await Company.create([{
                CIF: body.CIF,
                companyName: body.companyName,
                adress: body.adress,
                postalCode: body.postalCode,
                region: body.region,
                city: body.city,
                activity: body.activity,
                parentCompany_CIF: body.parentCompany_CIF,
            }], { session: session });

            let targetCIF = body.parentCompany_CIF;
            createdCompany = await Company.findOne({ CIF: body.CIF, }).session(session);

            if (targetCIF) {
                await tools.pushSubCompany(req, res, targetCIF, createdCompany._id);
            }

        } catch (error) {
            console.error(error);
            response.badRequest(error, "Error during the transaction", 400, res);
            session.abortTransaction();
            return
        };


        await session.commitTransaction();
        session.endSession();
        console.log('Transaction completed');

        createdUser = await User.findOne({ email: body.email, });

        addedToCompany = await Company.findOne({ CIF: body.parentCompany_CIF, }, 'companyName CIF');

        const result = {
            createdUser,
            createdCompany,
            addedToCompany,
        };
        response.okRequest(result, res);

    }
});


router.put("/", verifyToken, metaProtection, blockUser, cifProtection, (req, res) => {
    const id = req.query._id;
    const body = R.pick(["username", "email", "role"], req.body);

    try {
        if (body.username === '' || body.email === '' || body.role === '') {
            let error = {
                message: "incompleted form",
                errors: {
                    form: "incompleted",
                },
            };
            throw error;
        }
    } catch (error) {
        return response.badRequest(error, "Error al crear el Usuario", 400, res);
    }
    

    User.findByIdAndUpdate(id, body, { new: true }, (error, data) => {
        error == null ?
            response.okRequest(data, res) :
            response.badRequest(error, "Error at updating User", 404, res);

        
    });
});


router.delete("/", verifyToken, blockUser, metaProtection, adminProtection, cifProtection, (req, res) => {
    let id = req.query._id;
    User.findByIdAndRemove(id, function(error, data) {
        error == null ?
            response.okRequest(data, res) :
            response.badRequest(error, "Error at removing User", 404, res);
    });
});


module.exports = router;