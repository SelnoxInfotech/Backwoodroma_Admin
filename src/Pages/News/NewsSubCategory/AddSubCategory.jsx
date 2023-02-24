import  React, {useContext} from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Cookies from 'universal-cookie';
import axios from "axios"
import Axios from "axios"
import Createcontext from "../../../Hooks/Context/Context"
import InputAdornment from '@mui/material/InputAdornment';
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
    },
    '& .MuiButtonBase-root': {
        fontSize: "1.5625rem",
        color: "#31B665"
    },
}));

function BootstrapDialogTitle(props) {

}
export default function AddNewsCategory() {
    const { dispatch} = useContext(Createcontext)
    const [open, setOpen] = React.useState(false);
    const [SubCategory, setSubCategory] = React.useState([]);
    const [Category, setCategory] = React.useState([]);
    const [error, seterror] = React.useState()
    const [massage, setmassage] = React.useState()

    const [NameCategory, setNameCategory] = React.useState([]);
 
    const handleChange = (event) => {
        setCategory(event.target.value);
       
    };
    const handleName = (event) => {
        setNameCategory(event.target.value.toUpperCase());
        setmassage("")
        seterror("")
    };
   
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setmassage("")
        seterror("")
    };

    React.useEffect(() => {
        const cookies = new Cookies();
        const token_data = cookies.get('Token_access')

        axios("http://34.201.114.126:8000/AdminPanel/Get-NewsCategory/", {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }

        }).then(response => {
            
            setSubCategory(response.data)
            
        })
    }, [])



    const Submit = () => {
        const cookies = new Cookies();
        const token_data = cookies.get('Token_access')

        const config = {
            headers: { Authorization: `Bearer ${token_data}` }
        };

        const data = {
            "name": NameCategory,
            "category_id": Category ,
           }
        Axios.post( 
          'http://34.201.114.126:8000/AdminPanel/Add-NewsSubCategory/',
          data,
          config
        ).then(()=>{
            setOpen(false);
            dispatch({type:'api',api: true})
        }).catch(
            function (error) {
                setmassage(error.response.data.name)
                seterror("red")

            }
        )
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                + Add News Sub Category
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: {
                                xs: "60%",
                                sm: "60%",
                                md: "50%",
                                lg: "40%",
                                xl: "40%"

                            },
                            height: {
                                xs: "55%",
                                sm: "55%",
                                md: "50%",
                                lg: "50%",
                                xl: "60%"
                            },
                            maxWidth: "none",  // Set your width here
                            border: "1px solid #31B665",
                            borderRadius: "15px",
                        },
                    },
                }}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Modal title
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <div className='container-fluid '>
                        <div className='row '>

                            <div className='col-12'style={{marginTop:"7%"}} >

                                <div className='col-12 Add_Category center'>
                                    <div className="col "> <h2> Add News Sub Category
                                    </h2>
                                    </div>
                                </div>
                                <div className='col-8 top label  con' style={{marginTop:"7%"}}>
                                    <div className='col'>
                                    <label className='label'>
                                        Name:
                                    </label>
                                    </div>
                                  <div className='col'>
                                  <TextField placeholder='Add  Sub Category' id="outlined-basic" variant="outlined"   value={NameCategory } style={{minWidth: 190 , fontSize:15}}
                                        onChange={handleName}
                                        InputProps={{ startAdornment: <InputAdornment position="start"> </InputAdornment>, style: { fontSize: 14 } }}
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
                                <div className='col-8 top label  con'>
                                   <div className='col'>
                                   <label className='label'>
                                        Main Category:
                                    </label>
                                   </div>
                                 <div className='col'>
                                 <Select
                                        
                                        value={Category}
                                        onChange={handleChange}
                                        displayEmpty
                                        size='small'
                                        inputProps={{ 'aria-label': 'Without label' }} style={{minWidth: 120 , fontSize:15}}>
                                            <MenuItem value="" disabled style={{ fontSize:15}}>
                                            <em>Select option</em>
                                        </MenuItem>
                                        {
                                            SubCategory.map((category) => {
                                                return (
                                                    <MenuItem style={{ fontSize:15}} key={category.id}  value={category.id}  >
                                                        {category.name}
                                                    </MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                  </div>
                                </div>
                               
                                <div className='col-12 center top' >
                                    <button className='btn Sub_button' autoFocus onClick={Submit} >
                                        Save changes
                                    </button>
                                </div>

                            </div>

                        </div>

                    </div>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Exit
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}