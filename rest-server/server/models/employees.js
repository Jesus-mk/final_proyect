const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");


const Schema = mongoose.Schema;

const validRoles = {
    values: ["ADMIN", "USER"],
    message: "{VALUE} is not a valid role"
}

const employeeSchema = new Schema({
    DNI: {
        type: String,
        required: [true, "DNI is required"],
        unique: true,
    },
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    firstLastName: {
        type: String,
        required: [true, "Last name is required"]
    },
    secondLastName: {
        type: String,

    },
    job: {
        type: String,
        required: [true, "Job title is required"]
    },
    img:{
        data: Buffer,
        contentType: String
    },
    information: {
        type: String,

    },
    profilePicture: {
        type: mongoose.Types.ObjectId,
    },
    startDate: {
        type: Date,
        required: [true, "Starting date is required"]
    },
    endDate: {
        type: Date,
        required: [true, "Ending date is required"]
    },
    CIF: {
        type: String,
        required: [true, "CIF is required"]

    },
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

employeeSchema.methods.toJSON = function() {
    let employee = this;
    let employeeObject = employee.toObject();
    delete employeeObject.password;
    return employeeObject;
};


employeeSchema.plugin(uniqueValidator, { message: "{PATH} Should be unique" });

module.exports = mongoose.model("Employee", employeeSchema);