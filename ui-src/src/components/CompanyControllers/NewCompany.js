import '../Css/CompanyController/NewCompany.css';
import React, { useState } from 'react';
import { useContext } from "react";
import { GlobalContext } from "../../App";
import CompanyService from "../../services/company.service.js";
import MessageDisplay from "../MessageDisplay.js"


function NewUser({count, setCount}) {
  const { userData } = useContext(GlobalContext);
  const delay = ms => new Promise(res => setTimeout(res, ms));
  

  const [newCompany, setNewCompany] = useState({
    companyName: "",
    CIF: "",
    adress: "",
    postalCode: "",
    region: "",
    city: "",
    activity: "",
    parentCompany_CIF: "",
  });
  


  const token = userData.token;
  
  function getCIF(e) {setNewCompany({ ...newCompany, CIF: e.target.value })}

  function getCompanyName(e) {setNewCompany({ ...newCompany, companyName: e.target.value })}
  function getAdress(e) {setNewCompany({ ...newCompany, adress: e.target.value })}
  function getPostalCode(e) {setNewCompany({ ...newCompany, postalCode: e.target.value })}
  function getRegion(e) {setNewCompany({ ...newCompany, region: e.target.value })}
  function getCity(e) {setNewCompany({ ...newCompany, city: e.target.value })}
  function getActivity(e) {setNewCompany({ ...newCompany, activity: e.target.value })}
  function getParentCompany_CIF(e) {setNewCompany({ ...newCompany, parentCompany_CIF: e.target.value })}

  const [MDisplay, setMDisplay] = useState(false);
  const [Message, setMessage] = useState("");
  const [MessageError, setMessageError] = useState();
  

  return (
    <div className="NewCompanyComponent">
      <h3>Nueva Empresa</h3>
      <div className="ProfileCard">
        <form>
          <table className="companyTable">
            <tbody>
            
              <tr>
                <td className="">Nombre de la empresa</td>
                <td className=""><input 
                                  className="inputText" 
                                  type="text" 
                                  name="UserName" 
                                  id="demo"
                                  required
                                  placeholder="Nombre"
                                  onChange={(e) => getCompanyName(e)}
                /></td>
              </tr>
             
              <tr>
                <td className="">CIF</td>
                <td className=""><input 
                                  className="inputText"
                                  type="text" 
                                  name="UserEmail"  
                                  required  
                                  placeholder="10000008"            
                  onChange={(e) => getCIF(e)}
                /></td>
              </tr>

              <tr>
                <td className="">Región</td>
                <td className=""><input 
                                className="inputText" 
                                type="text" 
                                name="UserEmail" 
                                required
                                placeholder="Andalucia"
                                onChange={(e) => getRegion(e)}
                /></td>
              </tr>
    
              <tr>
                <td className="">Ciudad</td>
                <td className=""><input 
                                  className="inputText"
                                  type="text" 
                                  name="UserEmail" 
                                  required  
                                  placeholder="Málaga"             
                  onChange={(e) => getCity(e)}
                /></td>
              </tr>

              <tr>
                <td className="">Codigo Postal</td>
                <td className=""><input 
                                  className="inputText" 
                                  type="text" 
                                  name="UserName" 
                                  id="demo"
                                  required
                                  placeholder="29015"
                                  onChange={(e) => getPostalCode(e)}
                /></td>
              </tr>

              <tr>
                <td className="">Direccion</td>
                <td className=""><input 
                                  className="inputText" 
                                  type="text" 
                                  name="UserEmail" 
                                  required
                                  placeholder="Calle Molina Lario 24"
                                  onChange={(e) => getAdress(e)}
                /></td>
              </tr>

              <tr>
                <td className="disable">Actividad</td>
                <td className="disable"><input 
                                  className="inputText"
                                  type="text" 
                                  name="CompanyActivity"              
                  onChange={(e) => getActivity(e)}
                /></td>
              </tr>

              <tr>
                <td className="">Empresa matriz</td>
                <td className=""><input 
                                  className="inputText"
                                  type="text" 
                                  name="UserEmail" 
                                  placeholder="12345678"                                       
                  onChange={(e) => getParentCompany_CIF(e)}
                /></td>
              </tr>
            </tbody>
          </table>
          
          

          <button 
            type="submit" 
            value="Submit"
            className="newUserSubmit"
            
            onClick={(e) => CompanyService.postCompany(e, 
                  newCompany.companyName, newCompany.CIF, 
                  newCompany.activity, newCompany.region,
                  newCompany.city,
                  newCompany.postalCode, newCompany.adress, 
                  newCompany.parentCompany_CIF, token)
              .then((async (response) => {
                
                setCount(count +1)
                setMessage("Operacion Completada")
                let MessageError = {ok: true};
                setMessageError(MessageError)
                setMDisplay(true)
                await delay(3000)
                await setMDisplay(false)
              })).catch(async (err) => {
                
                setMessage("Fallo en la modificacion de la empresa")
                setMessageError(err.error.errors)
                setMDisplay(true)
                await delay(3000)
                await setMDisplay(false)
              })}>Crear Empresa</button>            
        </form>
          
        
          
      </div>
        <MessageDisplay display={MDisplay} setMDisplay={setMDisplay} Message={Message} setMessage={setMessage} MessageError={MessageError} setMessageError={setMessageError}/>
    </div>
  );
    
}

export default NewUser; 