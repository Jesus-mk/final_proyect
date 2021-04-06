const User = require("../models/users.js");
const Company = require("../models/companies.js");
const Employee = require("../models/employees");
const tools = require("../config/tools");
const response = require("../config/responses");


const metaProtection = (req, res, next) => {
    let id = req.query._id;

    User.findById(id, function(error, docs) {
        if (error !== null || docs == null) {
            /* error.reason = "User not found"; */
            console.log(error);
            return response.badRequest(error, "Error at metaProtection", 400, res);
        } else {
            return (docs.role == "METADATA" ? res.status(401).json({ ok: false, error: { message: "Unauthorized" } }) :
                next());
        }
    });
};

const adminProtection = (req, res, next) => {
    let id = req.query._id;
    let userRole = tools.getRole(req);

    User.findById(id, function(error, docs) {
        if (error !== null) {
            error.reason = "User not found";
            return response.badRequest(error, "Error at adminProtection", 400, res);
        } else if (userRole == "ADMIN") {
            return (docs.role == "ADMIN" ? response.denyRequest("Cant delete Admin", 400, res) :
                next());
        } else {
            return next();
        }
    });
};

const cifProtection = (req, res, next) => {
    let userRole = tools.getRole(req);
    let userCif = tools.getCIF(req);
    let id = req.query._id;
    console.log(req.baseUrl);
    let target;
    if (req.baseUrl == "/user") target = User;
    if (req.baseUrl == "/companies") target = Company;
    if (req.baseUrl == "/employee") target = Employee;
    console.log(target);


    target.findById(id, function(error, docs) {

        if (error != null) {
            error.reason = "User not found";
            return response.badRequest(error, "Error at adminProtection", 400, res);
        };
        userRole == "METADATA" ? userCif = docs.CIF : "";
        return (docs.CIF !== userCif ?
            res.status(401).json({ ok: false, error: { message: "Unauthorized CIF" } }) :
            next());
    });
};









module.exports = {
    metaProtection,
    cifProtection,
    adminProtection,
}