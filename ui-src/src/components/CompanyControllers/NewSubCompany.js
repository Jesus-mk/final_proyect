import '../Css/CompanyController/NewCompany.css';
import React, { useState, useEffect } from 'react';
import { useContext } from "react";
import { GlobalContext } from "../../App";
import CompanyService from "../../services/company.service.js";
import { BrowserRouter, NavLink, Route, useRouteMatch, Link, useParams } from "react-router-dom";
import MessageDisplay from "../MessageDisplay.js"

function NewSubCompany({count, setCount}) {
  const { userData, setUserData } = useContext(GlobalContext);
  const [MDisplay, setMDisplay] = useState(false);
  const [Message, setMessage] = useState("");
  const [MessageError, setMessageError] = useState();
  const delay = ms => new Promise(res => setTimeout(res, ms));
  let match = useRouteMatch();
  

  const [newSubCompany, setNewSubCompany] = useState({
    CIF: "",
  });
  

  const token = userData.token;
  
  function getSubCompanyId(e) {setNewSubCompany({ ...newSubCompany, CIF: e.target.value })}
  
 
  const [whySoManyCounts, setwhySoManyCounts] = useState(0);
  

  return (
    <div className="NewCompanyComponent">
      <h3>Añadir Subcontrata</h3>
      <div className="ProfileCard">
        <form>
          <table className="companyTable">
            <tbody>
              <tr>
                <td className="">CIF de la Empresa</td>
                <td className=""><input 
                                  className="inputText" 
                                  type="text" 
                                  name="UserName" 
                                  id="demo"
                                  required
                                  
                                  onChange={(e) => getSubCompanyId(e)}
                /></td>
              </tr>
            </tbody>
          </table>
          <button 
            type="submit" 
            value="Submit"
            className="newUserSubmit"
            
            onClick={(e) => CompanyService.putSubCompany(e, 
                  newSubCompany.CIF, match.params.parentId, token)
              .then((async(response) => {
                
                setCount(count +1)
                setMessage("Operacion Completada")
                let MessageError = {ok: true};
                setMessageError(MessageError)
                setMDisplay(true)
                await delay(3000)
                await setMDisplay(false)
              })).catch(async(err) => {
                setMessage("Fallo en la agregacion de subcontrata")
                    setMessageError(err.error.errors)
                    setMDisplay(true)
                    await delay(3000)
                    await setMDisplay(false)
              })}>Añadir subcontrata</button>            
        </form> 
      </div>
        <MessageDisplay display={MDisplay} setMDisplay={setMDisplay} Message={Message} setMessage={setMessage} MessageError={MessageError} setMessageError={setMessageError}/>
    </div>
  );
    
}

export default NewSubCompany; 