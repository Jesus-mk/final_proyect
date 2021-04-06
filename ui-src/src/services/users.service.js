
import EventEmitter from "eventemitter3";

 
const API_URL = "https://hidden-sands-57810.herokuapp.com/login";


class UsersService {
  constructor(){
    this.events = new EventEmitter();
    this.user = null;
  }
    getUsers(username, email, CIF, role, token, page) {
      page = page * 10;
      return fetch(`https://hidden-sands-57810.herokuapp.com/user?from=${page}&limit=11&username=${username}&CIF=${CIF}&email=${email}&role=${role}`, {
      method: "GET",
      Cors: "CORS",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    
    }).then((response) => response.json())
      .then((response) => {
        if (response.ok) {
                      
          return response.data
        } 
      }).catch((error) => {
      }) 
    }

    putUser(e, id, username, email, role, token) {
        
      e.preventDefault();
      
      let credentials = {
        username: username,
        email: email,
        role: role,
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
            
              
            return response
          } else {
                let err = response;
                throw err;
              }
        })                 
    }

    postUser(username, email, password, role, CIF, token) {
      
      let credentials = {
        username: username,
        email: email,
        password: password,
        role: role,
        CIF: CIF,
      }


      return fetch("https://hidden-sands-57810.herokuapp.com/user", {
        method: "POST",
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
            
              
            return response
          } else {
                let err = response
                throw err;
              }
        })                 
    }

    postUserCompany(e, username, email, password, role, CIF, companyName, adress, postalCode, region, city, activity, parentCompany_CIF, token) {
        
      e.preventDefault();
      
      let credentials = {
        username: username,
        email: email,
        password: password,
        role: role,
        CIF: CIF,
        companyName: companyName,
        adress: adress,
        postalCode: postalCode,
        region: region,
        city: city,
        activity: activity,
        parentCompany_CIF: parentCompany_CIF,
      }

      return fetch("https://hidden-sands-57810.herokuapp.com/user?newCompany=true", {
        method: "POST",
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
              
            return response
          } else {
                let err = response
                throw err;
              }
        })                 
    }

    deleteUser(e, id, token) {
        
      e.preventDefault();
      
    
      return fetch("https://hidden-sands-57810.herokuapp.com/user?_id="+id, {
        method: "DELETE",
        Cors: "CORS",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.ok) {
              
            return response
          } else {
                let err = new Error()
                
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

export default new UsersService();