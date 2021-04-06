import '../Css/EmployeeController/EmployeeList.css';
 

function usersList({ usersData, disable, setDisable, selectedUser, setSelectedUser,
     disableNextPage, setDisableNextPage, page, setDisablePrevPage}) {
   
    if (!usersData) return null
    
    //Get 11 users, show 10, if there are not 11 users, manage buttons.
    //Next time just send the total user number from the backend. 
    if (usersData.length < 11) setDisableNextPage(true);
    if (usersData.length == 11) setDisableNextPage(false);
    if (page == 0) setDisablePrevPage(true) 
    usersData = usersData.slice(0,10);
    
    return (
        <>
            {
            usersData.map(({ DNI, name, firstLastName, job, expired }, index) => {
                let icon;
                usersData[index].expired === true ? icon = "X-icon" :
                                                    icon = "V-icon";
                return (
                    <tr key={DNI} className="EmployeeListComponent" 
                        onClick={() => { 
                            setDisable(false) 
                            setSelectedUser(usersData[index])
                            var element = document.getElementById("employeeDivCard");
                            element.classList.remove("hidden");
                        }}
                    > 
                        <td><b>{index + 1 + page*10}</b></td>
                        <td>{DNI}</td>
                        <td>{name}</td>
                        <td>{firstLastName}</td>
                        <td>{job}</td>
                        <td className="icon flex-colum"><div icon={icon}></div>{expired}</td>
                    </tr>
                )
            })}
        </>


    );
}

export default usersList;