import React from "react";
import './Css/NavBar.css';
import { BrowserRouter, NavLink, Route, useRouteMatch, useHistory, useParams, Link } from "react-router-dom";
import AuthService from "../services/auth.service"
import {useGetCompany} from "../services/company.effect.js"
import { useContext } from "react";
import { GlobalContext } from "../App";
import FunctionCard from "./functionCard.js";
import MainController from "./MainController.js"

 
export default function NavBar() {
    const { userData, setUserData } = useContext(GlobalContext);

    let match = useRouteMatch();
    let params = useParams();
    let history = useHistory();


    let actualLocation = history.location.pathname;
    let userLocation = actualLocation.includes("Users")
    let companyLocation = actualLocation.includes("Companies")
    let employeeLocation = actualLocation.includes("Employees")
    
    let companyUrl ="/Companies"

    if (userData.user.role !== "METADATA") {
        companyUrl = `/Companies/Sub/${userData.user.CIF}`
    }

    function locationUser() {
        if (userData.user.role === "USER") {
            return null;
        }
        if (userLocation === false && companyLocation === true || employeeLocation === true ) {
            return(<Link to={`${match.url}/Users`} className="">
            <FunctionCard name="Usuarios" color="green" match={match} redirect="Users" />
        </Link>) 
        } 
    }

    function locationCompany() {
        if (companyLocation === false && userLocation === true || employeeLocation === true) {
            return(<Link to={`${match.url}${companyUrl}`} className="">
                        <FunctionCard name="Empresas" color="blue" match={match} redirect="Company"/>
                    </Link>) 
        } 
    }

    function locationEmployee() {
        if (employeeLocation === false && userLocation === true || companyLocation === true) {
            return(<Link to={`${match.url}/Employees/${userData.user.CIF}`} className="">
            <FunctionCard name="Empleados" color="yellow" />
        </Link>) 
        } 
    }

    
    
    
     
    return (
        <div className="NavBarComponent white-background">
                <div className="logos">
                    <div className="logo"></div>
                    <div className="metacontratas"></div>
                </div>
                <div className="imageLinks flex-row">
                    {locationUser()}
                    {locationCompany()}
                    {locationEmployee()}
                </div>                    
                <ul>
                    <NavLink to={`${match.url}`} className="NavLink" selected={true}>Inicio</NavLink>  
                    <NavLink to={`${match.url}/Profile`} className="NavLink">Cuenta</NavLink>
                    <NavLink to={`${match.url}/Company`} className="NavLink" >Empresa</NavLink>
                    <NavLink to={`/`} className="NavLink" onClick={(e) => AuthService.logout()}>Desconectar</NavLink>
                </ul>
            
        </div>
    );
}