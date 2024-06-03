import InputAdornment from "@mui/material/InputAdornment"
import useStyles from "../../../../Style"
import { TextField } from "@mui/material"
import { AiOutlineSearch } from "react-icons/ai"
import React,{useContext} from "react"
import RolePermissionArray from "./RolePermissionArray";
import Createcontext from '../../../../Hooks/Context/Context'
const RolePermission = ({rolepermision , setrolepermision ,setdescchceck ,descchceck}) => {
 
    const { state, dispatch } = useContext(Createcontext)
    function checkedfunction(name , type='none'){
        setdescchceck(!descchceck)
        
       if(type === "All"){
        if((rolepermision[`View${name}`] && rolepermision[`Add${name}`]) && (rolepermision[`Delete${name}`] && rolepermision[`Edit${name}`])){
            setrolepermision({ ...rolepermision , [`View${name}`] : false , [`Delete${name}`] : false ,  [`Edit${name}`] : false, [`Add${name}`] :false })
        }else{
            setrolepermision({ ...rolepermision , [`View${name}`] : true , [`Delete${name}`] : true ,  [`Edit${name}`] : true, [`Add${name}`] : true })
        }
          
       }else{
           setrolepermision({ ...rolepermision , [name] : !rolepermision[name] })
       }
    }


    console.log(rolepermision ,'rolepermision')
    return (
        <div className="col-12 rolePermission_container">
            <form>
                <div className="col-12 rolePermisionHeaderContainer">
                    <div className=" col-7">
                        <h2 className="roleDetailsSechaedings">Permissions</h2>
                        <p className="roleDetailsSechaedings">People with this role can perform the following actions.</p>
                    </div>
                   

                </div>
                <div className="col-12 rolePermissionLists_container">
                    <div className="rolePermissionOrderList">
                       {
                        RolePermissionArray.map((item)=>{
                           
                            return  <div className="rolePermissionItems">
                                { !(  Object.values(state.Roles).includes(false) && item.RoleName ==="Roles" ) &&   <>  <div className="roleTitle">{item.RoleName === "SalesAndAnalytics" ? 'Sales & Analytics' : item.RoleName }</div>
                                                <div className="permissionChecked">
                                                        <div className="roleinputbox">
                                                            <input type="checkbox"  id={`all${item.id}`} checked={(rolepermision[`View${item.RoleName.replaceAll(' ' , '')}`] && rolepermision[`Add${item.RoleName.replaceAll(' ' , '')}`]) && (rolepermision[`Delete${item.RoleName.replaceAll(' ' , '')}`] && rolepermision[`Edit${item.RoleName.replaceAll(' ' , '')}`])}   onClick={(e)=>checkedfunction(e.target.name , 'All')} name={`${item.RoleName.replaceAll(' ' , '').replaceAll(' ','')}`} />
                                                            <label htmlFor={`all${item.id}`}>All</label>
                                                        </div>
                                                        <div className="roleinputbox">
                                                            <input type="checkbox" id={`view${item.id}`}  checked={rolepermision[`View${item.RoleName.replaceAll(' ' , '')}`]} name={`View${item.RoleName.replaceAll(' ' , '')}`} value={rolepermision[`View${item.RoleName.replaceAll(' ' , '')}`]} onChange={(e)=>checkedfunction(e.target.name)} />
                                                            <label htmlFor={`view${item.id}`}>View</label>
                                                        </div>
                                                        <div className="roleinputbox">
                                                            <input type="checkbox" id={`Add${item.id}`}   checked={rolepermision[`Add${item.RoleName.replaceAll(' ' , '')}`]} name={`Add${item.RoleName.replaceAll(' ' , '')}`} value={rolepermision[`Add${item.RoleName.replaceAll(' ' , '')}`]} onChange={(e)=>checkedfunction(e.target.name)} />
                                                            <label htmlFor={`Add${item.id}`}>Add</label>
                                                        </div>
                                                        <div className="roleinputbox">
                                                            <input type="checkbox" id={`edit${item.id}`}   checked={rolepermision[`Edit${item.RoleName.replaceAll(' ' , '')}`]} name={`Edit${item.RoleName.replaceAll(' ' , '')}`} value={rolepermision[`Edit${item.RoleName.replaceAll(' ' , '')}`]} onChange={(e)=>checkedfunction(e.target.name)}/>
                                                            <label htmlFor={`edit${item.id}`}>Edit</label>
                                                        </div>
                                                        <div className="roleinputbox" >
                                                            <input type="checkbox" id={`delete${item.id}`}  checked={rolepermision[`Delete${item.RoleName.replaceAll(' ' , '')}`]} name={`Delete${item.RoleName.replaceAll(' ' , '')}`} value={rolepermision[`Delete${item.RoleName.replaceAll(' ' , '')}`]} onChange={(e)=>checkedfunction(e.target.name)} />
                                                            <label htmlFor={`delete${item.id}`}>Delete</label>
                                                        </div>
                                                </div>
                                                </>
                                             
                                }
                              </div>
                        })
                       }
                    </div>

                </div>
            </form>
        </div>
    )
}
export default RolePermission