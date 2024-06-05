import React,{useEffect, useState} from "react";
import RoleDetails from "./RoleDetailAndPermissionComponent/RoleDetails"
import RolePermission from "./RoleDetailAndPermissionComponent/RolePermission"
import './RoleAndPermission.css'
import { FaAnglesLeft } from "react-icons/fa6";
import { useForm ,FormProvider} from "react-hook-form"
import Cookies from 'universal-cookie';
import Axios from 'axios';
import {useNavigate , useLocation} from 'react-router-dom'
import Successfullypopup from '../../../Components/Component/Successfullypopup'
import Unsuccesspopup from '../../../Components/Component/Successfullypopup'

const Updaterolesandpermission=()=>{
    const navigate=useNavigate()
    const location = useLocation()
    const cookies = new Cookies();
    const [sucsesopen , setsucsesopen] = useState(false)
    const [unsucsesopen , setunsucsesopen] = useState(false)
    const token_data = cookies.get('Token_access')
    const [loading , setloading] = useState(false)
    const [descchceck , setdescchceck] = useState(false)
    const [rolepermision,setrolepermision]= useState({
        "RoleTitle": "",
        "Description": '',
        "AddStore": false,
        "ViewStore": false,
        "EditStore": false,
        "DeleteStore": false,
        "AddVendor": false,
        "ViewVendor": false,
        "DeleteVendor": false,
        "EditVendor": false,
        "AddBrand": false,
        "ViewBrand": false,
        "EditBrand": false,
        "DeleteBrand": false,
        "AddUsers": false,
        "ViewUsers": false,
        "EditUsers": false,
        "DeleteUsers": false,
        "AddWebContent": false,
        "ViewWebContent": false,
        "EditWebContent": false,
        "DeleteWebContent": false,
        "AddBanners": false,
        "ViewBanners": false,
        "EditBanners": false,
        "DeleteBanners": false,
        "AddCategory": false,
        "ViewCategory": false,
        "EditCategory": false,
        "DeleteCategory": false,
        "AddSubcategory": false,
        "ViewSubcategory": false,
        "EditSubcategory": false,
        "DeleteSubcategory": false,
        "AddBlogs": false,
        "ViewBlogs": false,
        "EditBlogs": false,
        "DeleteBlogs": false,
        "AddComments": false,
        "ViewComments": false,
        "EditComments": false,
        "DeleteComments": false,
        "AddReview": false,
        "ViewReview": false,
        "EditReview": false,
        "DeleteReview": false,
        "AddBlogsCategory": false,
        "ViewBlogsCategory": false,
        "EditBlogsCategory": false,
        "DeleteBlogsCategory": false,
        "AddBlogsSubcategory": false,
        "ViewBlogsSubcategory": false,
        "EditBlogsSubcategory": false,
        "DeleteBlogsSubcategory": false,
        "AddSalesAndAnalytics": false,
        "ViewSalesAndAnalytics": false,
        "EditSalesAndAnalytics": false,
        "DeleteSalesAndAnalytics": false,
        "AddStaff": false,
        "ViewStaff": false,
        "EditStaff": false,
        "DeleteStaff": false,
        "AddRoles": false,
        "ViewRoles": false,
        "EditRoles": false,
        "DeleteRoles": false,
        "AddSubscribe": false,
        "ViewSubscribe": false,
        "EditSubscribe": false,
        "DeleteSubscribe": false,
        "AddCustomer": false,
        "ViewCustomer": false,
        "EditCustomer": false,
        "DeleteCustomer": false,
    })
    const method = useForm()

    function Submitdata(data){
        setloading(true)
        Axios.post(`https://api.cannabaze.com/AdminPanel/Update-RolesAndPermission/${location?.state?.id}`, rolepermision ,{
            headers: {
                'Authorization': `Bearer ${token_data}`
            }
    
        }).then((res)=>{
           
            setsucsesopen(true)
       
        }).catch((error)=>{
            setunsucsesopen(true)
        })
         
    }

    useEffect(()=>{
    

        setrolepermision(location?.state)
       
    },[location])
   
    return(
            <div className="row">
                <div className="RoleDetailsAndPermission_container">
                    <div className=""><span className="backbtn" onClick={()=>{navigate(-1)}}><FaAnglesLeft/> Back </span> </div>
                    <FormProvider {...method}>
                        <form onSubmit={method.handleSubmit(Submitdata)}>
                            <RoleDetails setrolepermision={setrolepermision} rolepermision={rolepermision} descchceck={descchceck} />
                            <RolePermission setrolepermision={setrolepermision} rolepermision={rolepermision} setdescchceck={setdescchceck} descchceck={descchceck}/>
                            <div className="text-center py-5 gap-4">
                                <button className="topbutton" type="submit">    Update</button>
                                <button className="cancel_btn mx-3" type="button" onClick={()=>navigate(-1)}>Cancel</button>
                            </div>
                        </form>
                    </FormProvider>
                </div>
                { sucsesopen && <Successfullypopup  setsucsesopen={setsucsesopen} link={'/Roles'}/>}
                { unsucsesopen && <Unsuccesspopup setsucsesopen={setunsucsesopen} link={'/Roles'}/>}
            </div>
    )
}
export default Updaterolesandpermission