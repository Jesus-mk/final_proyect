import '../Css/UserController/UserController.css';
import React from 'react'
import { useContext } from "react";
import { GlobalContext } from "../../App.js";

import { useGetUsers } from "../../services/users.effect.js"
import { useState } from "react";
import _, { debounce } from 'lodash';

import { useRouteMatch } from "react-router-dom";
import SelectedProfile from "./SelectedProfile"
import List from "./List";
import NewUser from "./NewUser";



function UsersController() {

    const { userData, setUserData } = useContext(GlobalContext);
    const [disable, setDisable] = useState(true);
    const [disablePrevPage, setDisablePrevPage] = useState(true);
    const [disableNextPage, setDisableNextPage] = useState(true);
    const [count, setCount] = useState(0); // This is just here to force GETS
    const [page, setPage] = useState(0);
    const [selectedUser, setSelectedUser] = useState();
    const [userSearch, setUserSearch] = useState({
        username: "",
        email: "",
        CIF: "",
        role: "",
        token: userData.token,
    });

    let userList = useGetUsers(userSearch.username, userSearch.email, userSearch.CIF, userSearch.role, userSearch.token, page, count)

    const handleNameWithDebounce = _.debounce(async (e) => {
        setUserSearch({ ...userSearch, username: e.target.value })
    }, 1000);

    const handleCIFWithDebounce = _.debounce(async (e) => {
        setUserSearch({ ...userSearch, CIF: e.target.value })
    }, 1000);

    const handleRoleWithDebounce = _.debounce(async (e) => {
        setUserSearch({ ...userSearch, role: e.target.value })
    }, 1000);

    const handleEmailWithDebounce = _.debounce(async (e) => {
        setUserSearch({ ...userSearch, email: e.target.value })
    }, 1000);

    function handleBackwards(e) {if (page > 0) setPage(page - 1)}

    function handleFoward(e) {
        setPage(page + 1)
        setDisablePrevPage(false)
    }

    function handlePage(e) {
        setPage(e.target.value)
    }
    function CIFThead(userRole) {
        if (userRole !== "METADATA") {
            return null
        } else {
            return (<th>CIF</th>)
        }
    }
    function CIFSearch(userRole) {
        if (userRole !== "METADATA") {
            return null
        } else {
            return (<td><input
                className=""
                id="fCIF"
                name="searchCIF"
                type="text"
                placeholder="CIF"
                onChange={handleCIFWithDebounce}>
            </input>
        </td>)
        }
    }
    
    function rolSelector(userRol) {
        if (userRol === "METADATA") {
          return (<select 
            className="test" 
            name="role" 
            id="fRole" 
            placeholder="Rol" 
            onChange={handleRoleWithDebounce}>
            <option value="">-</option>
            <option value="METADATA">Metadata</option>
            <option value="ADMIN">Admin</option>
            <option value="USER">User</option>
        </select>)
        } else {
          return (<select 
            className="test" 
            name="role" 
            id="fRole" 
            placeholder="Rol" 
            onChange={handleRoleWithDebounce}>
            <option value="">-</option>
            <option value="ADMIN">Admin</option>
            <option value="USER">User</option>
        </select>)
        }
      }

    return (
        <div className="UsersControllers grid-container">
            <NewUser count={count} setCount={setCount}/>   
            <div className="TableDiv flex-colum">
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Rol</th>
                            {CIFThead(userData.user.role)} 

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
                            </input></td>
                            <td><input
                                className="SearchInputs"
                                id="fEmail"
                                name="email"
                                type="text"
                                placeholder="Email"
                                onChange={handleEmailWithDebounce}>
                            </input></td>
                            <td>
                                <div className="caja">
                                    {rolSelector(userData.user.role)}
                                </div>
                            </td>
                            {CIFSearch(userData.user.role)}
                        </tr>

                        <List
                            usersData={userList}
                            disable={disable}
                            setDisable={setDisable}
                            selectedUser={selectedUser}
                            setSelectedUser={setSelectedUser}
                            disableNextPage={disableNextPage}
                            setDisableNextPage={setDisableNextPage}
                            page={page}
                            setDisablePrevPage={setDisablePrevPage}
                            userInfo={userData}
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

            <div 
                className="userDivCard hidden" 
                id="userDivCard" 
                test={true} 
                disabled={disable}>

                    <SelectedProfile
                        selectedUser={selectedUser}
                        setSelectedUser={setSelectedUser}
                        disable={disable}
                        closeCard={setDisable}
                        count={count}
                        setCount={setCount}>
                    </SelectedProfile>
            </div>
        </div>
    )
}

export default UsersController;