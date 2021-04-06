import '../Css/CompanyController/SelectedCompany.css';
import { useState } from 'react';
import { useContext } from "react";
import { GlobalContext } from "../../App";

import MessageDisplay from "../MessageDisplay.js"

import CompanyService from "../../services/company.service"
import * as React from "react";

import { useRouteMatch, Link} from "react-router-dom";
 
function SelectedProfile({selectedCompany, setSelectedCompany, 
                        cardStatus, closeCard, count, setCount}) {
  const { userData } = useContext(GlobalContext);
  let match = useRouteMatch();
  const delay = ms => new Promise(res => setTimeout(res, ms));
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
  if (parentCompany_CIF == null) {parentCompany_CIF = ""}

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
  const [MDisplay, setMDisplay] = useState(false);
  const [Message, setMessage] = useState("");
  const [MessageError, setMessageError] = useState();

  

  return (
    <div className="SelectedCompanyComponent">
      <h3>Empresa {companyName}</h3>
      <div className="ProfileCard">
        <button type="button" className="closeTab" onClick={() => {
                closeCard(!cardStatus)
                setSelectedCompany(defaultSelected)  
                setDisable(true);          
            }}>X</button>
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
                                  disabled={disable}
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
                                  disabled={true}
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
                                  disabled={disable}
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
                                  disabled={disable}
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
                                  disabled={disable}
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
                                  disabled={disable}
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
                                  disabled={disable}
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

          <button type="button" className="edit" disabled={!disable} onClick={() => {setDisable(!disable)}}>
            Editar
          </button>

          <button 
            type="submit"
            disabled={disable}
            className=""
            onClick={(e) => CompanyService.putCompany(e, id, selectedCompany.companyName, selectedCompany.activity, selectedCompany.region, selectedCompany.city, selectedCompany.postalCode, selectedCompany.adress, token)
              .then((async (response) => {
                setDisable(!disable);
                setSelectedCompany(selectedCompany)
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
            })}>Guardar</button>
        
          

          <button 
            type="reset" 
            disabled={disable} 
            onClick={(e) => {setDisable(!disable)}}>
            Cancelar
          </button>

          
          

          <button 
              type="button" 
              className="remove" 
              disabled={disable} 
              onClick={(e) => {window.confirm("Esta acción borrará el usuario. ¿Esta seguro?") ? 
              CompanyService.deleteCompany(e, id, token)
              .then((response) => {
                  closeCard(!cardStatus)
                  setCount(count+1)
            }).catch(err => {
            }) : console.log("Not deleted") } }>
                Eliminar
            </button>
        </form>
        
        <Link to={`${match.url}/Sub/${CIF}`} className="Administrate">
            <button className="Administrate">Administrar Subcontratas</button>
        </Link>
      </div>
        <MessageDisplay display={MDisplay} setMDisplay={setMDisplay} Message={Message} setMessage={setMessage} MessageError={MessageError} setMessageError={setMessageError}/>
    </div>
  );
}

export default SelectedProfile; 