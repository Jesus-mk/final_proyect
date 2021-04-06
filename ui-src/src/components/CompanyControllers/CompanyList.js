import '../Css/CompanyController/CompanyList.css';
import { useContext } from "react";
import { GlobalContext } from "../../App";


function UsersList({ companyData, disable, setDisable, selectedCompany, setSelectedCompany,
     disableNextPage, setDisableNextPage, page, setDisablePrevPage}) {
    
        const { userData, setUserData } = useContext(GlobalContext);
    if (!companyData) return null
    
    //Get 11 users, show 10, if there are not 11 users, manage buttons.
    //Next time just send the total user number from the backend. 
    if (companyData.length < 11) setDisableNextPage(true);
    if (companyData.length == 11) setDisableNextPage(false);
    if (page == 0) setDisablePrevPage(true) 
    companyData = companyData.slice(0,10); 
    function createIdTd(userRole, id) {
        if (userRole === "METADATA") {
            return <td>{id}</td>
        }
    }
    
    return (
        <>
            {
            companyData.map(({ _id, companyName, activity, city, CIF, expired }, index) => {
                let icon;
                companyData[index].expired === true ? icon = "X-icon" :
                                                    icon = "V-icon";
                return (
                    <tr key={_id} className="CompanyListComponent" 
                        onClick={() => { 
                            setDisable(false) 
                            
                            setSelectedCompany(companyData[index])
                            var element = document.getElementById("userDivCard");
                            element.classList.remove("hidden");
                        }}
                    > 
                        <td><b>{index + 1 + page*10}</b></td>
                        
                        {createIdTd(userData.user.role, _id)}
                        <td>{companyName}</td>
                        <td>{activity}</td>
                        <td>{city}</td>
                        <td>{CIF}</td>
                        <td className="flex-colum"><div icon={icon}></div>{expired}</td>
                    </tr>
                )
            })}
        </>


    );
}

export default UsersList;