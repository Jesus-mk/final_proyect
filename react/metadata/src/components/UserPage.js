import './Css/MetadataPage.css';
import {useGetUser, useGetToken, useGetID, useGetUsername, useGetEmail, useGetRole, useGetCIF} from "../services/auth.effect"
import {Sidebar} from "./SideBar.js"
import NavBar from "./NavBar.js"
import ProfilePage from "./Profile/Profile.js";
import CompanyPage from "./Profile/Company.js";
import { useContext } from "react";
import { GlobalContext } from "../App";
import UserPage from "./UserPage";
import { BrowserRouter, NavLink, Route, useRouteMatch, Link, useParams } from "react-router-dom";
import MainController from "./MainController.js";
import UsersController from "./UsersControllers/UsersController.js"
import CompanyController from "./CompanyControllers/CompaynyController.js"
import SubCompanyController from "./CompanyControllers/SubCompanyController.js" 
import EmployeeController from "./EmployeeControllers/EmployeeController.js"




function UsersPage() {
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
          <Route path={`${match.path}/Companies/Sub/:parentId`} exact component={SubCompanyController}/>
          <Route path={`${match.path}/Employees/:CIF`} exact component={EmployeeController}/>
          
          
        </div>
    </div>
  );
}

export default UsersPage; 