const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
const R = require("ramda");
const Company = require("../models/companies.js");
const Employee = require("../models/employees.js");

module.exports = {
    getID: function(req) {
        let decodedToken = jwt.verify(req.get('token'), process.env.SEED);
        return decodedToken.user._id;
    },
    getRole: function(req) {
        let decodedToken = jwt.verify(req.get('token'), process.env.SEED);
        return decodedToken.user.role;
    },
    getCIF: function(req) {
        let decodedToken = jwt.verify(req.get('token'), process.env.SEED);
        return decodedToken.user.CIF;
    },
    sendMail: function(req, username, password) {
        let email = true;

        let SENDGRID_API_KEY = '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';

        const sgMail = require('@sendgrid/mail')
        sgMail.setApiKey(SENDGRID_API_KEY)
        console.log(process.env.SENDGRID_API_KEY);

        const msg = {
            to: req.body.email, // Change to your recipient
            from: 'jesusCodespaceStudent@gmail.com', // Change to your verified sender
            subject: 'Tu cuenta de Metadata esta lista',
            text: '',
            html: `<h4>Bienvenido a Metadata<h4>
                    <p>Tu usuario: ${username}</p>
                    <p>Tu contraseña: ${password}</p>
                <small>Este correo se ha enviado de manera automatica por un proyecto estudiantil, por favor ignoralo si no lo esperabas.</>`,
            
        }

        if (email == true) {
            sgMail
                .send(msg)
                .then(() => {
                    console.log('Email sent')
                })
                .catch((error) => {
                    console.error(error)
                })
        };
    },
    isEmptyObject: function(obj) {
        return !Object.keys(obj).length;
    },
    pushSubCompany: function(req, res, targetCIF, id) {
        Company.findOneAndUpdate({ CIF: targetCIF }, { $push: { subCompany_id: id } }, function(error, data) {
            if (error != null) response.badRequest(error, "Error at adding SubCompany", 400, res)
        })
    },
    pullSubCompany: function(req, res, targetCIF, id) {
        Company.findOneAndUpdate({ CIF: targetCIF }, { $pull: { subCompany_id: id } }, function(error, data) {
            console.log(data);
            if (error != null) response.badRequest(error, "Error at removing SubCompany from Company", 400, res)
        })
    },
    pushEmployee: function(req, res, targetCIF, id) {
        Company.findOneAndUpdate({ CIF: targetCIF }, { $push: { employees: id } }, function(error, data) {
            if (error != null) response.badRequest(error, "Error at adding Employee to Company", 400, res)
        })
    },
    pullEmployee: function(req, res, targetCIF, id) {
        Company.findOneAndUpdate({ CIF: targetCIF }, { $pull: { employees: id } }, function(error, data) {
            if (error != null) response.badRequest(error, "Error at removing Employee from Company", 400, res)
        })
    },
    cleanObject(obj) {
        let propNames = Object.getOwnPropertyNames(obj);
        for (let i = 0; i < propNames.length; i++) {
          let propName = propNames[i];
          if (obj[propName] === "" || obj[propName] === undefined) {
            delete obj[propName];
          }
        }
    },
    async checkExpired(CIF) {
        let search = {}
        if (CIF) {
            search = {CIF: CIF}
        }

        console.log(CIF);

        Employee.find(search, "DNI CIF expired startDate endDate")
        .skip(0)
        .limit(0)
        .sort({ DNI: "ascending" })
        .exec((error, users) => {
            if (error !== null) {
                console.log(error);
            } else {
                    users.forEach(function(user) {
                        let today = new Date();
                        console.log("hoy", today);
                        console.log("empleado", user.endDate);
                        let test = false;
                        let id = user._id;

                        if (today > user.endDate) {
                            console.log("has caducado compañero");
                            test = true
                        } 

                        Employee.findByIdAndUpdate(id, {expired: test}, function(err, result){
                            console.log("================================");
                            if(err){
                                console.log(err);
                            }
                            else{
                                console.log("Change on id:" , id ); 
                            }
                        })
                        
                    })

                    Company.find(search, "expired employees")
        .skip(0)
        .limit(0)
        .sort({ _id: "ascending" })
        .populate("employees", "expired")
        .exec((error, companies) => {
            if (error !== null) {
                console.log(error);
            } else {
                    companies.forEach(function(company) {
                        console.log("=== Empresa encontrada ===",company._id);
                        let test1 = false;

                        company.employees.forEach(function(employee) {
                            console.log("=== Empleado encontrado ===",employee);
                            if (employee.expired === true) {
                                test1 = true;
                                console.log("cambio en test");
                            }
                        })
                        
                            Company.findByIdAndUpdate(company._id, {expired: test1}, function(err, result){
                                console.log("**********************");
                                if(err){
                                    console.log(err);
                                }
                                else{
                                    console.log(test1);
                                    console.log(result.companyName);
                                }
                            })
                              
                    })
            }
        });
            }
        });

        
    } 
};