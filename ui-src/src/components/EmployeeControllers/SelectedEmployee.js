import '../Css/EmployeeController/SelectedEmployee.css';
import { useState, useEffect } from 'react';
import { useContext } from "react";
import { GlobalContext } from "../../App";
import AuthService from "../../services/auth.service";
import EmployeeService from "../../services/employee.service.js"
import * as React from "react";
import { render } from "react-dom";
import ReactDOM from 'react-dom';
import FileUploadPage from "../uploadImage.js"
import MessageDisplay from "../MessageDisplay.js"



function SelectedEmployee({selectedUser, setSelectedUser, 
                        cardStatus, closeCard, count, setCount}) {
  const { userData, setUserData } = useContext(GlobalContext);
  


  let defaultSelected = {
    id: "",
    name: "",
    firstLastName: "",
    secondLastName: "",
    job: "",
    startDate: "",
    endDate: "",
    expired: "",
  }
  
  let id = selectedUser._id;
  let DNI = selectedUser.DNI;
  let name = selectedUser.name;
  let firstLastName = selectedUser.firstLastName;
  let secondLastName = selectedUser.secondLastName;
  let job = selectedUser.job;
  let startDate = selectedUser.startDate;
  let endDate = selectedUser.endDate;
  let expired = selectedUser.expired; 

  const [dates, setDates] = useState({
    firstDate: "",
    secondDate: "",
  })

  if (selectedUser.startDate !== undefined) {
    startDate = selectedUser.startDate.slice(0, 10);
    endDate = selectedUser.endDate.slice(0, 10);
  }
 

  const token = userData.token;
  
  
  function getName(e) {
    setSelectedUser({...selectedUser, name: e.target.value})
  }

  function getFirstLastName(e) {
    setSelectedUser({...selectedUser, firstLastName: e.target.value})
  }

  function getSecondLastName(e) {
    setSelectedUser({...selectedUser, secondLastName: e.target.value})
  }

  function getJob(e) {
    setSelectedUser({...selectedUser, job: e.target.value})
  }

  function getStartDate(e) {
    setSelectedUser({...selectedUser, startDate: e.target.value})
  }

  function getEndDate(e) {
    setSelectedUser({...selectedUser, endDate: e.target.value})
  }

  function getExpired(e) {
    setSelectedUser({...selectedUser, expired: e.target.value})
  }

  function uploadPicture(e) {
    e.preventDefault();
   /*  EmployeeService.postPicture(selectedUser._id, token) */
  }

  const [disable, setDisable] = useState(true); 
  const [MDisplay, setMDisplay] = useState(false);
  const [Message, setMessage] = useState("");
  const [MessageError, setMessageError] = useState();
  
  let url;
  if (selectedUser._id !== undefined) url = `http://localhost:3000/employee/image/?id=${selectedUser.profilePicture}`
  const delay = ms => new Promise(res => setTimeout(res, ms));
 
return (
    <div className="SelectedEmployeeComponent">
      
      <div id="container"></div>
      <h3>Empleado: {name} {firstLastName} {secondLastName} </h3>
      <div className="EmployeeCard grid-container1">
        <button type="button" className="closeTab" onClick={() => {
              setCount(count +1); 
              closeCard(!cardStatus);
              setSelectedUser(defaultSelected)  ;
              setDisable(true);   
          }}>X</button>
        <div class="form">
          <form>
          <table className="tg">
            <tbody>
              <tr>
                <td className="">ID del Empleado</td>
                <td className=""><input 
                                    className="inputText" 
                                    type="text" 
                                    name="UserfirstLastName" 
                                    value ={id} 
                                    disabled                
                /></td>
              </tr>
              <tr>
                <td className="">DNI</td>
                <td className=""><input 
                                    className="inputText" 
                                    type="text" 
                                    name="UserfirstLastName" 
                                    value ={DNI} 
                                    disabled               
                /></td>
              </tr>
              <tr>
                <td className="">Nombre</td>
                <td className=""><input 
                                  className=" inputText" 
                                  type="text" 
                                  name="Name" 
                                  id="demo"
                                  value={name}
                                  disabled={disable}
                  onChange={(e) => getName(e)}
                /></td>
              </tr>
              <tr>
                <td className="">Primer apellido</td>
                <td className=""><input 
                                  className="inputText"
                                  type="text" 
                                  name="UserfirstLastName"
                                  value={firstLastName} 
                                  disabled={disable}
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
                                  disabled={disable}
                  onChange={(e) => getSecondLastName(e)}
                /></td>
              </tr>
              <tr>
                <td className="">Actividad</td>
                <td className=""><input 
                                  className="inputText"
                                  type="text" 
                                  name="UserfirstLastName"
                                  value={job} 
                                  disabled={disable}
                  onChange={(e) => getJob(e)}
                /></td>
              </tr>
              <tr>
                <td className="">Fecha de inicio</td>
                <td className=""><input 
                                  className=" inputText" 
                                  type="text" 
                                  name="Name" 
                                  id="demo"
                                  value={startDate}
                                  disabled={disable}
                  onChange={(e) => getStartDate(e)}
                /></td>
              </tr>

              <tr>
                <td className="">Fecha de fin</td>
                <td className=""><input 
                                  className=" inputText" 
                                  type="text" 
                                  name="Name" 
                                  id="demo"
                                  value={endDate}
                                  disabled={disable}
                  onChange={(e) => getEndDate(e)}
                /></td>
              </tr>
              
            </tbody>
          </table>

          <button className="edit" type="button" disabled={!disable} onClick={() => {setDisable(!disable)}}>
            Editar
          </button>

          <button 
            type="submit"
            disabled={disable}
            className=""
            onClick={(e) => EmployeeService.putUser(e, id, selectedUser, token)
              .then((async (response) => {
                setDisable(true);
                setMessage("Operacion Completada")
                let MessageError = {ok: true};
                setMessageError(MessageError)
                setMDisplay(true)
                await delay(3000)
                await setMDisplay(false)
                
                await setSelectedUser(selectedUser)
                await closeCard(!cardStatus);
                await setCount(count +1)
                
                
            })).catch( async(err) => {
              setMessage("Fallo en la actualizacion del empleado")
                  if (err.error.kind === "date") {
                    let MessageError = {dateError: "Invalid format date"}
                    setMessageError(MessageError)
                    setMDisplay(true)
                    await delay(3000)
                    await setMDisplay(false)

                  } else {
                    setMessageError(err.error.errors)
                    setMDisplay(true)
                    await delay(3000)
                    await setMDisplay(false)
                  }
            })}>Guardar
          </button>
        
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
              onClick={(e) => {window.confirm("Esta acción borrará al empleado. ¿Esta seguro?") ? 
              EmployeeService.deleteEmployee(e, id, token)
                .then(async (response) => {
                  await setDisable(true);
                  await setCount(count+1)
                  await delay(1000)
                  await closeCard(!cardStatus)
                })
                .catch(err => {
                  
                }) : console.log("Not deleted") } }>
                  Eliminar
            </button>
          
        </form>
        </div>
        <div className="img" >
          <img className="photo" src={url}/>
        
          <FileUploadPage id={selectedUser._id} count={count} setCount={setCount} disable={disable} setDisable={setDisable}></FileUploadPage>
        </div>
      </div>
      <MessageDisplay display={MDisplay} setMDisplay={setMDisplay} Message={Message} setMessage={setMessage} MessageError={MessageError} setMessageError={setMessageError}/>
    </div>
  );
}

export default SelectedEmployee; 