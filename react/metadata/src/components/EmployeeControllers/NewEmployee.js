import '../Css/EmployeeController/NewEmployee.css';
import React, { useState, useEffect } from 'react';
import { useContext } from "react";
import { GlobalContext } from "../../App";
import EmployeeService from "../../services/employee.service";
import { BrowserRouter, NavLink, Route, useRouteMatch, Link, useParams } from "react-router-dom";
import MessageDisplay from "../MessageDisplay.js"

function NewEmployee({count, setCount}) {
  const { userData, setUserData } = useContext(GlobalContext);
  const delay = ms => new Promise(res => setTimeout(res, ms));
  let match = useRouteMatch();
  
  const [newUser, setNewUser] = useState({
    CIF: match.params.CIF,
    DNI: "",
    name: "",
    firstLastName: "",
    secondLastName: "",
    job: "",
    startDate: "",
    endDate: "",
  });

  let CIF = newUser.CIF;
  let DNI = newUser.DNI;
  let name = newUser.name;
  let firstLastName = newUser.firstLastName;
  let secondLastName = newUser.secondLastName;
  let job = newUser.job;
  let startDate = newUser.startDate;
  let endDate = newUser.endDate;  
  
  const token = userData.token;
  let test = true;
  if (userData.user.role === "METADATA") test=false 
  const [disabled, setDisabled] = useState(test)
  
  
  function getCIF(e) {
    if (userData.user.role === "METADATA") {
      setNewUser({...newUser, CIF: e.target.value})
    }
  }

  function getDNI(e) {
    setNewUser({...newUser, DNI: e.target.value})
  }

  function getName(e) {
    setNewUser({...newUser, name: e.target.value})
  }

  function getFirstLastName(e) {
    setNewUser({...newUser, firstLastName: e.target.value})
  }

  function getSecondLastName(e) {
    setNewUser({...newUser, secondLastName: e.target.value})
  }

  function getJob(e) {
    setNewUser({...newUser, job: e.target.value})
  }

  function getStartDate(e) {
    setNewUser({...newUser, startDate: e.target.value})
  }

  function getEndDate(e) {
    setNewUser({...newUser, endDate: e.target.value})
  }
  const [disable, setDisable] = useState(true);
  const [whySoManyCounts, setwhySoManyCounts] = useState(0);
  const [MDisplay, setMDisplay] = useState(false);
  const [Message, setMessage] = useState("");
  const [MessageError, setMessageError] = useState();
  

  return (
    <div className="NewEmployeeComponent"> 
      <h3>Nuevo Empleado</h3>
      <div className="ProfileCard">
        <form>
          <table className="tg">
          <tbody>
              <tr>
                <td className="">CIF</td>
                <td className=""><input 
                                    className="inputText" 
                                    type="text" 
                                    name="UserCIF" 
                                    value ={CIF} 
                                    disabled={disabled}
                                    onChange={(e) => getCIF(e)}               
                /></td>
              </tr>
              
              <tr>
                <td className="">DNI*</td>
                <td className=""><input 
                                    className="inputText" 
                                    type="text" 
                                    name="UserfirstLastName" 
                                    value ={DNI} 
                                    placeholder="77174707A"
                                    onChange={(e) => getDNI(e)}               
                /></td>
              </tr>
              <tr>
                <td className="">Nombre de Empleado*</td>
                <td className=""><input 
                                  className=" inputText" 
                                  type="text" 
                                  name="Name" 
                                  id="demo"
                                  value={name}
                                  placeholder="Sebastián"
                                
                  onChange={(e) => getName(e)}
                /></td>
              </tr>
              <tr>
                <td className="">Primer apellido*</td>
                <td className=""><input 
                                  className="inputText"
                                  type="text" 
                                  name="UserfirstLastName"
                                  value={firstLastName} 
                                  placeholder="Garrido"
                                
                  onChange={(e) => getFirstLastName(e)}
                /></td>
              </tr>
              <tr>
                <td className="">Segundo apellido</td>
                <td className=""><input 
                                  className="inputText"
                                  type="text" 
                                  name="UserfirstLastName"
                                  value={secondLastName} 
                                  placeholder="Campos"
                  onChange={(e) => getSecondLastName(e)}
                /></td>
              </tr>
              <tr>
                <td className="">Actividad*</td>
                <td className=""><input 
                                  className="inputText"
                                  type="text" 
                                  name="UserfirstLastName"
                                  value={job} 
                                  placeholder="Ingeniero"
                  onChange={(e) => getJob(e)}
                /></td>
              </tr>
              <tr>
                <td className="">Fecha de inicio**</td>
                <td className=""><input 
                                  className=" inputText" 
                                  type="text" 
                                  name="Name" 
                                  id="demo"
                                  value={startDate}
                                  placeholder="2020-12-31"
                  onChange={(e) => getStartDate(e)}
                /></td>
              </tr>

              <tr>
                <td className="">Fecha de fin**</td>
                <td className=""><input 
                                  className=" inputText" 
                                  type="text" 
                                  name="Name" 
                                  id="demo"
                                  value={endDate}
                                  placeholder="2025-12-31"
                  onChange={(e) => getEndDate(e)}
                /></td>
              </tr>
              <tr><small>* Requerido.</small></tr>
              <tr><small>** Formato año-mes-dia</small></tr>
            </tbody>
          </table>
          
          <button 
            type="submit" 
            value="Submit"
            className="newUserSubmit"
            
            onClick={(e) => (
              e.preventDefault(),
              setwhySoManyCounts(whySoManyCounts + 1), 
              EmployeeService.postEmployee(newUser, token)
                .then((async (response) => {
                  setCount(count +1)
                  setMessage("Operacion Completada")
                  let MessageError = {ok: true};
                  setMessageError(MessageError)
                  setMDisplay(true)
                  await delay(3000)
                  await setMDisplay(false)
                })).catch( async(err) => {
                  if (err.error.kind === "date") {
                    
                  } else {
                    setMessage("Fallo en la creacion de usuario y empresa")
                    setMessageError(err.error.errors)
                    setMDisplay(true)
                    await delay(3000)
                    await setMDisplay(false)
                  }
                }))}>  
          Nuevo empleado
          </button>

                   
        </form>
          
        
          
      </div>
        <MessageDisplay display={MDisplay} setMDisplay={setMDisplay} Message={Message} setMessage={setMessage} MessageError={MessageError} setMessageError={setMessageError}/>
    </div>
  );
    
}

export default NewEmployee; 