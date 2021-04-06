const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");


const Schema = mongoose.Schema;

const validRoles = {
    values: ["METADATA", "ADMIN", "USER"],
    message: "{VALUE} is not a valid role"
}

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    role: {
        type: String,
        default: "USER",
        enum: validRoles,
    },
    CIF: {
        type: String,
        required: [true, "CIF is required"],

    },
    img: {
        data: Buffer,
        contentType: String,
    },
    state: {
        type: Boolean,
        default: true,

    }, // Boolean
    google: {
        type: Boolean,
        default: false
    },

});

userSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
};


userSchema.plugin(uniqueValidator, { message: "{PATH} Should be unique" });

module.exports = mongoose.model("User", userSchema);