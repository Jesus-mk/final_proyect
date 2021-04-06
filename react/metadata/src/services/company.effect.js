import {useState, useEffect} from "react";
import AuthService from "./auth.service";
import { useContext } from "react";
import { GlobalContext } from "../App";
import CompanyService from "./company.service";

 
export function useGetCompany(userCIF, userToken){
    const [userCompany, setUserCompany] = useState();
    
    useEffect(() => {
      if (!userCompany) {
          CompanyService.getCompany(userCIF, userToken)
            .then((response) => {
            setUserCompany(response); 
            return response
        }).catch((error) => {
          throw new Error(error);
        });
      }
    },[])
    return userCompany;
}

export function useGetCompanies(companyName, 
                                CIF, 
                                activity, 
                                city,
                                expired, 
                                userToken, 
                                page, 
                                count){
  const [userCompany, setUserCompany] = useState();
  
  useEffect(() => {
        CompanyService.getCompanies(companyName, CIF, activity, city, expired, userToken, page)
          .then((response) => {
          setUserCompany(response);
          return response
      }).catch((error) => {
        throw new Error(error);
      });
    
  },[companyName, CIF, activity, city, expired, page,  count])
  return userCompany;
}

export function useGetSubCompanies(parentCompany_CIF, 
                                    companyName,
                                    CIF, 
                                    activity, 
                                    city, 
                                    expired,
                                    userToken, 
                                    page, 
                                    count){
  const [userCompany, setUserCompany] = useState();
  
  useEffect(() => {
        CompanyService.getSubCompanies(parentCompany_CIF, companyName, CIF, activity, city, expired, userToken, page)
          .then((response) => {
          setUserCompany(response); 
          return response
      }).catch((error) => {
        throw new Error(error);
      });
    
  },[parentCompany_CIF, companyName, CIF, activity, city, expired, page, count])
  return userCompany;
}