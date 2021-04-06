

const API_URL = "https://hidden-sands-57810.herokuapp.com/login";


class CompanyService {
  
  getCompany(CIF, token) {
    
    return fetch(`https://hidden-sands-57810.herokuapp.com/companies?from=0&limit=10&CIF=${CIF}`, {
      method: "GET",
      Cors: "CORS",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.ok) {
                      
          return response.data[0]
        } 
      }).catch((error) => {
      })                 
  }

  getCompanies(companyName, CIF, activity, city, expired, token, page) {
    page = page * 10;
    return fetch(`https://hidden-sands-57810.herokuapp.com/companies?from=${page}&limit=11&companyName=${companyName}&CIF=${CIF}&activity=${activity}&city=${city}&expired=${expired}`, {
      method: "GET",
      Cors: "CORS",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.ok) {
                      
          return response.data
        } 
      }).catch((error) => {
      }) 
  }

  getSubCompanies(parentCompany_CIF, companyName, CIF, activity, city, expired, token, page) {
    page = page * 10;
    return fetch(`https://hidden-sands-57810.herokuapp.com/companies/sub?from=${page}&limit=11&parentCompany_CIF=${parentCompany_CIF}&companyName=${companyName}&activity=${activity}&CIF=${CIF}&city=${city}&expired=${expired}`, {
      method: "GET",
      Cors: "CORS",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.ok) {
                      
          return response.data
        } 
      }).catch((error) => {
      }) 
  }

  postCompany(e, companyName, CIF, activity, region, city, postalCode, adress, parentCompany_CIF, token) {    
    e.preventDefault();
    
    let credentials = {
      companyName: companyName,
      CIF: CIF,
      activity: activity,
      region: region,
      postalCode: postalCode,
      city: city,
      adress: adress,
      parentCompany_CIF: parentCompany_CIF,
    }
    return fetch("https://hidden-sands-57810.herokuapp.com/companies", {
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

  putCompany(e, id, companyName, activity, region, city, postalCode, adress, token) {    
    e.preventDefault();
    
    let credentials = {
      companyName: companyName,
      activity: activity,
      region: region,
      city: city,
      postalCode: postalCode,
      adress: adress,
    }
    
    return fetch("https://hidden-sands-57810.herokuapp.com/companies/?_id="+id, {
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
          localStorage.setItem('company', JSON.stringify(response.data))  
          return response
        } else {
              let err = response
              
              throw err;
            }
      })                
  }

  putSubCompany(e, CIF, parentCompany_CIF, token, ) {
    e.preventDefault();
    let credentials = {
      parentCompany_CIF: parentCompany_CIF
    }
    return fetch(`https://hidden-sands-57810.herokuapp.com/companies/sub?CIF=${CIF}`, {
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
                      
          return response.data
        } else {
          let err = response
          
          throw err;
        }
      }).catch((error) => {
        throw error
      }) 
  }

  deleteCompany(e, id, token) {
    
    e.preventDefault();

    return fetch("https://hidden-sands-57810.herokuapp.com/companies/All?_id="+id, {
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

  deleteSubCompany(e, id, parentCompany_CIF, token) {
    
    e.preventDefault();
    let credentials = {
      parentCompany_CIF: parentCompany_CIF
    }
    return fetch("https://hidden-sands-57810.herokuapp.com/companies/removeSub/?_id="+id, {
      method: "DELETE",
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
              
              throw err;
            }
      })                 
  }
}

export default new CompanyService();