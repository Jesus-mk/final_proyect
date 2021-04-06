import '../Css/UserController/List.css';
import { useContext } from "react";
import { GlobalContext } from "../../App.js";


function usersList({ usersData, disable, setDisable, selectedUser, setSelectedUser,
     disableNextPage, setDisableNextPage, page, setDisablePrevPage, userInfo}) {
    
    if (!usersData) return null
    
    //Get 11 users, show 10, if there are not 11 users, manage buttons.
    //Next time just send the total user number from the backend. 
    if (usersData.length < 11) setDisableNextPage(true);
    if (usersData.length == 11) setDisableNextPage(false);
    if (page == 0) setDisablePrevPage(true) 
    usersData = usersData.slice(0,10); 

    function CIFTr(userRole, CIF) {
        if (userRole !== "METADATA") {
            return null
        } else {
            return (<td>{CIF}</td>)
        }
    }
    
    return (
        <>
            {
            usersData.map(({ _id, username, email, role, CIF }, index) => {
                return (
                    <tr key={_id} className="ListComponent" 
                        onClick={() => { 
                            setDisable(false) 
                            setSelectedUser(usersData[index])
                            var element = document.getElementById("userDivCard");
                            element.classList.remove("hidden");
                        }}
                    > 
                        <td><b>{index + 1 + page*10}</b></td>
                        <td>{_id}</td>
                        <td>{username}</td>
                        <td>{email}</td>
                        <td>{role}</td>
                        {CIFTr(userInfo.user.role, CIF)}
                    </tr>
                )
            })}
        </>


    );
}

export default usersList;