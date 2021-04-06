import {useState, useEffect} from "react";
import AuthService from "./auth.service";
import { useContext } from "react";
import { GlobalContext } from "../App";


export function useGetUser(){
    const [user, setUser] = useState(null);
    const { setUserData } = useContext(GlobalContext);
     

    useEffect(() => {
      function handle(newUser) {
        setUser(newUser);
      }
      AuthService.events.on("user", handle);
      AuthService.user !== null ? setUser(AuthService.user) :
       setUser(JSON.parse(localStorage.getItem('user')));     
      
      return () => {
        AuthService.events.removeListener("user", handle);
      }
      /* if !company
              hacer get 
              then setCompany */
    },[])

    return user;
}


export function useGetToken(){
  const user = useGetUser();
  if (!user) {
      return null
  } 

  return user.token;
}

export function useGetID(){
  const user = useGetUser();
  if (!user) {
      return null
  } 

  return user.user._id;
}

export function useGetUsername(){
    const user = useGetUser();
    if (!user) {
        return null
    } 

    return user.user.username;
}

export function useGetEmail(){
  const user = useGetUser();
  if (!user) {
      return null
  } 

  return user.user.email;
}

export function useGetRole(){
  const user = useGetUser();
  if (!user) {
      return null
  } 

  return user.user.role;
}

export function useGetCIF(){
  const user = useGetUser();
  if (!user) {
      return null
  } 

  return user.user.CIF;
}


