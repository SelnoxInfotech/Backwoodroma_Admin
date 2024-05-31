import React, { useReducer,useEffect, createContext } from 'react';
import Reducer from '../Reducer/Reducer'
import Axios from 'axios'
import Cookies from 'universal-cookie';
const Createcontext = createContext();


const initialUser = {
  Roles:[],
  login: "",
  api:"",
  datesSelect:"Year",
  CustomeStartDate: "",
  CustomeEndDate:"",
  SearchbarData:function (i) {
    console.log("hello conetxt how are you " + i)
    return "rrrr"
  }
}
function Context(props) {
  const cookies = new Cookies();
  const token_data = cookies.get('Token_access')
  const [state, dispatch] = useReducer(Reducer, initialUser)
 
 useEffect(()=>{

  Axios.get(`https://api.cannabaze.com/AdminPanel/RolesAfterLogin/`,{
    headers: {
      'Authorization': `Bearer ${token_data}`
  }
  }).then((response)=>{
    let rolesdata
    if( Boolean(response?.data.length === 1)){
      rolesdata={
        "RoleTitle": "",
        "Description": '',
        "AddStore": true,
        "ViewStore": true,
        "EditStore": true,
        "DeleteStore": true,
        "AddVendor": true,
        "ViewVendor": true,
        "DeleteVendor": true,
        "EditVendor": true,
        "AddBrand": true,
        "ViewBrand": true,
        "EditBrand": true,
        "DeleteBrand": true,
        "AddUsers": true,
        "ViewUsers": true,
        "EditUsers": true,
        "DeleteUsers": true,
        "AddCustomers": true,
        "ViewCustomers": true,
        "EditCustomers": true,
        "DeleteCustomers": true,
        "AddBanners": true,
        "ViewBanners": true,
        "EditBanners": true,
        "DeleteBanners": true,
        "AddCategory": true,
        "ViewCategory": true,
        "EditCategory": true,
        "DeleteCategory": true,
        "AddSubcategory": true,
        "ViewSubcategory": true,
        "EditSubcategory": true,
        "DeleteSubcategory": true,
        "AddBlogs": true,
        "ViewBlogs": true,
        "EditBlogs": true,
        "DeleteBlogs": true,
        "AddComments": true,
        "ViewComments": true,
        "EditComments": true,
        "DeleteComments": true,
        "AddReports": true,
        "ViewReports": true,
        "EditReports": true,
        "DeleteReports": true,
        "AddInqueries": true,
        "ViewInqueries": true,
        "EditInqueries": true,
        "DeleteInqueries": true,
        "AddMessages": true,
        "ViewMessages": true,
        "EditMessages": true,
        "DeleteMessages": true,
        "AddSalesAndAnalytics": true,
        "ViewSalesAndAnalytics": true,
        "EditSalesAndAnalytics": true,
        "DeleteSalesAndAnalytics": true,
        "AddStaff": true,
        "ViewStaff": true,
        "EditStaff": true,
        "DeleteStaff": true,
        "AddRoles": true,
        "ViewRoles": true,
        "EditRoles": true,
        "DeleteRoles": true,
      }
    }
    else{
      rolesdata = response?.data[0]

    if(Boolean(response?.data?.length !== 0)){
      response?.data?.map((item,index)=>{
          for (const property in item) {
              rolesdata[property] = item[property] || rolesdata[property]
          }
            
      })
    }
    }
    dispatch({ type: 'Roles', Roles: rolesdata })
  })


 },[token_data])
 
  return (
    <Createcontext.Provider value={{ state, dispatch }} >
      {props.children}
    </Createcontext.Provider>

  )

}

export default Createcontext;
export { Context }

