import  React ,{useContext} from 'react';
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
import { BsTrashFill } from 'react-icons/bs';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UserDelete({data}) {
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

    const id = data.id
       axios.delete(`https://api.cannabaze.com/AdminPanel/DeleteProductById/${id}`, {

           headers: {
               'Authorization': `Bearer ${token_data}`
           }
       }).then(response => {
        setOpen(false);
        dispatch({type:'api',api: true})
        enqueueSnackbar(' Tax Delete success !', { variant: 'success' });
       })
   };

  return (
    <div>
    <span className='w-100 text-center'>
        <BsTrashFill onClick={handleClickOpen} color='#31B655' size={18}/> </span>
      
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Delete User?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          Are you sure you want to delete this User?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={Delete} sx={{ color: 'red'}}>yes</Button>
          <Button onClick={handleClose} sx={{ color: '#31B665'}} >no?</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}