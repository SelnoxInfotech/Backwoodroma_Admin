import React from 'react'
import { BrowserRouter, Route, Routes    } from "react-router-dom";
import Navbar from '../Components/Navbar/Navbar';
import Home from '../Pages/Home/Home';
import Loginlogout from '../Pages/Login/Login_logout';
import Forgot from '../Pages/Login/Forgot';
import Protected from"./Protected";
import Category from '../Pages/Category/Category';
import SubCategory from "../Pages/SubCategory/SubCategory";
import Countries from "../Pages/Countries/Countries";
import State from "../Pages/States/State";
import City  from "../Pages/City/City"
import Tax from "../Pages/Tax/Tax"
import Store from '../Pages/Store/Store';
import Brand from '../Pages/Brand/Brand';
import News from '../Pages/News/News';
import NewsCategory from "../Pages/News/NewsCategory/NewsCategory";
import NewsSubCategory from "../Pages/News/NewsSubCategory/NewsSubCategory";
import Vendor from "../Pages/Vendor/Vendor";
import Pagenotfound from "../Pages/Pagenotfound";
import Review from '../Pages/Review/Review';
import Signup from '../Pages/Signup/Signup';
import Settings from '../Pages/Settings/Settings';
import Addusers from '../Pages/Staff/Addstaff'
import UserEditProfile from '../Pages/UserProfile/UserEditProfile';
import PromotionalBanner from '../Pages/PromotionalBanner/PromotionalBanner';
import PromotionalBannerList from '../Pages/PromotionalBanner/PromotionalBannerList';
import Aboutus from '../Pages/Aboutus/Aboutus';
import Dummy from "../Pages/dummy"
import Layout from '../Layout/Layout';
import Rolelist from '../Pages/Role/Rolelist';
import RoleDetailsAndPermission from '../Pages/Role/RoleDetailsAndPermission/RoleDetailsAndPermission';
import Allstall from '../Pages/Staff/Allstall';
import Vendorlist from '../Pages/Vendor/Vendorlist';
import Topproducts from '../Pages/Tablespages/Topproducts';
import Allrecentorder from '../Pages/Tablespages/Allrecentorder'
import Topstore from '../Pages/Tablespages/Topstore';
import AllReview from '../Pages/Tablespages/AllReview';
import WebContent from '../Pages/WebContent/WebContent'
import UserProfile from '../Pages/UserProfile/UserProfile';
import TotalSales from '../Pages/Tablespages/TotalSales';
import TopLocation from '../Pages/Tablespages/TopLocation';
import Newspop from '../Pages/News/NewsPopup';
import Updaterolesandpermission from '../Pages/Role/RoleDetailsAndPermission/Updaterolesandpermission';
import Storepopup from '../Pages/Store/Storepopup';
// export default function Router() {;
//   return (
    

//       <BrowserRouter basename ="/" >
//         <Navbar></Navbar>
//         <Routes  >
//          <Route  path="/Login" element={<Protected Component={Loginlogout } />}/>
//          <Route  exact path="/" element={<Protected Component={Home } />} /> 
//          <Route  path="/category" element={<Protected Component={Category } />} /> 
//          <Route  path="/subCategory" element={<Protected Component={SubCategory } />} /> 
//          <Route  path="/Countries" element={<Protected Component={Countries} />} /> 
//          <Route  path="/States" element={<Protected Component={State} />} /> 
//          <Route  path="/City" element={<Protected Component={City} />} /> 
//          <Route  path="/Tax" element={<Protected Component={Tax} />} /> 
//          <Route  path="/aboutus" element={<Protected Component={Aboutus} />} /> 
//          <Route  path="/Store" element={<Protected Component={Store} />} />   
//          <Route  path="/Brand" element={<Protected Component={Brand} />} />   
//          <Route  path="/News" element ={<Protected Component ={News}/>}/>
//          <Route  path='/Review' element={<Protected Component ={Review}/>}/>
//          <Route  path='/Signup' element={<Protected Component={Signup}/>} />
//          <Route  path="/NewsCategory" element ={<Protected Component ={NewsCategory}/>}/>
//          <Route  path="/NewsSubCategory" element ={<Protected Component ={NewsSubCategory}/>}/>
//          <Route  path="/Vendor" element ={<Protected Component ={Vendor}/>}/>



//         <Route path='/Settings' element={<Protected Component={Settings}/>}/>
//         {/* <Route path='/Forgot' element={<Forgot />}/> */}
//         <Route path='/RoleAndPermission' element={<Protected Component={RoleAndPermission}/>}/>
//         <Route path='/ManageRole' element={<Protected Component={ManageRole}/>}/>
//         <Route path='/RoleDetailsAndPermission' element={<Protected Component={RoleDetailsAndPermission}/>}/>
//         <Route path='/UserEditProfile' element={<Protected Component={UserEditProfile}/>}/>
//         {/* <Route path='/PromotionalBanner' element={<Protected Component={PromotionalBanner}/>}/> */}
//         <Route path='/PromotionalBanner' element={<PromotionalBanner/>}/>
//         {/* <Route path='/PromotionalBannerList' element={<Protected Component={PromotionalBannerList}/>}/> */}
//         <Route path='/PromotionalBannerList' element={<PromotionalBannerList/>} />
//         {/* <Route path='/dummy' element={<Dummy/>} /> */}
//         {/* <Route   path='*' element={ <Pagenotfound></Pagenotfound>} /> */}
       
//         </Routes>
//       </BrowserRouter>
      
  
//   )
// }

const routesConfig = [
  // {
  //   path:"/dummy",
  //   element:<Dummy/>
  // },
  {
    path:"*",
    element:<Pagenotfound/>
  },
  // {
  //   path:"/webcontent",
  //   element:<WebContent/>
  // },
  {
    path:"/Forgot",
    element:<Forgot/>
  },
  {
    path: "/Login",
 
    element: <Loginlogout/>,
  },
  {
    element: <Layout />,
    children: [
    
      {
        path: "/",
        element:  <Protected  Component={Home}/> ,
      },
      {
        path: "/category",
        element: <Protected  Component={Category} />,
      },
      {
        path: "/subCategory",
        element: <Protected  Component={SubCategory} />,
      },
      {
        path:"/Countries",
        element:<Protected  Component={Countries}/>
      },
      {
        path:"/States",
        element:<Protected  Component={State}/>
      },
      {
        path:"/City",
        element:<Protected  Component={City}/>
      },
      {
        path:"/Tax",
        element:<Protected  Component={Tax}/>
      },
      {
        path:"/aboutus",
        element:<Protected  Component={Aboutus}/>
      },
      {
        path:"/Store",
        element:<Protected  Component={Store}/>
      },
      {
        path:"/Brand",
        element:<Protected  Component={Brand}/>
      },
      {
        path:"/News",
        element:<Protected  Component={News}/>
      },
      {
        path:"/Review",
        element:<Protected  Component={Review}/>
      },
      {
        path:"/Signup",
        element:<Protected  Component={Signup}/>
      },  {
        path:"/NewsCategory",
        element:<Protected  Component={NewsCategory} />
      },
      {
        path:"/NewsSubCategory",
        element:<Protected  Component={NewsSubCategory}/>
      },
      {
        path:"/Vendor",
        element:<Protected  Component={Vendor}/>
      },
      {
        path:"/Vendorlist",
        element:<Protected  Component={Vendorlist}/>
      },
      {
        path:"/Settings",
        element:<Protected  Component={Settings}/>
      },
     
      {
        path:"/Roles",
        element:<Protected  Component={Rolelist}/>
      },
      {
        path:"/addrole",
        element:<Protected  Component={ RoleDetailsAndPermission}/>
      },
      {
        path:"/addstaff",
        element:<Protected  Component={Addusers}/>
      },
      {
        path:"/topproduct",
        element:<Protected  Component={Topproducts}/>
      },
      {
        path:"/allstaff",
        element:<Protected  Component={Allstall}/>
      },
      {
        path:"/UserEditProfile",
        element:<Protected  Component={UserEditProfile}/>
      },
      {
        path:"/PromotionalBanner",
        element:<Protected  Component={PromotionalBanner}/>
      },
      {
        path:"/PromotionalBannerList",
        element:<Protected  Component={PromotionalBannerList}/>
      },
      {
        path:"/recentorderslist",
        element:<Protected  Component={Allrecentorder}/>
      },
      {
        path:"/topstorelist",
        element:<Protected  Component={Topstore}/>
      },
      {
        path:"/allreview",
        element:<Protected  Component={AllReview}/>
      },
      {
        path:"/webcontent",
        element:<Protected  Component={WebContent}/>
      },
      {
        path:"/userprofile/:id",
        element:<Protected  Component={UserProfile}/>
      },
      {
        path:"/totalsales",
        element:<Protected  Component={TotalSales}/>
      },
      {
        path:"/populerlocation",
        element:<Protected  Component={TopLocation}/>
      },
      {
        path:"/addnews",
        element:<Protected  Component={Newspop}/>
      },
      {
        path:"/addstore",
        element:<Protected  Component={Storepopup}/>
      },
      {
        path:"/updateroles",
        element:<Protected  Component={Updaterolesandpermission}/>
      },
    ],
  },
]

export default routesConfig