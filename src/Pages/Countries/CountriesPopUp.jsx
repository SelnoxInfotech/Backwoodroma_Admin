import  React ,{useContext} from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Cookies from 'universal-cookie';
import Axios from "axios"
import Createcontext from "../../Hooks/Context/Context"
import InputAdornment from '@mui/material/InputAdornment';
import {Headerbutton} from '../../molecules/Button/index'
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
          borderWidth: "1px",
          borderColor: 'black',
        },
        '& .MuiButtonBase-root': {
            fontSize: "1.5625rem",
            color: "#31B665"
        }
  },
}));

function BootstrapDialogTitle() {

}
export default function CountriesPopUp() {
    const { dispatch} = useContext(Createcontext)
    const [open, setOpen] = React.useState(false);
    const [Status, setStatus] = React.useState('Active');
    const [Namecountries, setNamecountries] = React.useState('');
    const [error , seterror] = React.useState('') 
    const [massage, setmassage] = React.useState()
    const handleStatus = (event) => {
        setStatus(event.target.value);

    };
    const handleName = (event) => {
        setNamecountries(event.target.value.toUpperCase());
        setmassage('')
       
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        seterror("")
        setmassage('')
    };
    const Submit = () => {
        const cookies = new Cookies();
        const token_data = cookies.get('Token_access')

        const config = {
            headers: { Authorization: `Bearer ${token_data}` }
        };

        const data = {
            "CountryName": Namecountries,
           "Status":Status
           }
        Axios.post( 
          'https://api.cannabaze.com/AdminPanel/Add-Country/',
          data,
          config
        ).then(()=>{
            setOpen(false);
            dispatch({type:'api',api: true})
            setStatus("")
            setNamecountries("")
        }).catch(
            function (error) {
                
                setmassage( error.response.data.Country)
               
                seterror("red")
               
            

                
            }
        )
    };

    return (
        <div>
            <Headerbutton onClick={handleClickOpen}>
                + Add countries
            </Headerbutton>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="Customizeed-dialog-title"
                open={open}
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width:{
                                xs:"60%",
                                sm:"60%",
                                md:"50%",
                                lg:"40%",
                                xl:"40%"
   
                               },
                               height: {
                                xs:"50%",
                                sm:"50%",
                                md:"50%",
                                lg:"50%",
                                xl:"60%"
                               },
                            border: "1px solid #31B665",
                            maxWidth: "none",  // Set your width here
                        },
                    },
                }}
            >
                <BootstrapDialogTitle id="Customizeed-dialog-title" onClose={handleClose}>
                    Modal title
                </BootstrapDialogTitle>
                <DialogContent dividers 
                 sx={{
                    "&.MuiDialogContent-root": {
                        overflowX: "hidden",
                        overflowY: "hidden",
                    }
                }}>
                    <div className='container-fluid '>
                        <div className='row '>

                            <div className='col-12' style={{marginTop:"6%"}} >

                                <div className='col-12 Add_countries Add_Category center'>
                                    <div className="col "> <h2> Add Countries
                                    </h2>
                                    </div>
                                </div>
                                <div className='col-12 top label  con  '>
                                    <div className='col'>
                                    <label className='label'>
                                    <span className='required'>*</span>
                                    Country Name:
                                    </label>
                                    </div>
                                  <div className='col'>
                                  <TextField placeholder='Add Country Name' InputProps={{ startAdornment: <InputAdornment position="start"> </InputAdornment>, style: { fontSize: 14 } }} id="outlined-basic" variant="outlined"   value={Namecountries } style={{minWidth: 190 , fontSize:15}}
                                        onChange={handleName}
                                        label={massage}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: error,
                                                    height: 55,
                                                },
                                            },
                                            "& label": {
                                                fontSize: 13,
                                                color: "red",
                                                "&.Mui-focused": {
                                                    marginLeft: 0,
                                                    color: "red",
                                                }
                                            }
                                        }}
                                         />
                                  </div>
                                </div>
                                <div className='col-12 top label  con'>
                                   <div className='col'>
                                   <label className='label'>
                                   Status:
                                    </label>
                                   </div>
                                 <div className='col'>
                                 <Select
                                        
                                        value={Status}
                                        onChange={handleStatus}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }} style={{minWidth: "25%", height: "5vh", fontSize: 15, }}>
                                        <MenuItem value={"Active"} style={{ fontSize:15}}>Active</MenuItem>
                                        <MenuItem value={"Hide"} style={{ fontSize:15}}>  Hide</MenuItem>
                                    </Select>
                                  </div>
                                </div>
                               
                                <div className='col-12 center top' >
                                    <button className='topbutton' autoFocus onClick={Submit} style={{ fontSize:15}}>
                                        Add Countries
                                    </button>
                                </div>

                            </div>

                        </div>

                    </div>
                </DialogContent>
                <DialogActions>
                    <Button   sx={{color:"#31B665"}} autoFocus onClick={handleClose}>
                        Exit
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}