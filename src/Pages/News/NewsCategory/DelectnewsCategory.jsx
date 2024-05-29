import  React ,{useContext, useEffect} from 'react';
import axios from "axios"
import Cookies from 'universal-cookie';
import Createcontext from "../../../Hooks/Context/Context"
import { useSnackbar } from 'notistack';
import { RiDeleteBin6Line } from "react-icons/ri";
import Deletepopup from '../../../Components/Component/Deletepopup'
export default function NewsCategoryDelete(props) {
  const { enqueueSnackbar } = useSnackbar();
  const { dispatch} = useContext(Createcontext)
  const [deleteoptn , setdeleteoprn] = React.useState(false)
  const cookies = new Cookies();
  const [isdelete , setsisDelete] = React.useState(false)
  const token_data = cookies.get('Token_access')
  useEffect(()=>{
    if(isdelete){
     
       axios.delete(`https://api.cannabaze.com/AdminPanel/delete-NewsCategory/${props.data.id}`, {

      headers: {
          'Authorization': `Bearer ${token_data}`
      }
  }).then(response => {
    setsisDelete(false)
   dispatch({type:'api',api: true})
   enqueueSnackbar('Delete Category success !', { variant: 'success' });
  })
    }
  },[isdelete])
  return (
    <React.Fragment>
    <div>
      <span onClick={()=>{setdeleteoprn(true)}}>
         <RiDeleteBin6Line  size={16} />
      </span>
    </div>
            {   deleteoptn &&  <Deletepopup setdeleteoprn={setdeleteoprn} setsisDelete={setsisDelete} />}
    </React.Fragment>
  );
}