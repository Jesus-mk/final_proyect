const jwt = require("jsonwebtoken");
const tools = require("../config/tools");
const R = require("ramda");
const User = require("../models/users.js");

const response = require("../config/responses");



const blockAdmin = (req, res, next) => {
    let userRole = tools.getRole(req);

    return (userRole == "METADATA" ? next() :
        response.denyRequest("Unauthorized", 401, res));

};

const blockUser = (req, res, next) => {
    let userRole = tools.getRole(req);

    return (userRole == "USER" ? response.denyRequest("Unauthorized", 401, res) :
        next());
};

module.exports = {
    blockAdmin,
    blockUser,
};