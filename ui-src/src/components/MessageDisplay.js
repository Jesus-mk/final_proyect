import './Css/MessageDisplay.css';
import React, { useState, useEffect } from 'react';
import { useContext } from "react";
import { GlobalContext } from "../App";




export default function MessageDisplay({display, setMDisplay, Message, setMessage, MessageError, setMessageError}) {
    

    function userNameError(MessageError) {
        if (MessageError.username) {
            return <p>Nombre Incorrecto</p>
        }
    }
    function emailError(MessageError) {
        if (MessageError.email) {
            return <p>Email Incorrecto</p>
        }
    }
    function passwordError(MessageError) {
        if (MessageError.password) {
            return <p>Contraseña Incorrecta</p>
        }
    }
    function roleError(MessageError) {
        if (MessageError.role) {
            return <p>Rol Incorrecto</p>
        }
    }
    function cifError(MessageError) {
        if (MessageError.CIF) {
            return <p>CIF Incorrecto</p>
        }
    }
    function companyNameError(MessageError) {
        if (MessageError.companyName) {
            return <p>Nombre de empresa Incorrecto</p>
        }
    }
    function regionError(MessageError) {
        if (MessageError.region) {
            return <p>Region Incorrecta</p>
        }
    }
    function cityError(MessageError) {
        if (MessageError.city) {
            return <p>Ciudad Incorrecta</p>
        }
    }
    function postalCodeError(MessageError) {
        if (MessageError.postalCode) {
            return <p>Codigo postal Incorrecto</p>
        }
    }
    function adressError(MessageError) {
        if (MessageError.adress) {
            return <p>Direccion Incorrecta</p>
        }
    }
    function formError(MessageError) {
        if (MessageError.form) {
            return <p>Formulario incompleto</p>
        }
    }
    function testError(MessageError) {
        if (MessageError.error) {
            return <p>Email repetido</p>
        }
    }
    function subCompanyError(MessageError) {
        if (MessageError.subCompany) {
            return <p>Empresa no encontrada</p>
        }
    }
    function DNIError(MessageError) {
        if (MessageError.DNI) {
            return <p>DNI erroneo</p>
        }
    }
    function nameError(MessageError) {
        if (MessageError.name) {
            return <p>Normbre de empleado erroneo</p>
        }
    }
    function firstLastNameError(MessageError) {
        if (MessageError.firstLastName) {
            return <p>Primer apellido erroneo</p>
        }
    }
    function jobError(MessageError) {
        if (MessageError.job) {
            return <p>Actividad erronea</p>
        }
    }
    function startDateError(MessageError) {
        if (MessageError.startDate) {
            return <p>Fecha de inicio erronea</p>
        }
    }
    function endDateError(MessageError) {
        if (MessageError.endDate) {
            return <p>Fecha de fin erronea</p>
        }
    }
    function DateError(MessageError) {
        if (MessageError.dateError) {
            return <p>Formato de fecha erroneo</p>
        }
    }
    

    if (display === true) {
        return (
            <div className="MessageDisplayComponent">
                <h4>{Message}</h4>
                
                {userNameError(MessageError)}
                {emailError(MessageError)}
                {passwordError(MessageError)}
                {roleError(MessageError)}
                {cifError(MessageError)}

                {companyNameError(MessageError)}
                {regionError(MessageError)}
                {cityError(MessageError)}
                {postalCodeError(MessageError)}
                {adressError(MessageError)}

                {formError(MessageError)}
                {testError(MessageError)}
                {subCompanyError(MessageError)}
                {DNIError(MessageError)}
                {nameError(MessageError)}
                {firstLastNameError(MessageError)}
                {jobError(MessageError)}
                {DateError(MessageError)}
                {startDateError(MessageError)}
                {endDateError(MessageError)}
            </div>
        ) 
    } else { return null}



    
}
