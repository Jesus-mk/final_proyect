import {useState, useEffect} from "react";
import AuthService from "./auth.service";
import { useContext } from "react";
import { GlobalContext } from "../App";
import CompanyService from "./company.service";
import UsersService from "./users.service.js"

 
export function useGetUsers(username, email, CIF, role, usertoken, page, count){
    const [usersData, setusersData] = useState();
    
    useEffect(() => {
      
        UsersService.getUsers(username, email, CIF, role, usertoken, page)
            .then((response) => {
            
            setusersData(response);
            
            return response
        }).catch((error) => {
          throw new Error(error);
        });
      
    },[username, email, CIF, role, usertoken, page, count])
    return usersData;
}

