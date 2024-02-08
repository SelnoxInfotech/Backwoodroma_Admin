import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { FaHouseUser } from "react-icons/fa";
import { MdLocalActivity, MdPreview, MdStorefront } from "react-icons/md";
import { AiTwotoneSetting, AiOutlineAppstore } from "react-icons/ai";
import { GrProductHunt } from "react-icons/gr";
import { FiPackage } from "react-icons/fi";
import { IoAnalytics } from "react-icons/io5";
import Icon from "@material-ui/core/Icon";
import Createcontext from "../../Hooks/Context/Context";
import "./Sidebar.css";
import useStyles from "../../Style";
import { FaRegHand } from "react-icons/fa6";
import { FaHandPaper } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const Sidebar = ({ sidebaropen, setsidebaropen }) => {
  const { state } = useContext(Createcontext);
  const [openDropdown, setOpendropdown] = useState("");
  const [sideopen, Setsideopen] = useState(false);
  const [stick, setStick] = useState(true);
  const classes = useStyles();
  const checkActive = (match, location) => {
    if (!location) return false;
    const { pathname } = location;
    return pathname === "/";
  };
  function closebar() {
    if (window.innerWidth < 994) {
      setsidebaropen(false);
    }
  }
  function manuchange(value) {
    if (openDropdown === "") {
      setOpendropdown(value);
    } else if (openDropdown === value) {
      setOpendropdown("");
    } else {
      setOpendropdown(value);
    }
  }

  return (
    <div className={`sidebar ${sidebaropen ? "opensidebarMobile" : ""}  ${sideopen ? "sidebaropen" : "sidebarclose"}  `}  onMouseOver={()=>{
    
        Setsideopen(true)
      
        }} onMouseLeave={()=>{
        if(!stick){
          Setsideopen(false) ;
          setOpendropdown('')
        }
        
        }}>

          {
            !sidebaropen ?  <div className="w-100 text-end p-4"><span onClick={()=>setStick(!stick)} >{stick? <FaHandPaper size={28} color="#31B655"/>:<FaRegHand size={28} color="#31B655"/>}</span></div>
               : <div className="w-100 text-end p-4"><span onClick={()=>setsidebaropen(false)} ><RxCross2 size={28} color="#31B655"/></span></div>
        
           }
       <ul>
        <NavLink to={"/"} onClick={closebar} isActive={checkActive}>
          <li button className={" active_bar "}>
            <Icon className={classes.sidebarIcon + ""}>
              {" "}
              <AiOutlineAppstore />
            </Icon>
            <span primary={"Dashboard"} className={" sidebar_text"}>
              Dashboard
            </span>
          </li>
        </NavLink>
        {((state.Roles.ViewCategory || (state.Roles.AddCategory || state.Roles.DeleteCategory || state.Roles.EditCategory) )&&(state.Roles.ViewSubcategory || (state.Roles.EditSubcategory || state.Roles.DeleteSubcategory || state.Roles.AddSubcategory) ) ) &&
        <li
          button
          className={`${
            openDropdown === "Category"
              ? "sidebarDropdown dropright"
              : "sidebarDropdown dropdownarroe"
          }`}
          onClick={() => {
            manuchange("Category");
          }}
        >
          <Icon className={classes.sidebarIcon + ""}>
            <GrProductHunt></GrProductHunt>{" "}
          </Icon>
          <span className={"sidebar_text "}>Category</span>
        </li>}
        <div
          className={`submanusidebar ${
            openDropdown === "Category" ? "d-block" : "d-none"
          }`}
        >
          {(state.Roles.ViewCategory || (state.Roles.AddCategory || state.Roles.DeleteCategory || state.Roles.EditCategory) )&&
          <NavLink to={"/category"} onClick={closebar} activeClassName="active">
            <li button className={" active_bar suboption"}>
              <span className={" sidebar_text"}>Category</span>
            </li>
          </NavLink>
        }
         {(state.Roles.ViewSubcategory || (state.Roles.EditSubcategory || state.Roles.DeleteSubcategory || state.Roles.AddSubcategory) )&&
          <NavLink
            to={"/subCategory"}
            onClick={closebar}
            activeClassName="active"
          >
            <li button className={" active_bar  suboption"}>
              {/* <Icon
                                className={ classes.sidebarIcon + ' sidebar_text'}
                                >
                                <FaRegUser ></FaRegUser>
                                </Icon> */}
              <span className={" sidebar_text"}>Sub Category</span>
            </li>
          </NavLink>
        }
        </div>

        

        {(state.Roles.ViewStore || (state.Roles.AddStore || state.Roles.EditStore || state.Roles.DeleteStore) )&&
          <NavLink
            to={"/Store"}
            onClick={closebar}
            isActive={checkActive}
            activeClassName="active-link"
          >
            <li button className={" active_bar "}>
              <Icon className={classes.sidebarIcon + " "}>
                <FiPackage />
              </Icon>
              <span className={" sidebar_text"}>Store</span>
            </li>
          </NavLink>
        }

        {(state.Roles.ViewBrand || (state.Roles.AddBrand || state.Roles.DeleteBrand || state.Roles.EditBrand) )&&
          <NavLink
            to={"/Brand"}
            onClick={closebar}
            isActive={checkActive}
            activeClassName="active-link"
          >
            <li button className={" active_bar "}>
              <Icon className={classes.sidebarIcon + ""}>
                <MdLocalActivity></MdLocalActivity>
              </Icon>
              <span className={" sidebar_text"}>Brand</span>
            </li>
          </NavLink>
        }
        {/* <NavLink to={"/Tax"} onClick={closebar} activeClassName="active">
          <li button className={" active_bar "}>
            <Icon className={classes.sidebarIcon + ""}>
              <MdStorefront></MdStorefront>
            </Icon>
            <span className={" sidebar_text"}>Tax</span>
          </li>
        </NavLink> */}

        {(state.Roles.ViewVendor || (state.Roles.AddVendor || state.Roles.DeleteVendor || state.Roles.EditVendor) )&&
        <NavLink to={"/Vendorlist"} onClick={closebar} activeClassName="active">
          <li button className={" active_bar "}>
            <Icon className={classes.sidebarIcon + ""}>
              <AiTwotoneSetting></AiTwotoneSetting>
            </Icon>
            <span className={" sidebar_text"} disableTypography={true}>
              Vendor
            </span>
          </li>
        </NavLink>
        }


        {(state.Roles.ViewBanners || (state.Roles.AddBanners || state.Roles.DeleteBanners || state.Roles.EditBanners) )&&
        <NavLink
          to={"/PromotionalBannerList"}
          onClick={closebar}
          activeClassName="active"
        >
          <li button className={" active_bar "}>
            <Icon className={classes.sidebarIcon + ""}>
              <AiTwotoneSetting></AiTwotoneSetting>
            </Icon>
            <span className={" sidebar_text"} disableTypography={true}>
              Banner
            </span>
          </li>
        </NavLink>
       }
        <li
          button
          className={`${
            openDropdown === "News"
              ? "sidebarDropdown dropright"
              : "sidebarDropdown dropdownarroe"
          } ''`}
          onClick={() => {
            manuchange("News");
          }}
        >
          <Icon className={classes.sidebarIcon + ""}>
            <FaHouseUser></FaHouseUser>{" "}
          </Icon>
          <span className={"sidebar_text"}>News</span>
        </li>
        <div
          className={`submanusidebar ${
            openDropdown === "News" ? "d-block" : "d-none"
          }`}
        >
            {(state.Roles.ViewBlogs || (state.Roles.AddBlogs || state.Roles.EditBlogs || state.Roles.DeleteBlogs) )&&
          <NavLink to={"/News"} onClick={closebar} activeClassName="active">
            <li button className={" active_bar  suboption"}>
              {/* <Icon
                              className={ classes.sidebarIcon + ' sidebar_text'}
                              >
                              <FaRegUser ></FaRegUser>
                              </Icon> */}
              <span className={" sidebar_text"}>All News</span>
            </li>
          </NavLink>
}
          <NavLink to={"/Review"} onClick={closebar} activeClassName="active">
            <li button className={" active_bar suboption"}>
              {/* <Icon
                              className={ classes.sidebarIcon + ' sidebar_text'}
                              >
                              <FaClipboardList ></FaClipboardList>
                              </Icon> */}
              <span className={" sidebar_text"}>Review</span>
            </li>
          </NavLink>
          <NavLink to={"/aboutus"} onClick={closebar} activeClassName="active">
            <li button className={" active_bar suboption"}>
              <span className={" sidebar_text"}>About us</span>
            </li>
          </NavLink>
          <NavLink
            to={"/NewsCategory"}
            onClick={closebar}
            activeClassName="active"
          >
            <li button className={" active_bar suboption"}>
              <span className={" sidebar_text"}>Category</span>
            </li>
          </NavLink>
          <NavLink
            to={"/NewsSubCategory"}
            onClick={closebar}
            activeClassName="active"
          >
            <li button className={" active_bar suboption"}>
              <span className={" sidebar_text"}>Sub Category</span>
            </li>
          </NavLink>
        </div>
        {(state.Roles.ViewStaff || (state.Roles.AddStaff || state.Roles.EditStaff || state.Roles.DeleteStaff) )&&
        <li
          button
          className={`${
            openDropdown === "staff"
              ? "sidebarDropdown dropright"
              : "sidebarDropdown dropdownarroe"
          } ''`}
          onClick={() => {
            manuchange("staff");
          }}
        >
          <Icon className={classes.sidebarIcon + ""}>
            <FaHouseUser></FaHouseUser>{" "}
          </Icon>
          <span className={"sidebar_text"}>Staff</span>
        </li>}
        <div
          className={`submanusidebar ${
            openDropdown === "staff" ? "d-block" : "d-none"
          }`}
        >
             {(state.Roles.AddStaff )&&
          
              <NavLink to={"/addstaff"} onClick={closebar} activeClassName="active">
                <li button className={" active_bar  suboption"}>
                  {/* <Icon
                                    className={ classes.sidebarIcon + ' sidebar_text'}
                                    >
                                    <FaRegUser ></FaRegUser>
                                    </Icon> */}
                  <span className={" sidebar_text"}>Add Staff</span>
                </li>
              </NavLink>}

             {(state.Roles.ViewStaff || (state.Roles.AddStaff || state.Roles.EditStaff || state.Roles.DeleteStaff) )&&
          <NavLink to={"/allstaff"} onClick={closebar} activeClassName="active">
            <li button className={" active_bar suboption"}>
              {/* <Icon
                                className={ classes.sidebarIcon + ' sidebar_text'}
                                >
                                <FaClipboardList ></FaClipboardList>
                                </Icon> */}
              <span className={" sidebar_text"}>All Staff</span>
            </li>
          </NavLink>}
       
        </div>

        {(state.Roles.ViewRoles || (state.Roles.EditRoles || state.Roles.AddRoles || state.Roles.DeleteRoles) )&&
        <li
          button
          className={`${
            openDropdown === "Role"
              ? "sidebarDropdown dropright"
              : "sidebarDropdown dropdownarroe"
          } ''`}
          onClick={() => {
            manuchange("Role");
          }}
        >
          <Icon className={classes.sidebarIcon + ""}>
            <FaHouseUser></FaHouseUser>{" "}
          </Icon>
          <span className={"sidebar_text"}>Roles</span>
        </li>}
        <div
          className={`submanusidebar ${
            openDropdown === "Role" ? "d-block" : "d-none"
          }`}
        >
             {(state.Roles.AddRoles )&&
          
              <NavLink to={"/addrole"} onClick={closebar} activeClassName="active">
                <li button className={" active_bar  suboption"}>
                  {/* <Icon
                                    className={ classes.sidebarIcon + ' sidebar_text'}
                                    >
                                    <FaRegUser ></FaRegUser>
                                    </Icon> */}
                  <span className={" sidebar_text"}>Add Roles</span>
                </li>
              </NavLink>}

             
              {(state.Roles.ViewRoles || (state.Roles.EditRoles || state.Roles.AddRoles || state.Roles.DeleteRoles) )&&
              <NavLink to={"/Roles"} onClick={closebar} activeClassName="active">
                <li button className={" active_bar suboption"}>
                  <span className={" sidebar_text"}>Role</span>
                </li>
              </NavLink>}
        </div>
        <NavLink to={"/Settings"} onClick={closebar} activeClassName="active">
          <li button className={" active_bar "}>
            <Icon className={classes.sidebarIcon + ""}>
              <MdPreview></MdPreview>
            </Icon>
            <span className={" sidebar_text"}>Settings</span>
          </li>
        </NavLink>
      </ul>
     
    </div>
  );
};

export default Sidebar;
