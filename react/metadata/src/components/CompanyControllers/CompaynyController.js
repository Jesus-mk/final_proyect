import '../Css/CompanyController/CompanyController.css';
import React from 'react'
import { useContext } from "react";
import { GlobalContext } from "../../App.js";
import UsersService from "../../services/users.service.js"
import { useGetCompanies } from "../../services/company.effect.js"
import { useState, useEffect, onChange } from "react";
import _, { debounce } from 'lodash';

import { BrowserRouter, NavLink, Route, useRouteMatch, Link, useParams } from "react-router-dom";
import SelectedProfile from "./SelectedCompany"
import CompanyList from "./CompanyList";
import NewUser from "./NewCompany";

 

function UsersController() {

    const { userData, setUserData } = useContext(GlobalContext);
    const [disable, setDisable] = useState(true);
    const [disablePrevPage, setDisablePrevPage] = useState(true);
    const [disableNextPage, setDisableNextPage] = useState(false);
    const [count, setCount] = useState(0); // This is just here to force GETS
    const [page, setPage] = useState(0);
    let match = useRouteMatch();


    let defaultSelected = {
        id: "",
        username: "",
        email: "",
        role: "",
        CIF: "",
    }

    const [selectedCompany, setSelectedCompany] = useState(defaultSelected);
    const [companySearch, setCompanySearch] = useState({
        companyName: "",
        CIF: "",
        activity: "",
        city: "",
        expired: "",
        token: userData.token,
    });

    

    let companyList = useGetCompanies(companySearch.companyName,
                                     companySearch.CIF, 
                                     companySearch.activity, 
                                     companySearch.city, 
                                     companySearch.expired,
                                     companySearch.token, 
                                     page, 
                                     count);

    const handleNameWithDebounce = _.debounce(async (e) => {
        setCompanySearch({ ...companySearch, companyName: e.target.value })
    }, 1000);

    const handleCIFWithDebounce = _.debounce(async (e) => {
        setCompanySearch({ ...companySearch, CIF: e.target.value })
    }, 1000);

    const handleCityWithDebounce = _.debounce(async (e) => {
        setCompanySearch({ ...companySearch, city: e.target.value })
    }, 1000);

    const handleActivityWithDebounce = _.debounce(async (e) => {
        setCompanySearch({ ...companySearch, activity: e.target.value })
    }, 1000);

    const handleexpiredWithDebounce = _.debounce(async (e) => {
        setCompanySearch({ ...companySearch, expired: e.target.value })
    }, 1000);

    function handleBackwards(e) {
        if (page > 0) setPage(page - 1)

    }

    function handleFoward(e) {
        setPage(page + 1)
        setDisablePrevPage(false)
        
    }

    function handlePage(e) {
        let newPage = e.target.value
        setPage(newPage)
    }

    


    return (
        <div className="CompanyController grid-container">
            <NewUser count={count} setCount={setCount}/>
            <div className="TableDiv flex-colum">
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Actividad</th>
                            <th>Ciudad</th>
                            <th>CIF</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="SearchInputs">
                            <td></td>
                            <td></td>
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
                                id="fEmail"
                                name="email"
                                type="text"
                                placeholder="Actividad"
                                onChange={handleActivityWithDebounce}>
                            </input></td>
                            <td><input
                                className=""
                                id="fCIF"
                                name="searchCIF"
                                type="text"
                                placeholder="Ciudad"
                                onChange={handleCityWithDebounce}>
                            </input> </td>
                            <td><input
                                className=""
                                id="fCIF"
                                name="searchCIF"
                                type="text"
                                placeholder="CIF"
                                onChange={handleCIFWithDebounce}>
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
                                        <option value="true">Incorrecto</option>
                                        <option value="false">Correcto</option> 
                                    </select>
                                </div>
                            </td>
                        </tr>

                        <CompanyList
                            companyData={companyList}
                            disable={disable}
                            setDisable={setDisable}
                            selectedCompany={selectedCompany}
                            setSelectedCompany={setSelectedCompany}
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

            <div className="userDivCard hidden" id="userDivCard" test={true} disabled={disable}>

                <SelectedProfile
                    selectedCompany={selectedCompany}
                    setSelectedCompany={setSelectedCompany}
                    disable={disable}
                    closeCard={setDisable}
                    count={count}
                    setCount={setCount}
                >
                </SelectedProfile>
            </div>
        </div>
    )
}

export default UsersController;