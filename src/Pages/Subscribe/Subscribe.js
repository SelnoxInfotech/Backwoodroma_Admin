import  React,{useState ,useEffect} from 'react';
import Cookies from "universal-cookie";
import { SlSocialDropbox } from "react-icons/sl";
import axios from 'axios'
const Subscribe = () => {
const [email,setemail] = useState([])
const cookies = new Cookies();
const token_data = cookies.get("Token_access");
    useEffect(()=>{
        axios.get(`https://api.cannabaze.com/AdminPanel/Get-Subscribe/`,{
            headers: {
                'Authorization': `Bearer ${token_data}`
            }
        }).then((res)=>{
            setemail(res.data.data)
        })
    },[])
  return (
    <div className='py-4 section_card'>
        <div className='px-4'>  <h3 className='pagetitle'><SlSocialDropbox color='#31B655' size={25}/> Subscribe </h3> </div>
        <div className='Subscribe'>
            <div className='emaillisy'>
                <ul>
                    <li className='emailheading'><span>Email</span> <span>Date</span></li>
                        {
                            email?.map((item)=>{
                                return <li  className='emailList'><span>{item.email}</span> <span>{ 
                                    ("0" + (new Date(item.created_at)).getDate()).slice(-2)
                                    + "-" +   ("0" + ( (new Date(item.created_at)).getMonth()+1)).slice(-2)  + "-" +  (new Date(item.created_at)).getFullYear()  }</span></li>
                            })
                        }
                </ul>
            </div>
        </div>
    </div>
  )
}  

export default Subscribe