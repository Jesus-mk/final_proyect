import '../Css/UserController/SelectedProfile.css';
import { useState } from 'react';
import { useContext } from "react";
import { GlobalContext } from "../../App";
import MessageDisplay from "../MessageDisplay.js"
 
import UserService from "../../services/users.service.js"
import * as React from "react";


function SelectedProfile({selectedUser, setSelectedUser, 
                        cardStatus, closeCard, count, setCount}) {

  const { userData, setUserData } = useContext(GlobalContext);
  const [disable, setDisable] = useState(true);
  const delay = ms => new Promise(res => setTimeout(res, ms));
  
  let defaultSelected = {
    id: "",
    username: "",
    email: "",
    role: "",
    CIF: "",
  }
  const [MDisplay, setMDisplay] = useState(false);
  const [Message, setMessage] = useState("");
  const [MessageError, setMessageError] = useState();
   
  if (selectedUser === undefined) return null;

  let id = selectedUser._id;
  let user = selectedUser.username;
  let email = selectedUser.email;
  let role = selectedUser.role;
  let CIF = selectedUser.CIF;
    
  const token = userData.token;

  

  function getUsername(e) {
    setSelectedUser({...selectedUser, username: e.target.value})
  }

  function getEmail(e) {
    setSelectedUser({...selectedUser, email: e.target.value})
  }
  function getRole(e) {
    setSelectedUser({...selectedUser, role: e.target.value})
  }

  

  
   
  return (
    <div className="SelectedProfileComponent">
      <MessageDisplay display={MDisplay} setMDisplay={setMDisplay} Message={Message} setMessage={setMessage} MessageError={MessageError} setMessageError={setMessageError}/>
      <h3>Perfil</h3>
      <div className="ProfileCard">
      <button type="button" className="closeTab" onClick={() => {
              closeCard(!cardStatus)
              setSelectedUser(defaultSelected)  
              setDisable(true);          
          }}>X</button>
        <form>
          <table className="tg">
            <tbody>

              <tr>
                <td className="">ID del Usuario</td>
                <td className=""><input 
                                    className="inputText" 
                                    type="text" 
                                    name="UserEmail" 
                                    value ={id} 
                                    disabled
                                    onChange={(e) => getEmail(e)}
                /></td>
              </tr>

              <tr>
                <td className="">Nombre de Usuario</td>
                <td className=""><input 
                                  className=" inputText" 
                                  type="text" 
                                  name="UserName" 
                                  id="demo"
                                  value={user}
                                  disabled={disable}
                  onChange={(e) => getUsername(e)}
                /></td>
              </tr>

              <tr>
                <td className="">Email</td>
                <td className=""><input 
                                  className="inputText"
                                  type="text" 
                                  name="UserEmail"
                                  value={email} 
                                  disabled={disable}
                  onChange={(e) => getEmail(e)}
                /></td>
              </tr>

              <tr>
                <td className="">Rol</td>
                <td className="">
                  <select 
                      className="" 
                      name="role" 
                      id="fRole" 
                      placeholder="Rol" 
                      value={role}
                      disabled={disable}
                      onChange={(e) => getRole(e)}>
                      
                      <option value="ADMIN">Admin</option>
                      <option value="USER">User</option>
                  </select>
                </td>
              </tr>
              
              <tr>
                <td className="">CIF</td>
                <td className=""><input 
                                  className="inputText"
                                  type="text"
                                  name="UserCIF"
                                  value={CIF} 
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
            onClick={(e) => UserService.putUser(e, id, selectedUser.username, selectedUser.email, selectedUser.role, token)
              .then((async (response) => {
                
                setDisable(!disable);
                setSelectedUser(selectedUser)
                setMessage("Operacion Completada")
                let MessageError = {ok: true};
                setMessageError(MessageError)
                setMDisplay(true)
                setCount(count +1)
                await delay(3000)
                await setMDisplay(false)
              }))
              .catch( async(err) => {
                setMessage("Fallo en la modificacion del usuario")
                if (err.error.errors) {
                  setMessageError(err.error.errors)
                  setMDisplay(true)
                  await delay(3000)
                  await setMDisplay(false)
                }
                if (err.error.code === 11000) { // Error 11000 = duplicated key|MongoError
                  err = {error: "Duplicate Email"}
                  setMessageError(err)
                  setMDisplay(true)
                  await delay(3000)
                  await setMDisplay(false)
                }
                
              })}
                
            >Guardar
          </button>

          <button 
            type="button" 
            className="reset"
            disabled={disable} 
            onClick={(e) => {setDisable(!disable)}}>
            Cancelar
          </button>

            <button 
              type="button" 
              className="remove" 
              disabled={disable}
              onClick={(e) => {window.confirm("Esta acción borrará el usuario. ¿Esta seguro?") ? 
                UserService.deleteUser(e, id, token)
                  .then((response) => {
                    setDisable(!disable);
                    closeCard(!cardStatus)
                    setCount(count+1)
                    
                }).catch(err => {
                  console.log("Error at updating User, reason: ", err)
                }) : console.log("Not deleted") } }>
                Eliminar
            </button>
        </form>
      </div>
        
    </div>
  );
}

export default SelectedProfile; 