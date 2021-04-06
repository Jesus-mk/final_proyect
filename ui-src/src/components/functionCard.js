import './Css/FunctionCard.css';
import { BrowserRouter, NavLink, Route, useRouteMatch, Link, useParams, Redirect } from "react-router-dom";
import ProfilePage from "./Profile/Profile.js";
import React from 'react'
import { useHistory } from "react-router-dom";

function FunctionCard(props) {
    let match = useRouteMatch();
    let params = useParams();
    
    return (
        <div className="functionCardComponent flex-colum" color={props.color}>
            <div className="UserCardLogo">

            </div>
            
            
            <h3>{props.name}</h3>
        </div>
    )
}

export default FunctionCard