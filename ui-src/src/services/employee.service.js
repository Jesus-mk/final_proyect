
import EventEmitter from "eventemitter3";

 
const API_URL = "https://hidden-sands-57810.herokuapp.com/login";


class EmployeeService {
  constructor(){
    this.events = new EventEmitter();
    this.user = null;
  }
    getEmployees(DNI, name, secondName, job, expired, CIF, token, page) {
      page = page * 10;
      return fetch(`https://hidden-sands-57810.herokuapp.com/employee?from=${page}&limit=11&DNI=${DNI}&name=${name}&firstLastName=${secondName}&job=${job}&expired=${expired}&CIF=${CIF}`, {
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
          /* Aqui iba response.data[0] por si peta luego */
        } 
      }).catch((error) => {
      }) 
    }

    putUser(e, id, selectedUser, token) {
        
      e.preventDefault();

      let credentials = {
        name: selectedUser.name,
        firstLastName: selectedUser.firstLastName,
        secondLastName: selectedUser.secondLastName,
        job: selectedUser.job,
        startDate: selectedUser.startDate,
        endDate: selectedUser.endDate,
      }


      return fetch("https://hidden-sands-57810.herokuapp.com/employee/?_id="+selectedUser._id, {
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
                let err = response
                throw err;
              }
        })                 
    }

    postEmployee(employee, token) {
        
      let credentials = {
        CIF: employee.CIF,
        DNI: employee.DNI,
        name: employee.name,
        firstLastName: employee.firstLastName,
        secondLastName: employee.secondLastName,
        job: employee.job,
        startDate: employee.startDate,
        endDate: employee.endDate,
      }


      return fetch("https://hidden-sands-57810.herokuapp.com/employee", {
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
                let err = response;
                throw err;
              }
        })                 
    }

    deleteEmployee(e, id, token) {
        
      e.preventDefault();
      
      return fetch("https://hidden-sands-57810.herokuapp.com/employee?_id="+id, {
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
    postPciture(id, file, token) {
        
      
      let credentials = {
        _id: id,
        filename: file,
      }


      return fetch("https://hidden-sands-57810.herokuapp.com/employee/upload/", {
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
                let err = new Error()
                err.info = response.error.error.codeName;
                throw err;
              }
        })                 
    }

    getCurrentUser(e) {
      e.preventDefault();
        return localStorage.getItem('user');
    }
}

export default new EmployeeService();