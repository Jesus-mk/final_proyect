import './Css/MainController.css';
import React from 'react';
import FunctionCard from "./functionCard.js";
import { BrowserRouter, NavLink, Route, useRouteMatch, Link, useParams } from "react-router-dom";
import { GlobalContext } from "../App";
import { useContext } from "react";

export default function MainController() {
const { userData, setUserData } = useContext(GlobalContext);
let match = useRouteMatch();
let companyUrl ="/Companies"

if (userData.user.role !== "METADATA") {
    companyUrl = `/Companies/Sub/${userData.user.CIF}`
}

function userCard(userRol) {
    if (userRol !== "USER") {
        return <Link to={`${match.params.id}/Users`} className="">
                <FunctionCard name="Usuarios" color="green" match={match} redirect="Users" />
            </Link>
    }
}

    return (
        <div className= "MainController">
            {userCard(userData.user.role)}

            <Link to={`${match.params.id}${companyUrl}`} className="">
                <FunctionCard name="Empresas" color="blue" match={match} redirect="Company"/>
            </Link>
            
            <Link to={`${match.params.id}/Employees/${userData.user.CIF}`} className="">
                <FunctionCard name="Empleados" color="yellow" />
            </Link>
        </div>
    )
}
