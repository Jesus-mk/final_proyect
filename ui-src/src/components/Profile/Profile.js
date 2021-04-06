import { useGetUser, useGetToken, useGetID, useGetUsername, useGetEmail, useGetRole, useGetCIF } from "../../services/auth.effect"
import '../Css/Profile.css';
import React, { useState, useEffect } from 'react';
import { useContext } from "react";
import { GlobalContext } from "../../App";
import AuthService from "../../services/auth.service";
import MessageDisplay from "../MessageDisplay.js"

function ProfilePage() {
  
  const { userData, setUserData } = useContext(GlobalContext);
  const [disable, setDisable] = useState(true);
  const [MDisplay, setMDisplay] = useState(false);
  const [Message, setMessage] = useState("");
  const [MessageError, setMessageError] = useState();
  const delay = ms => new Promise(res => setTimeout(res, ms));

  let id = userData.user._id;
  const user = userData.user.username;
  const email = userData.user.email;
  const role = userData.user.role;
  const CIF = userData.user.CIF;
  const token = userData.token;
  /* id = "603d9111cbb8130b54b4d2bc" */
  const [userProfile, setuserProfile] = useState(userData.user);
  let usernameChange = user;
  let emailChange = email;

  function getUsername(e) {
    setuserProfile({ ...userProfile, username: e.target.value });
  }

  function getEmail(e) {
    setuserProfile({ ...userProfile, email: e.target.value });
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
                <td className="">ID del Usuario</td>
                <td className=""><input className=" inputText" type="text" name="UserEmail" defaultValue ={userProfile._id} disabled
                  
                /></td>
              </tr>
              <tr>
                <td className="">Nombre de Usuario</td>
                <td className=""><input className=" inputText" type="text" name="UserName" value={userProfile.username} disabled={disable}
                  onChange={(e) => getUsername(e)}
                /></td>
              </tr>
              <tr>
                <td className="">Email</td>
                <td className=""><input className=" inputText" type="text" name="UserEmail" defaultValue={userProfile.email} disabled={disable}
                  onChange={(e) => getEmail(e)}
                /></td>
              </tr>
              <tr>
                <td className="">Rol</td>
                <td className=""><input className=" inputText" type="text" name="UserEmail" defaultValue={userProfile.role} disabled
                  
                /></td>
              </tr>
              <tr>
                <td className="">CIF</td>
                <td className=""><input className=" inputText" type="text" name="UserEmail" defaultValue={userProfile.CIF} disabled
                  
                /></td>
              </tr>
            </tbody>
          </table>
         
          {editButton(userData.user.role)}

          <button 
            type="submit"
            disabled={disable}
            className=""
            onClick={(e) => AuthService.putUser(e, id, userProfile.username, emailChange, token)
            .then((async (response) => {
              userData.user = response.data;
              setUserData(userData)
              setDisable(!disable);
              setMessage("Operacion Completada")
                let MessageError = {ok: true};
                setMessageError(MessageError)
                setMDisplay(true)
                await delay(3000)
                await setMDisplay(false)
              
          })).catch(async(err) => {
            setMessage("Fallo en la actualizacion del usuario")
            let MessageError = {ok: true};
            setMessageError(MessageError)
                    setMDisplay(true)
                    await delay(3000)
                    await setMDisplay(false)
          })}>
            
          Guardar
          </button>
          
          <button 
            className="reset"
            type="reset" 
            disabled={disable} 
            onClick={(e) => {setDisable(!disable)}}>
            Cancelar
          </button>
          
        </form>
        {/* <p> Token: {JSON.stringify(token, null, 2)} </p> */}
      </div>
        <MessageDisplay display={MDisplay} setMDisplay={setMDisplay} Message={Message} setMessage={setMessage} MessageError={MessageError} setMessageError={setMessageError}/>
    </div>
  );
}

export default ProfilePage; 