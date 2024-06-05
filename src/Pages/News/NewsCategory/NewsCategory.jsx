import React, { useEffect,useContext } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import { SlSocialDropbox } from "react-icons/sl";
import Createcontext from '../../../Hooks/Context/Context'
import AddNewsCategory from "./AddNewsCategory";
import Button from '@mui/material/Button';
import { RiDeleteBin6Line } from "react-icons/ri";
import Deletepopup from '../../../Components/Component/Deletepopup';
import Successfullypopup from '../../../Components/Component/Successfullypopup';
import NewsCategoryEditbox from './EditNewsCategory'
import Unsuccesspopup from '../../../Components/Component/Unsuccesspopup';
import { SectionCard } from "../../../molecules/SectionCard/Index";
export default function NewsCategory(props) {
  const [deleteoptn , setdeleteoprn] = React.useState(false)
  const [isdelete , setsisDelete] = React.useState(false)
  const { state ,dispatch } = useContext(Createcontext)
  const [loader, setloader] = React.useState(true);
  const [categoryid , Setcategoryid] = React.useState('')
  const [sucsesopen , setsucsesopen] = React.useState(false)
  const [unsucsesopen , setunsucsesopen] = React.useState(false)
  const cookies = new Cookies();
  const token_data = cookies.get("Token_access");
  const [totel, setTotal] = React.useState([]);

  useEffect(()=>{
    if(isdelete){
     
        axios.delete(`https://api.cannabaze.com/AdminPanel/delete-NewsCategory/${categoryid}`, {
        headers: {
            'Authorization': `Bearer ${token_data}`
        }
        }).then(response => {
          setsucsesopen(true)
          axios("https://api.cannabaze.com/AdminPanel/Get-NewsCategory/", {
            headers: {
              Authorization: `Bearer ${token_data}`,
            },
          }).then((response) => {
            setTotal([...response.data]);
          });
        }).catch((error)=>{
          setunsucsesopen(true)
        })
    }
  },[isdelete])
  useEffect(() => {
    setloader(true)
    axios("https://api.cannabaze.com/AdminPanel/Get-NewsCategory/", {
      headers: {
        Authorization: `Bearer ${token_data}`,
      },
    }).then((response) => {
      setTotal([...response.data]);
      setloader(false)
    }).catch((error)=>{
      setloader(false)
    })
  }, [state.api]);
  return (
    <div>
        <SectionCard  >
        <div className="col-12 p-3 d-flex justify-content-between align-items-center">
          <h2 className="pagetitle">
            <SlSocialDropbox color="#31B655" size={25} /> News Category
          </h2>
        { state.Roles.AddBlogsCategory && <span>{<AddNewsCategory></AddNewsCategory>}</span>}
        </div>
        </SectionCard>
        <div className="col-12">
          <div className="listtable">
            <ul>
              {totel.map((item) => {
             
                return (
                  <li>
                    <div className="listitems">
                        <p>{item.name}</p>
                      <div className="gap-3 d-flex">
                        {
                          state.Roles.EditBlogsCategory &&
                             <span >
                                <NewsCategoryEditbox  data={item} />
                            </span>
                         }
                         {   state.Roles.DeleteBlogsCategory &&
                            <span onClick={()=>{setdeleteoprn(true) ;Setcategoryid(item.id)}}>
                                <RiDeleteBin6Line  size={16} />
                            </span>
                         }
                      </div>
                    </div>
                  </li>
                );
              })}
              <li></li>
            </ul>
          </div>
        </div>
        {loader &&  <div className="loader_container">  <span className="newloader shine"><img src='/image/icon.png' alt='cannabaze logo' title='cannabaze logo' /></span>
          </div>}
        {   deleteoptn &&  <Deletepopup setdeleteoprn={setdeleteoprn} setsisDelete={setsisDelete} />}
        {   sucsesopen && <Successfullypopup  setsucsesopen={setsucsesopen} link={''}/>}
        {   unsucsesopen && <Unsuccesspopup setsucsesopen={setunsucsesopen} link={''}/>}
   </div>
  );
}
