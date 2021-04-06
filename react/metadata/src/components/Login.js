import './Css/Login.css';
import AuthService from "../services/auth.service";

import { useHistory } from "react-router-dom";

import { useContext } from "react";
import { GlobalContext } from "../App";

function Login() {
  
  const { setUserData } = useContext(GlobalContext);
  let history = useHistory();
  
  let email;
  let password;
  
  function getEmail(e) {
    email = e.target.value;
  }

  function getPassword(e) {
    password = e.target.value;
  }

  return (
    <div className="LoginComponent flex-colum">
      <div className=" Card flex-colum">
        <div className=" logo"></div>
        <div className=" metacontratas"></div>
        <div className=" FormDiv flex-colum">
          <form className=" flex-colum">
            <input className=" inputText" type="text" name="UserEmail" placeholder="Email" required
              onChange={(e) => getEmail(e)}
            />

            <input className=" inputText" type="password" name="UserPassword" placeholder="Password" required
              onChange={(e) => getPassword(e)}
            />

            <div className=" error flex-colum disable" id="error">
              <p>Credenciales erroneas</p>
            </div>

            <button className=" btn" type="submit"
              onClick={(e) => AuthService.logIn(e, email, password)
                .then(((data) => {
                  let role = data.user.role;
                  let id = data.user._id;
                  let dataTest = JSON.parse(localStorage.getItem('user'))
                  setUserData(data);
                  if (role === "METADATA") {history.push({pathname: "/Metadata/"+id,})

                  } else if (role ==="ADMIN") {history.push("/Admin/"+id);
                  } else {history.push("/User/"+id);}
                  
                })).catch(error => {
                  let element = document.getElementById("error");
                  element.classList.remove('disable');
                })}
            >Login</button>
          </form>
          <div className=" Links">
            <a href="">Contraseña olvidada</a>
            <a href="">Contáctanos</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
