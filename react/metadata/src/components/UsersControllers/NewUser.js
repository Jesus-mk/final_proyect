import '../Css/UserController/NewUser.css';
import React, { useState, useEffect } from 'react';
import { useContext } from "react";
import { GlobalContext } from "../../App";
import UsersService from "../../services/users.service";
import MessageDisplay from "../MessageDisplay.js"
import { BrowserRouter, NavLink, Route, useRouteMatch, Link, useParams } from "react-router-dom";

function NewUser({count, setCount}) {
  const { userData, setUserData } = useContext(GlobalContext);
  const delay = ms => new Promise(res => setTimeout(res, ms));
  
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    CIF: "",
  });

  const [newCompany, setNewCompany] = useState({
    companyName: "",
    adress: "",
    postalCode: "",
    region: "",
    city: "",
    activity: "",
    parentCompany_CIF: "",
  });
  

  const token = userData.token;
  
  function getUsername(e) {setNewUser({ ...newUser, username: e.target.value })}
  function getEmail(e) {setNewUser({ ...newUser, email: e.target.value })}
  function getPassword(e) {setNewUser({ ...newUser, password: e.target.value })}
  function getRole(e) {setNewUser({ ...newUser, role: e.target.value })}
  function getCIF(e) {setNewUser({ ...newUser, CIF: e.target.value })}

  function getCompanyName(e) {setNewCompany({ ...newCompany, companyName: e.target.value })}
  function getAdress(e) {setNewCompany({ ...newCompany, adress: e.target.value })}
  function getPostalCode(e) {setNewCompany({ ...newCompany, postalCode: e.target.value })}
  function getRegion(e) {setNewCompany({ ...newCompany, region: e.target.value })}
  function getCity(e) {setNewCompany({ ...newCompany, city: e.target.value })}
  function getActivity(e) {setNewCompany({ ...newCompany, activity: e.target.value })}
  function getParentCompany_CIF(e) {setNewCompany({ ...newCompany, parentCompany_CIF: e.target.value })}

  const [disableCreateButton, setDisableCreateButton] = useState(true);
  const [disable, setDisable] = useState(true);
  const [whySoManyCounts, setwhySoManyCounts] = useState(0);
  const [MDisplay, setMDisplay] = useState(false);
  const [Message, setMessage] = useState("");
  const [MessageError, setMessageError] = useState();
  
  
  function addCompany(userRol) {
    
    if (userRol === "METADATA") {
      return (<p>Añadir empresa <input type="checkbox" className="companyCheck" onClick={() => {setDisable(!disable)}}></input></p>)
    }
  }
  function rolSelector(userRol) {
    if (userRol === "METADATA") {
      return (<select 
        className="inputText" 
        name="role" 
        id="fRole" 
        placeholder="Rol" 
        required
        onChange={(e) => getRole(e)}>
          <option value="" selected disabled hidden>-</option>
          <option value="ADMIN">Admin</option>
          <option value="USER">User</option>
      </select>)
    } else {
      return (<select 
        className="inputText" 
        name="role" 
        id="fRole" 
        placeholder="Rol" 
        required
        onChange={(e) => getRole(e)}>
          <option value="" selected disabled hidden>-</option>
          <option value="USER">User</option>
      </select>)
    }
  }
  function CIFSelector(userRol) {
    if (userRol === "METADATA") {
      return (<tr>
        <td className="">CIF</td>
        <td className=""><input 
                          className="inputText"
                          type="text" 
                          name="UserEmail" 
                          placeholder="00000000" 
                          required              
          onChange={(e) => getCIF(e)}
        /></td>
      </tr>)
    } else {
      return null
    }
  }



  return (
    <div className="NewUserComponent">
      <MessageDisplay display={MDisplay} setMDisplay={setMDisplay} Message={Message} setMessage={setMessage} MessageError={MessageError} setMessageError={setMessageError}/>
      <h3>Nuevo Usuario</h3>
      <div className="ProfileCard">
        
        <form>
          <table className="tg">
            <tbody>
            <tr>
              </tr>
              <tr>
                <td className="">Nombre de Usuario</td>
                <td className=""><input 
                                  className="inputText" 
                                  type="text" 
                                  name="UserName" 
                                  id="demo"
                                  placeholder="Rubén"
                                  required
                  onChange={(e) => getUsername(e)}
                /></td>
              </tr>
              <tr>
                <td className="">Email</td>
                <td className=""><input 
                                  className=" inputText" 
                                  type="text" 
                                  name="UserEmail" 
                                  placeholder="ruben@email.com"
                                  required
                  onChange={(e) => getEmail(e)}
                /></td>
              </tr>
              <tr>
                <td className="">Contraseña</td>
                <td className=""><input 
                                  className=" inputText" 
                                  type="password" 
                                  name="UserName" 
                                  id="demo"
                                  required
                                  onChange={(e) => getPassword(e)}
                /></td>
              </tr>
              <tr>
                <td className="">Rol</td>
                <td className="">{rolSelector(userData.user.role)}</td>
              </tr>
                {CIFSelector(userData.user.role)}
            </tbody>
          </table>
          <small>Todos los campos son requeridos.</small>
          {addCompany(userData.user.role)}
          
          
          
          <table className="companyTable" disabled={disable}>
            <tbody>
            <tr>
              </tr>
              <tr>
                <td className="disable">Nombre de la empresa</td>
                <td className="disable"><input 
                                  className="inputText" 
                                  type="text" 
                                  name="UserName" 
                                  id="demo"
                                  required
                                  disabled={disable}
                                  onChange={(e) => getCompanyName(e)}
                /></td>
              </tr>
              <tr>
                <td className="disable">Actividad</td>
                <td className="disable"><input 
                                  className="inputText"
                                  type="text" 
                                  name="CompanyActivity" 
                                  disabled={disable} 
                  onChange={(e) => getActivity(e)}
                /></td>
              </tr>

              <tr>
                <td className="disable">Región</td>
                <td className="disable"><input 
                                className="inputText" 
                                type="text" 
                                name="UserEmail" 
                                disabled={disable}
                                required
                                onChange={(e) => getRegion(e)}
                /></td>
              </tr>

              

              <tr>
                <td className="disable">Ciudad</td>
                <td className="disable"><input 
                                  className="inputText"
                                  type="text" 
                                  name="UserEmail" 
                                  disabled={disable}
                                  required               
                  onChange={(e) => getCity(e)}
                /></td>
              </tr>

              <tr>
                <td className="disable">Codigo Postal</td>
                <td className="disable"><input 
                                  className="inputText" 
                                  type="text" 
                                  name="UserName" 
                                  id="demo"
                                  required
                                  disabled={disable}
                                  onChange={(e) => getPostalCode(e)}
                /></td>
              </tr>

              <tr>
                <td className="disable">Direccion</td>
                <td className="disable"><input 
                                  className="inputText" 
                                  type="text" 
                                  name="UserEmail" 
                                  required
                                  disabled={disable}
                                  onChange={(e) => getAdress(e)}
                /></td>
              </tr>
              
              
              
              <tr>
                <td className="disable">Empresa matriz*</td>
                <td className="disable"><input 
                                  className="inputText"
                                  type="text" 
                                  name="UserEmail" 
                                  disabled={disable}                                                
                  onChange={(e) => getParentCompany_CIF(e)}
                /></td>
              </tr>
              <tr><small>* No requerido.</small></tr>
            </tbody>
          </table>
          
          <div className="">
            <button 
              type="submit" 
              value="Submit"
              className="newUserSubmit"
              disabled={!disable}
              onClick={(e) => (e.preventDefault(),setwhySoManyCounts(whySoManyCounts + 1), 
                UsersService.postUser(newUser.username, newUser.email, newUser.password, newUser.role, newUser.CIF, token)
                .then((async (response) => {

                    setMessage("Operacion Completada")
                    let MessageError = {ok: true};
                    setMessageError(MessageError)
                    setMDisplay(true)
                    setCount(count +1)
                    await delay(3000)
                    await setMDisplay(false)
                })).catch(async (err) => {
                    

                    setMessage("Fallo en la creacion de usuario")
                    setMessageError(err.error.errors)
                    setMDisplay(true)
                    await delay(5000)
                    await setMDisplay(false)
                }))}>  
            Crear Usuario
            </button>

            <button 
              type="submit" 
              value="Submit"
              className="newUserSubmit"
              disabled={disable}
              onClick={(e) => UsersService.postUserCompany(e, 
                                            newUser.username, 
                                            newUser.email, 
                                            newUser.password, 
                                            newUser.role, 
                                            newUser.CIF,
                                            newCompany.companyName, 
                                            newCompany.adress, 
                                            newCompany.postalCode, 
                                            newCompany.region, 
                                            newCompany.city, 
                                            newCompany.activity, 
                                            newCompany.parentCompany_CIF, 
                                            token)
                .then(((response) => {
                  setCount(count +1)
                })).catch(async (err) => {
                  
                    

                    setMessage("Fallo en la creacion de usuario y empresa")
                    setMessageError(err.error.errors)
                    setMDisplay(true)
                    await delay(5000)
                    await setMDisplay(false)
                })}>Crear Empresa</button>  
          </div>
        </form>
          
        
          
      </div>
        
    </div>
  );
    
}

export default NewUser; 