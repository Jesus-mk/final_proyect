const express = require("express");
const router = express.Router();

const User = require("../models/users.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post("/login", (req, res) => {
    /* This needs to be fixed */
    const body = req.body;

    if (!body.password) {
        return res.status(400).json({
            ok: false,
            error: {
                message: "Password is empty",
            }
        });
    }
    User.findOne({ email: body.email }, (error, userDB) => {
        if (error !== null) {
            return res.status(500).json({
                ok: false,
                error
            });
        }

        if (userDB == null) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: "Invalid user or password",
                }
            });
        }

        if (!bcrypt.compareSync(body.password, userDB.password)) {

            return res.status(400).json({
                ok: false,
                error: {
                    message: "Invalid user or password",
                }
            });
        }




        const token = jwt.sign({
            user: userDB
        },
            process.env.SEED, { expiresIn: process.env.TOKEN_EXPIY }
        );

        res.json({
            ok: true,
            user: userDB,
            token
        });
    });

});

module.exports = router;