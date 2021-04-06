import '../Css/CompanyController/SelectedCompany.css';
import { useState, useEffect } from 'react';
import { useContext } from "react";
import { GlobalContext } from "../../App";
import AuthService from "../../services/auth.service";
import CompanyService from "../../services/company.service"
import * as React from "react";
import { render } from "react-dom";
import { BrowserRouter, NavLink, Route, useRouteMatch, Link, useParams } from "react-router-dom";

function SelectedSubCompany({selectedCompany, setSelectedCompany, 
                        cardStatus, closeCard, count, setCount}) {
  const { userData, setUserData } = useContext(GlobalContext);
  let match = useRouteMatch();
  let defaultSelected = {
    id: "",
    companyName: "",
    CIF: "",
    activity: "",
    region: "",
    city: "",
    postalCode: "",
    adress: "",
    parentCompany_CIF: "",
    subCompany: "",
  }
  
  let id = selectedCompany._id;
  let companyName = selectedCompany.companyName;
  let CIF = selectedCompany.CIF;
  let activity = selectedCompany.activity;
  let region = selectedCompany.region;
  let city = selectedCompany.city;
  let postalCode = selectedCompany.postalCode;
  let adress = selectedCompany.adress;
  let parentCompany_CIF = selectedCompany.parentCompany_CIF;
  let subCompany = selectedCompany.subCompany_id;
    
 
  const token = userData.token;

  function getCompanyName(e) {setSelectedCompany({...selectedCompany, companyName: e.target.value})}
  function getCIF(e) {setSelectedCompany({...selectedCompany, CIF: e.target.value})}
  function getActivity(e) {setSelectedCompany({...selectedCompany, activity: e.target.value})}
  function getRegion(e) {setSelectedCompany({...selectedCompany, region: e.target.value})}
  function getCity(e) {setSelectedCompany({...selectedCompany, city: e.target.value})}
  function getPostalCode(e) {setSelectedCompany({...selectedCompany, postalCode: e.target.value})}
  function getAdress(e) {setSelectedCompany({...selectedCompany, adress: e.target.value})}

  const [disable, setDisable] = useState(true);

  let parentDisable;
  if (subCompany) { 
    subCompany.length === 0 ?
      parentDisable = true :
      parentDisable = false;
  }

  return (
    <div className="SelectedCompanyComponent">
      <h3>Perfil</h3>
      <div className="ProfileCard">
        <form>
          <table className="tg">
            <tbody>
              <tr>
                <td className="">ID</td>
                <td className=""><input 
                                    className="inputText" 
                                    type="text" 
                                    name="UserEmail" 
                                    value ={id} 
                                    disabled
                                    
                /></td>
              </tr>
              <tr>
                <td className="">Nombre</td>
                <td className=""><input 
                                  className=" inputText" 
                                  type="text" 
                                  name="UserName" 
                                  id="demo"
                                  value={companyName}
                                  disabled
                  onChange={(e) => getCompanyName(e)}
                /></td>
              </tr>
              <tr>
                <td className="">CIF</td>
                <td className=""><input 
                                  className="inputText"
                                  type="text" 
                                  name="UserEmail"
                                  value={CIF} 
                                  disabled
                  onChange={(e) => getCIF(e)}
                /></td>
              </tr>
              <tr>
                <td className="">Actividad</td>
                <td className=""><input 
                                  className="inputText"
                                  type="text"
                                  name="UserCIF"
                                  value={activity} 
                                  disabled
                  onChange={(e) => getActivity(e)}
                /></td>
              </tr>
              <tr>
                <td className="">Región</td>
                <td className=""><input 
                                  className="inputText"
                                  type="text"
                                  name="UserCIF"
                                  value={region} 
                                  disabled
                  onChange={(e) => getRegion(e)}
                /></td>
              </tr>
              <tr>
                <td className="">Ciudad</td>
                <td className=""><input 
                                  className="inputText"
                                  type="text"
                                  name="companyCIF"
                                  value={city} 
                                  disabled
                  onChange={(e) => getCity(e)}
                /></td>
              </tr>

              <tr>
                <td className="">Codigo Postal</td>
                <td className=""><input 
                                  className="inputText"
                                  type="text" 
                                  name="UserEmail"
                                  value={postalCode} 
                                  disabled
                  onChange={(e) => getPostalCode(e)}
                /></td>
              </tr>
              <tr>
                <td className="">Dirección</td>
                <td className=""><input 
                                  className="inputText"
                                  type="text" 
                                  name="UserEmail"
                                  value={adress} 
                                  disabled
                  onChange={(e) => getAdress(e)}
                /></td>
              </tr>
              <tr>
                <td className="">Empresa Matriz</td>
                <td className=""><input 
                                  className="inputText"
                                  type="text" 
                                  name="ParentCompany"
                                  value={parentCompany_CIF} 
                                  disabled
                /></td>
              </tr>
            </tbody>
          </table>
          <div className="">
            <button type="button" onClick={() => {
                closeCard(!cardStatus)
                setSelectedCompany(defaultSelected)  
                setDisable(true);          
            }}>Cerrar</button>

            
            <button 
              type="button" 
              className="remove" 
              
              onClick={(e) => {window.confirm("Esta acción borrará la empresa de sus subcontratas. ¿Esta seguro?") ? 
              CompanyService.deleteSubCompany(e, id, parentCompany_CIF, token)
              .then((response) => {
                closeCard(!cardStatus)
                setSelectedCompany(defaultSelected)  
                setDisable(true); 
                setCount(count+1)
            }).catch(err => {
            }) : console.log("Not deleted") } }>
                Eliminar
            </button>
          </div>
          
          
        </form>
        
       
      </div>
    </div>
  );
}

export default SelectedSubCompany; 