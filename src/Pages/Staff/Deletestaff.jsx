import  React ,{useState , useContext} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import axios from "axios"
import Cookies from 'universal-cookie';
import Createcontext from "../../Hooks/Context/Context"
import { useSnackbar } from 'notistack';
import { RiDeleteBin6Line } from "react-icons/ri";
import Deletepopup from '../../Components/Component/Deletepopup'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Deletestaff (props) {
  const [deleteoptn , setdeleteoprn] = useState(false)
  const [isdelete , setsisDelete] = useState(false)
  const { enqueueSnackbar } = useSnackbar();
  const { dispatch} = useContext(Createcontext)
    const cookies = new Cookies();
  const [open, setOpen] = React.useState(false);
  const token_data = cookies.get('Token_access')
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Delete = () => {
       axios.delete(`https://api.cannabaze.com/AdminPanel/delete-Brand/${props.data.id}`, {

           headers: {
               'Authorization': `Bearer ${token_data}`
           }
       }).then(response => {
        setOpen(false);
        dispatch({type:'api',api: true})
        enqueueSnackbar('Delete State success !', { variant: 'success' });
       })
   };

  return (
    <div>

        <RiDeleteBin6Line  onClick={handleClickOpen} size={20} color='#31B655'/>
        <Deletepopup setdeleteoprn={setdeleteoprn} setsisDelete={setsisDelete}  />
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Brand Delete ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          Are you sure you want to delete this Brand?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={Delete} sx={{ color: 'red'}}>yes</Button>
          <Button onClick={handleClose} sx={{ color: '#31B665'}} >No</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}