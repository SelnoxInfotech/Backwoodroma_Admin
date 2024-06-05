import  React ,{useContext} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import  {ClickAwayListener}  from '@mui/base/ClickAwayListener';
import DialogTitle from '@mui/material/DialogTitle';
import { RxCrossCircled } from "react-icons/rx";
import Slide from '@mui/material/Slide';
import axios from "axios"
import Cookies from 'universal-cookie';
import Createcontext from "../../Hooks/Context/Context"
import { useSnackbar } from 'notistack';
import { RiDeleteBin6Line } from "react-icons/ri";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function BrandDelete (props) {
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
    
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        {/* <DialogTitle>{"Brand Delete ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          Are you sure you want to delete this Brand?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={Delete} sx={{ color: 'red'}}>yes</Button>
          <Button onClick={handleClose} sx={{ color: '#31B665'}} >No</Button>
        </DialogActions> */}
          <div className='deleteconfirmpopup' >
              
            {/* <ClickAwayListener onClickAway={()=>{handleClose()}}> */}
                <div className='deletepopup' data-aos={'zoom-in'}>
                    <div className='Iconsdelete'>
                      <span className='dangericon'> <RxCrossCircled/></span>
                    </div>
                    <p >Are You Sure You want to Delete</p>
                    <div className='d-flex gap-4'>
                        <button className='flex-fill popupbtn' onClick={()=>{ Delete()}}>Delete</button>
                        <button className='flex-fill popupbtn' onClick={()=>{ handleClose()}}>Cancel</button>
                    </div>
                </div>
            {/* </ClickAwayListener> */}
          </div>
      </Dialog>
    </div>
  );
}