const { getMaxListeners } = require("./server/routes");

db.users.insert({
    username: "paco",
    email: "paco@gmail.com",
    password: "123",
    role: "METADATA",
    CIF: 000000,
})
db.companies.insert({
    CIF: 1234567890,
    companyName: "Yandy Mascotas",
    adress: "Avenida Moliere Nº 10",
    postalCode: "29004",
    country: "España",
    region: "Andalucia",
    city: "Malaga",
    activity: "Venta de productos"
})

if (userRole == "METADATA") {
    const user = new User({
        username: body.username,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role,
        CIF: body.CIF,
    });
    // Falta incluir que solo se crea si el body.role == ADMIN
    const company = new Company({
        CIF: body.CIF,
        companyName: body.companyName,
        adress: body.adress,
        postalCode: body.postalCode,
        region: body.region,
        city: body.city,
        activity: body.activity,
        parentCompany_CIF: body.parentCompany_CIF,
    });

    user.save((error, userDB) => {
        if (error !== null) {
            response.badRequest(error, "message", 400, res);
        } else {
            company.save((error, companyDB) => {
                if (error !== null) {
                    response.badRequest(error, "message", 400, res);
                } else {
                    tools.sendMail(req);
                    res.json({
                        user: userDB,
                        company: companyDB,
                    })
                }
            });
        }
    });


} else if (userRole == "ADMIN") {
    const user = new User({
        username: body.username,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: "USER",
        CIF: userCIF,
    });

    user.save((error, userDB) => {
        if (error !== null) {
            response.badRequest(error, "message", 400, res);
        } else {
            tools.sendMail(req);
            res.json({
                user: userDB
            })
        }
    });
}




import '../App.css';
import {useState} from 'react';
import jwt_decode from "jwt-decode"; 



function Login() {
    [username, setUsername] = useState("");
    [password, setPassword] = useState("");

    

    let username;
    let password;
    function usernamef(e){
        username = e.target.value;
        
    }
    function passwordf(e){
        password = e.target.value;
        
    }

    function handlelogin(e){
        e.preventDefault();
        let credentials = {
            email,
            password
        }
        
        const config = {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({credentials})
          };
          const request = new Request('http://localhost:3000/login', config);
          fetch(request)
          .then( response => response.json()
          .then(
              response => {
                console.log('Respuesta ok: ', response);
                localStorage.setItem('mitoken', response.token );
        
                const decoded = jwt_decode(response.token);
                console.log(decoded);
        
                var decodedHeader = jwt_decode(response.token, { header: true });
                console.log(decodedHeader);
              }
            )
          .catch(
            error => console.log('Erorr: ', error)
          ));

    }

    return (
        <>
            <input type="text" name="usuario" placeholder="usuario" onchange= {(e)=> username(e)}/>

            <input type= "password" name="contrseña" onchange= {(e)=> password(e)}/>
            <button onClick={() => handlelogin(e)}>Login</button>
        </>
    );
}

export default Login;