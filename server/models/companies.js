const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");


const Schema = mongoose.Schema;

const validRoles = {
    values: ["ADMIN", "USER"],
    message: "{VALUE} is not a valid role"
}

const companySchema = new Schema({
    CIF: {
        type: String,
        required: [true, "CIF is required"],
        unique: true,

    },
    companyName: {
        type: String,
        required: [true, "Company name is required"],
    },
    adress: {
        type: String,
        required: [true, "Adress is required"],
    },
    postalCode: {
        type: Number,
        required: [true, "Postal Code is required"],
    },
    region: {
        type: String,
        required: [true, "Region is required"],
    },
    city: {
        type: String,
        required: [true, "City is required"],
    },
    activity: {
        type: String,
    },
    parentCompany_CIF: {
        type: String,

    },
    subCompany_id: [{
        type: Schema.Types.ObjectId,
        ref: 'Company'
    }],
    employees: [{
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    }],
    expired: {
        type: Boolean,
        default: false,

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

companySchema.methods.toJSON = function() {
    let company = this;
    let companyObject = company.toObject();
    delete companyObject.password;
    return companyObject;
};


companySchema.plugin(uniqueValidator, { message: "{PATH} Should be unique" });

module.exports = mongoose.model("Company", companySchema);