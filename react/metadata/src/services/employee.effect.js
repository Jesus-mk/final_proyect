import {useState, useEffect} from "react";
import AuthService from "./auth.service";
import { useContext } from "react";
import { GlobalContext } from "../App";
import CompanyService from "./company.service";
import EmployeeService from "./employee.service.js"

 
export function useGetEmployees(DNI, name, secondName, job, expired, CIF, usertoken, page, count){
    const [usersData, setusersData] = useState();
    
    useEffect(() => {
      
        EmployeeService.getEmployees(DNI, name, secondName, job, expired, CIF, usertoken, page)
            .then((response) => {
            
            setusersData(response); 
            return response
        }).catch((error) => {
          throw new Error(error);
        });
      
    },[DNI, name, secondName, job, expired, CIF, usertoken, page, count])
    return usersData;
}

