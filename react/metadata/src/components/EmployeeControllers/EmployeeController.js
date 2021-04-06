import '../Css/EmployeeController/EmployeeController.css';
import React from 'react'
import { useContext } from "react";
import { GlobalContext } from "../../App.js";
import UsersService from "../../services/users.service.js"
import { useGetEmployees } from "../../services/employee.effect.js"
import { useState, useEffect, onChange } from "react";
import _, { debounce } from 'lodash';

import { BrowserRouter, NavLink, Route, useRouteMatch, Link, useParams } from "react-router-dom";
import SelectedEmployee from "./SelectedEmployee"
import EmployeeList from "./EmployeeList";
import NewEmployee from "./NewEmployee";

 


function EmployeeController() {

    const { userData, setUserData } = useContext(GlobalContext);
    const [disable, setDisable] = useState(true);
    const [disablePrevPage, setDisablePrevPage] = useState(true);
    const [disableNextPage, setDisableNextPage] = useState(true);
    const [count, setCount] = useState(0); // This is just here to force GETS
    const [page, setPage] = useState(0);
    let match = useRouteMatch();

    let defaultSelected = {
        id: "",
        name: "",
        secondName: "",
        job: "",
        expired: "",
        CIF: "",
    }

    const [selectedUser, setSelectedUser] = useState(defaultSelected);
    const [employeeSearch, setEmployeeSearch] = useState({
        DNI: "",
        name: "",
        secondName: "",
        job: "",
        expired: "",
        CIF: "",
        token: userData.token,
    });

    let userList = useGetEmployees(employeeSearch.DNI,
                                 employeeSearch.name,
                                 employeeSearch.secondName,
                                 employeeSearch.job,
                                 employeeSearch.expired, 
                                 employeeSearch.CIF, 
                                 employeeSearch.token, 
                                 page, 
                                 count);
    
    const handleDNIWithDebounce = _.debounce(async (e) => {
    setEmployeeSearch({ ...employeeSearch, DNI: e.target.value })
    }, 1000);

    const handleNameWithDebounce = _.debounce(async (e) => {
        setEmployeeSearch({ ...employeeSearch, name: e.target.value })
    }, 1000);

    const handleexpiredWithDebounce = _.debounce(async (e) => {
        setEmployeeSearch({ ...employeeSearch, expired: e.target.value })
    }, 1000);

    const handlejobWithDebounce = _.debounce(async (e) => {
        setEmployeeSearch({ ...employeeSearch, job: e.target.value })
    }, 1000);

    const handlesecondNameWithDebounce = _.debounce(async (e) => {
        setEmployeeSearch({ ...employeeSearch, secondName: e.target.value })
    }, 1000);

    function handleBackwards(e) {
        if (page > 0) setPage(page - 1)
    }

    function handleFoward(e) {
        setPage(page + 1)
        setDisablePrevPage(false)
    }

   


    return (
        <div className="EmployeeController grid-container">
            <NewEmployee count={count} setCount={setCount}/>
            <div className="TableDiv flex-colum">
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>DNI</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Ocupación</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="SearchInputs">
                            <td></td>
                                <td>
                                <input
                                    className="SearchInputs"
                                    id="fdni"
                                    name="searchDNI"
                                    type="text"
                                    placeholder="DNI"
                                    onChange={handleDNIWithDebounce}>
                            </input>
                                </td>
                            <td><input
                                className="SearchInputs"
                                id="fname"
                                name="searchName"
                                type="text"
                                placeholder="Nombre"
                                onChange={handleNameWithDebounce}>
                            </input> </td>
                            <td><input
                                className="SearchInputs"
                                id="fsecondName"
                                name="secondName"
                                type="text"
                                placeholder="Apellido"
                                onChange={handlesecondNameWithDebounce}>
                            </input></td>

                            <td><input
                                className=""
                                id="fexpired"
                                name="searchexpired"
                                type="text"
                                placeholder="Ocupacion"
                                onChange={handlejobWithDebounce}>
                            </input></td>
                            
                            <td>
                                <div className="caja">
                                    <select 
                                        className="test" 
                                        name="job" 
                                        id="fjob" 
                                        placeholder="Rol" 
                                        onChange={handleexpiredWithDebounce}>
                                        <option value="">-</option>
                                        <option value="false">En regla</option>
                                        <option value="true">Expirado</option>
                                        
                                    </select>
                                </div>
                            </td>
                        </tr> 

                        <EmployeeList
                            usersData={userList}
                            disable={disable}
                            setDisable={setDisable}
                            selectedUser={selectedUser}
                            setSelectedUser={setSelectedUser}
                            disableNextPage={disableNextPage}
                            setDisableNextPage={setDisableNextPage}
                            page={page}
                            setDisablePrevPage={setDisablePrevPage}
                        />
                    </tbody>
                </table>
                <div className="pagination flex-row">
                    <div className="paginationDiv flex-row">
                        <button
                            className="backPage"
                            disabled={disablePrevPage}
                            onClick={(e) => handleBackwards(e)}
                        >Anterior
                        </button>

                        <p className="pageBox">
                            {page}
                        </p>

                        <button
                            className="nextPage"
                            disabled={disableNextPage}
                            onClick={(e) => handleFoward(e)}
                        >Siguiente
                        </button>
                    </div>
                </div>
            </div>

            <div className="employeeDivCard hidden" id="employeeDivCard" test={true} disabled={disable}>
                <SelectedEmployee
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                    disable={disable}
                    closeCard={setDisable}
                    count={count}
                    setCount={setCount}
                />                

            </div> 
            
        </div>
    )
}

export default EmployeeController;