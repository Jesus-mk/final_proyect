const express = require("express");
const router = express.Router();
const { MongoClient } = require('mongodb');

const User = require("../models/users.js");
const Company = require("../models/companies.js");
const Employee = require("../models/employees");

const { verifyToken } = require("../middlewares/auth");
const { blockAdmin, blockUser } = require("../middlewares/authorization");
const { metaProtection, adminProtection, cifProtection } = require("../middlewares/protection");

const R = require("ramda");

const tools = require("../config/tools");
const response = require("../config/responses");

router.get("/", verifyToken, (req, res) => {
    let from = req.query.from || 0;
    from = Number(from);
    let limit = req.query.limit || 5;
    limit = Number(limit);
    
    let userRole = tools.getRole(req);
    let userCIF = tools.getCIF(req);
    let search = R.pick(["companyName", "CIF", "activity", "city", "parentCompany_CIF", "expired"], req.query);
    
    userRole !== "METADATA" ? search = {CIF: userCIF} : '';
    tools.cleanObject(search);
    Company.find(search, "")
        .skip(from)
        .limit(limit)
        .sort({ CIF: "ascending" })
        .populate("subCompany_id", "companyName CIF activity").populate("employees", "expired")
        .exec((error, data) => {
            if (error !== null) {
                return response.badRequest(error, "Error", 400, res);
            } else {
                tools.isEmptyObject(data) == true ?
                    response.badRequest(error, "Not found", 404, res) :
                    response.okRequest(data, res);
            }
        });
});

router.get("/sub/", verifyToken, (req, res) => {
    let from = req.query.from || 0;
    from = Number(from);
    let limit = req.query.limit || 5;
    limit = Number(limit);

    let search = R.pick(["parentCompany_CIF", "companyName", "activity", "CIF", "city", "expired"], req.query);
    tools.cleanObject(search);
    Company.find(search, "")
        .skip(from)
        .limit(limit)
        .sort({ CIF: "ascending" })
        .populate("employees", "expired")
        .exec((error, data) => {
            if (error !== null) {
                return response.badRequest(error, "Error", 400, res);
            } else {
                tools.isEmptyObject(data) == true ?
                    response.badRequest(error, "Not found", 204, res) :
                    response.okRequest(data, res);
            }
        });
});


router.post("/", verifyToken, blockAdmin, (req, res) => {
    const body = req.body;
    tools.cleanObject(body);
    const company = new Company({
        CIF: body.CIF,
        companyName: body.companyName,
        adress: body.adress,
        postalCode: body.postalCode,
        region: body.region,
        city: body.city,
        activity: body.activity,
        parentCompany_CIF: body.parentCompany_CIF,
    });
    
    company.save((error, data) => {
        console.log(error);
        if (error == null) {
            response.okRequest(data, res);
            tools.pushSubCompany(req, res, data.parentCompany_CIF, data._id);
        } else {
            response.badRequest(error, "message", 400, res);
        }
    });
});

router.put("/", verifyToken, blockUser, cifProtection, async(req, res) => {
    const id = req.query._id;
    const body = R.pick(["companyName", "activity", "adress", "postalCode", "region", "city"], req.body);
    const opts = 
    { 
        runValidators: true,
        new: true,
    };
    Company.findByIdAndUpdate(id, body, opts, (error, data) => {
        error == null ?
            response.okRequest(data, res) :
            response.badRequest(error, "Error at updating Company", 404, res);
    });
});

router.put("/sub/", verifyToken, (req, res) => {
    
    let targetCIF = req.query.CIF;
    let CIF = req.body.parentCompany_CIF;

    Company.findOne({CIF: targetCIF}, function (error, data) {
        if (error !== null) {
            return response.badRequest(error, "Error", 400, res);
        } else { 
            if (data === null) {
                error = {errors: {subCompany: "not found"}}
                response.badRequest(error, "Company not found", 404, res);
            } else {
                
                tools.pushSubCompany(req, res, CIF, data._id);
                modifiedCompany = { companyName: data.companyName };
                Company.findByIdAndUpdate(data._id, {parentCompany_CIF: CIF}, {new: true}, (error, data) => {if (error) console.log(error)})
                response.okRequest(modifiedCompany, res);
            }
        }
    });
});

router.delete("/removeSub/", verifyToken, (req, res) => {
    const id = req.query._id;
    let targetCIF = req.body.parentCompany_CIF;
    Company.findById(id, function(error, data) {
        if (data) {
            tools.pullSubCompany(req, res, data.parentCompany_CIF, id);
            modifiedCompany = { companyName: data.companyName };
            Company.findByIdAndUpdate(id, {parentCompany_CIF: ""}, {new: true}, (error, data) => {if (error) console.log(error)})
            response.okRequest(modifiedCompany, res);
        } else {
            response.badRequest(error, "Company not found", 404, res);
        }
    });
});


router.delete("/", verifyToken, blockAdmin, async(req, res) => {
    const id = req.query._id;
    modifiedCompany = await Company.findOne({ _id: id }, 'companyName CIF');

    Company.findByIdAndRemove(id, function(error, data) {
        tools.pullSubCompany(req, res, data.parentCompany_CIF, id);
        error == null ?
            response.okRequest(modifiedCompany, res) :
            response.badRequest(error, "Error at updating Company", 404, res);
    });
});

router.delete("/All", verifyToken, blockAdmin, async(req, res) => {
    const id = req.query._id;
    run();
    async function run() {
        const uri = 'mongodb+srv://user:123@metadatacluster.na1tn.mongodb.net/metadata?retryWrites=true&w=majority';
        const client = await MongoClient.connect(uri, { useNewUrlParser: true });
        const session = client.startSession();
        session.startTransaction();

        try {
            let targetCIF;
            let parentCIF;
            await Company.findById(id, function(err, data) {
                targetCIF = data.CIF;
                parentCIF = data.parentCompany_CIF;
            });
            await Employee.deleteMany({ CIF: targetCIF }, function(error, result) {});

            await User.deleteMany({ CIF: targetCIF }, function(error, result) {});

            await Company.deleteOne({ CIF: targetCIF }, function(error) {
                tools.pullSubCompany(req, res, parentCIF, id);
                response.okRequest(targetCIF, res)
            });
        } catch (error) {
            console.error(error);
            response.badRequest(error, "Error during the transaction", 400, res);
            session.abortTransaction();
            return
        };
        await session.commitTransaction();
        session.endSession();
        
        console.log('Transaction completed');
    }
});

module.exports = router;