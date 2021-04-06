import './Css/MetadataPage.css';
import {useGetUser, useGetToken, useGetID, useGetUsername, useGetEmail, useGetRole, useGetCIF} from "../services/auth.effect"
import {Sidebar} from "./SideBar.js"
import NavBar from "./NavBar.js"
import ProfilePage from "./Profile/Profile.js";
import CompanyPage from "./Profile/Company.js";
import AdminPage from "./AdminPage";
import UserPage from "./UserPage";
import { BrowserRouter, NavLink, Route, useRouteMatch, Link, useParams } from "react-router-dom";
import CompanyService from "../services/company.service.js";
import { useContext } from "react";
import { GlobalContext } from "../App";
import {useGetCompany} from "../services/company.effect.js"
import NewUser from "../components/UsersControllers/NewUser.js"

import MainController from "./MainController.js";
import UsersController from "./UsersControllers/UsersController.js"
import CompanyController from "./CompanyControllers/CompaynyController.js"
import SubCompanyController from "./CompanyControllers/SubCompanyController.js" 
import EmployeeController from "./EmployeeControllers/EmployeeController.js"


function MetadataPage() {
  const { userData, setUserData } = useContext(GlobalContext); 
  let match = useRouteMatch();
  let params = useParams();
  
  return (
    <div className="MetadataPageComponent">
        <NavBar/>

        <div className="mainBody lighGray-background">
          <Route path={`${match.path}/`} exact component={MainController}/>
          <Route path={`${match.path}/Profile`} exact component={ProfilePage}/>
          <Route path={`${match.path}/Company`} exact component={CompanyPage}/>
          <Route path={`${match.path}/Users`} exact component={UsersController}/>
          <Route path={`${match.path}/Companies`} exact component={CompanyController}/>
          <Route path={`${match.path}/Companies/Sub/:parentId`} exact component={SubCompanyController}/>
          <Route path={`${match.path}/Employees/:CIF`} exact component={EmployeeController}/>
          
          <Route path={`${match.path}/Admin`} component={AdminPage}/>
          <Route path={`${match.path}/Test`} component={UserPage}/> 
        </div>
    </div>
  );
}

export default MetadataPage; 