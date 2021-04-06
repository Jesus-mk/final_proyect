import EventEmitter from "eventemitter3";
const API_URL = "https://hidden-sands-57810.herokuapp.com/login";


class AuthService {
  constructor(){
    this.events = new EventEmitter();
    this.user = null;
  }
    logIn(e, email, password) {
        let actualPage = window.location.origin
        e.preventDefault();
        this.user = null;
        this.events.emit("user", null);
        
        let credentials = {
          email: email,
          password: password,
        }
        
        return fetch(`https://hidden-sands-57810.herokuapp.com/login`, {
          method: "POST",
          Cors: "CORS",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        })
          .then((response) => {
           
            if (response.status === 200) {
              
              
              return response.json()
            } else {
              
              throw new Error();
            }}) 
          .then((data) => {
            if (data && data.token) {
                this.user = data;
                localStorage.setItem('user', JSON.stringify(data))
                return data
            } else {
              console.log("No token");
                  throw new Error();
                }
          })                 
      }

    logout() {
      this.events.emit("user", null);
      this.user = null;
      localStorage.removeItem('user');
      localStorage.removeItem('company');
    }

    putUser(e, id, username, email, token) {
        
      e.preventDefault();
      
      let credentials = {
        username: username,
        email: email,
      }
      return fetch("https://hidden-sands-57810.herokuapp.com/user/?_id="+id, {
        method: "PUT",
        Cors: "CORS",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(credentials),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.ok) {
            let newUser = response;
            let oldUser = JSON.parse(localStorage.getItem('user'))
            
            oldUser.user.username = newUser.data.username;
            oldUser.user.email = newUser.data.email;
          
            let finalUser = JSON.stringify(oldUser);
            
            localStorage.setItem('user', finalUser)
              
            return response
          } else {
                let err = new Error()
                err.info = response.error.error.codeName;
                throw err;
              }
        })                 
    }
    /* register(username, email, password) {
        return axios.post(API_URL + "signup", {
            username,
            email,
            password
        });
    } */

    getCurrentUser(e) {
      e.preventDefault();
        return localStorage.getItem('user');
    }
}

export default new AuthService();