const express = require("express");
const router = express.Router();
const { MongoClient } = require('mongodb');

const Employee = require("../models/employees");
const Company = require("../models/companies.js");

const { verifyToken } = require("../middlewares/auth");
const { metaProtection, adminProtection, cifProtection } = require("../middlewares/protection");

const jwt = require('jsonwebtoken');

const tools = require("../config/tools");
const response = require("../config/responses");
const R = require("ramda");

const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
const mongoose = require('mongoose')

const mongoURI = "mongodb+srv://user:123@metadatacluster.na1tn.mongodb.net/metadata?retryWrites=true&w=majority"


let conn = mongoose.connection
let gfs
conn.once('open', () => {
    //initialize our stream
    gfs = Grid(conn.db, mongoose.mongo)
    gfs.collection('imageUpload')
})

let storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {

        return new Promise(
            (resolve, reject) => {
                    const fileInfo = {
                    filename: file.originalname,
                    bucketName: "imageUpload"
                }
                resolve(fileInfo)
            }
        )
    }
})

const upload = multer({ storage })

router.post("/upload",upload.single("filename"),(req,res)=>{

    let id = req.query.id

    Employee.findByIdAndUpdate(id, {profilePicture: req.file.id}, { new: true }, (error, data) => {
        error == null ?
            response.okRequest(data, res) :
            response.badRequest(error, "Error at updating Employee", 404, res);
    });
    
    /* res.json({file:req.file}) */
})

router.get('/image/', (req, res) => {
    let id = req.query.id;
    
    
    try {
        id = new mongoose.Types.ObjectId(id)
    } catch (error) {
        return res.status(204).json({
            err: "No files exist",
            err2: error,
        })
    }
    gfs.files.findOne({ _id: id }, (err, file) => {
        if (!file || file.length == 0) {
            return res.status(400).json({
                err: "No files exist",
                err2: err,
            })
        }
        if (file.contentType === 'image/jpeg' || file.contentType === "img/png" || file.contentType === "image/png") {
            const readStream = gfs.createReadStream(file.filename)
            readStream.pipe(res)
        } else {
            res.status(404).json({
                err: "Not an image"
            })
        }
    })
})

router.get('/profileImage/:id', (req, res) => {
    Employee.findById(req.params.id, function(error, docs) {

        if (docs && !error) {
            gfs.files.findOne({ _id: new mongoose.Types.ObjectId(docs.profilePicture) }, (err, file) => {
               
                if (!file || file.length == 0) {
                    return res.status(404).json({
                        err: "No files exist"
                    })
                }
                if (file.contentType === 'image/jpeg' || file.contentType === "img/png" || file.contentType === "image/png") {
                    
                    const readStream = gfs.createReadStream(file._id)
                    readStream.pipe(res)

                } else {
                    res.status(404).json({
                        err: "Not an image"
                    })
                }
            }) 
        } else {
            if (error) {
                return res.status(404).json({
                    err: error
                })
            } else {
                res.status(404).json({
                    err: "Not found"
                })
            }
        }
    }) 
})















router.get("/", verifyToken, (req, res) => {
    let from = req.query.from || 0;
    from = Number(from);
    let limit = req.query.limit || 5;
    limit = Number(limit);


    let userRole = tools.getRole(req);
    let userCIF = tools.getCIF(req);
    let search = R.pick(["DNI", "CIF", "name", "firstLastName", "job", "expired"], req.query);
    
    userRole !== "METADATA" ?
        search = Object.assign({}, search, { CIF: userCIF }) : '';
    tools.cleanObject(search);
    
    Employee.find(search, "DNI CIF name firstLastName secondLastName secondName job expired startDate endDate profilePicture")
        .skip(from)
        .limit(limit)
        .sort({ name: "ascending" })
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



router.post("/", (req, res) => {
    const body = req.body;
    console.log(req);
    let userRole = tools.getRole(req);
    let userCIF = tools.getCIF(req);
    run();

    async function run() {
        const uri = 'mongodb+srv://user:123@metadatacluster.na1tn.mongodb.net/metadata?retryWrites=true&w=majority';
        const client = await MongoClient.connect(uri, { useNewUrlParser: true });
        const session = client.startSession();
        session.startTransaction();

        userRole !== "METADATA" ? body.CIF = userCIF : "";
        let expired = false;
        let today = new Date()
        let date = new Date(body.endDate)
        console.log(date);
        console.log(today);
        if (date < today) {
            expired = true;
        }
        console.log(expired);
        try {
            await Employee.create([{
                DNI: body.DNI,
                name: body.name,
                firstLastName: body.firstLastName,
                secondLastName: body.secondLastName,
                job: body.job,
                startDate: body.startDate,
                endDate: body.endDate,
                CIF: body.CIF,
                expired: expired,
            }], { session: session });

            createdEmployee = await Employee.findOne({ DNI: body.DNI, }).session(session);
            let targetCIF = body.CIF;

            await tools.pushEmployee(req, res, targetCIF, createdEmployee._id);

        } catch (error) {
            console.error(error);
            response.badRequest(error, "Error during the transaction", 400, res);
            session.abortTransaction();
            return
        };

        await session.commitTransaction();
        session.endSession();
        console.log('Transaction completed');

        addedToCompany = await Company.findOne({ CIF: body.CIF, }, 'companyName CIF');
        tools.checkExpired(body.CIF);
        const result = {
            createdEmployee,
            addedToCompany,
        };

        response.okRequest(result, res);
    }

});

router.put("/", verifyToken, cifProtection, (req, res) => {
    const id = req.query._id;
    const body = R.pick(["name", "firstLastName", "secondLastName", "job", "startDate", "endDate"], req.body)
    const opts = 
    { 
        runValidators: true,
        new: true,
    };

    Employee.findByIdAndUpdate(id, body, opts, async(error, data) => {

        if (error === null) {
            await response.okRequest(data, res);
        } else  {
            response.badRequest(error, "Error at updating Employee", 404, res);
        }
        tools.checkExpired(data.CIF);

    });

});

router.delete("/", verifyToken, cifProtection, (req, res) => {
    const id = req.query._id;

    Employee.findByIdAndRemove(id, function(error, data) {
        tools.pullEmployee(req, res, data.CIF, data._id);
        const removedEmployee = { name: data.name };
        error == null ?
            response.okRequest(removedEmployee, res) :
            response.badRequest(error, "Error at removing Employee", 404, res);
            tools.checkExpired(data.CIF);
    });

});

module.exports = router;