import '../Css/Profile.css';
import { useGetUser, useGetToken, useGetID, useGetUsername, useGetEmail, useGetRole, useGetCIF } from "../../services/auth.effect"
import React, { useState, useEffect } from 'react';
import { useContext } from "react";
import { GlobalContext } from "../../App";
import AuthService from "../../services/auth.service";
import CompanyService from "../../services/company.service";
import {useGetCompany} from "../../services/company.effect.js"
import MessageDisplay from "../MessageDisplay.js"






function CompanyPage() {
  const { userData, setUserData } = useContext(GlobalContext);
  const [disable, setDisable] = useState(true);
  const [MDisplay, setMDisplay] = useState(false);
  const [Message, setMessage] = useState("");
  const [MessageError, setMessageError] = useState();
  const delay = ms => new Promise(res => setTimeout(res, ms));

  let companyInfo = useGetCompany(userData.user.CIF, userData.token);
  
  
  const [userCompany, setUserCompany] = useState(companyInfo);
  
  
  if (!companyInfo) return null;
  
  if (userCompany) {
    companyInfo = userCompany;
  }
  let id = companyInfo._id;
  let companyName = companyInfo.companyName;
  let CIF = companyInfo.CIF;
  let activity = companyInfo.activity;
  let region = companyInfo.region;
  let city = companyInfo.city;
  let postalcode = companyInfo.postalCode;
  let adress = companyInfo.adress;
  
  let token = userData.token;
  let change = {
    companyNameChange: companyName,
    activityChange: activity,
    regionChange: region,
    cityChange: city,
    postalcodeChange: postalcode,
    adressChange: adress,
  }
  
  

  function getCompanyName(e) {
    change.companyNameChange = e.target.value;
  }
  function getActivity(e) {
    change.activityChange = e.target.value;
  }
  function getRegion(e) {
    change.regionChange = e.target.value;
    region = e.target.value;
  }
  function getCity(e) {
    change.cityChange = e.target.value;
  }
  function getPostalcode(e) {
    change.postalcodeChange = e.target.value;
  }
  function getAdress(e) {
    change.adressChange = e.target.value;
  }

  function editButton(userRole) {
    if (userRole !== "USER") {
      return <button 
              type="button"
              disabled={!disable}
              onClick={() => {
                setDisable(!disable)}}>
              Editar
            </button>
    }
  }
  
  


  return (
    <div className="ProfileComponent">
      <h3>Perfil</h3>
      <div className="ProfileCard">
        <form>
          <table className="tg">
            <tbody>
            <tr>
                <td className="">ID de la empresa</td>
                <td className=""><input className=" inputText" type="text" name="UserEmail" defaultValue={id} disabled
                /></td>
              </tr>
              <tr>
                <td className="">Nombre de la empresa</td>
                <td className=""><input className=" inputText" type="text" name="UserName" defaultValue={companyName} disabled={disable}
                  onChange={(e) => getCompanyName(e)}
                /></td>
              </tr>
              <tr>
                <td className="">CIF</td>
                <td className=""><input className=" inputText" type="text" name="UserEmail" defaultValue={CIF} disabled
                  
                /></td>
              </tr>
              <tr>
                <td className="">Actividad</td>
                <td className=""><input className=" inputText" type="text" name="UserEmail" defaultValue={activity} disabled={disable}
                  onChange={(e) => getActivity(e)}
                /></td>
              </tr>
              <tr>
                <td className="">Region</td>
                <td className=""><input className=" inputText" type="text" name="UserEmail" defaultValue={region} disabled={disable}
                  onChange={(e) => getRegion(e)}
                /></td>
              </tr>
              <tr>
                <td className="">Ciudad</td>
                <td className=""><input className=" inputText" type="text" name="UserEmail" defaultValue={city} disabled={disable}
                  onChange={(e) => getCity(e)}
                /></td>
              </tr>
              <tr>
                <td className="">Codigo postal</td>
                <td className=""><input className=" inputText" type="text" name="UserEmail" defaultValue={postalcode} disabled={disable}
                  onChange={(e) => getPostalcode(e)}
                /></td>
              </tr>
              <tr>
                <td className="">Direccion</td>
                <td className=""><input className=" inputText" type="text" name="UserEmail" defaultValue={adress} disabled={disable}
                  onChange={(e) => getAdress(e)}
                /></td>
              </tr>
            </tbody>
          </table>
          
          {editButton(userData.user.role)}

          <button 
            type="submit"
            disabled={disable}
            className=""
            onClick={(e) => {setUserCompany(change);
               CompanyService.putCompany(e, id, change.companyNameChange, change.activityChange, change.regionChange, change.cityChange, change.postalcodeChange, change.adressChange, token)
              .then(((response) => {
                setDisable(!disable);
                setUserCompany(response.data)
            })).catch( async(err) => {
              setMessage("Fallo en la creacion de usuario")
                    setMessageError(err.error.errors)
                    setMDisplay(true)
                    await delay(3000)
                    await setMDisplay(false)
            })}}>
            
          Guardar
          </button>
          
          <button 
            type="button" 
            disabled={disable} 
            className="reset"
            onClick={(e) => {setDisable(!disable)}}>
            Cancelar
          </button>


        </form>
          
        
      </div>
        <MessageDisplay display={MDisplay} setMDisplay={setMDisplay} Message={Message} setMessage={setMessage} MessageError={MessageError} setMessageError={setMessageError}/>
    </div>
  );
}

export default CompanyPage; 