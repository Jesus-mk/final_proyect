const jwt = require('jsonwebtoken');


module.exports = {
    okRequest: function(data, res) {
        return res.status(200).json({
            ok: true,
            data
        });
    },
    denyRequest: function(message, code, res) {
        return res.status(code).json({
            ok: false,
            message
        });
    },
    badRequest: function(error, message, code, res) {
        return res.status(code).json({
            ok: false,
            reason: message,
            error
        });
    },



};