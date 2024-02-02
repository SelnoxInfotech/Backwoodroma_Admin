import React, { useContext } from 'react';
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
import InputAdornment from '@mui/material/InputAdornment';
import Createcontext from "../../Hooks/Context/Context"
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
}));

function BootstrapDialogTitle(props) {

}
export default function Taxpop() {
    const { dispatch } = useContext(Createcontext)
    const [open, setOpen] = React.useState(false);
    const [Status, setStatus] = React.useState('Active');
    const [tax, settaxs] = React.useState('');
    const [type, settype] = React.useState('');
    const [error, seterror] = React.useState({
        x: "",
        y: ""
    })
    const [errorMassager, seterrorMassager] = React.useState({
        x: "",
        y: ""
    })
    const handleStatus = (event) => {
        setStatus(event.target.value);
    };

    const handletax = (event) => {
        settaxs(event.target.value);
        seterror("")
        seterrorMassager('')

    };
    const handleTex = (event) => {
        settype(event.target.value.toUpperCase());

    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        seterror("")
        seterrorMassager('')
    };



    const Submit = () => {
        const cookies = new Cookies();
        const token_data = cookies.get('Token_access')

        const config = {
            headers: { Authorization: `Bearer ${token_data}` }
        };

        const data = {
            "tax_value": parseFloat(tax),
            "tax_type": type,
            "Status": Status
        }
        Axios.post(
            'https://api.cannabaze.com/AdminPanel/Add-Tax/',
            data,
            config
        ).then(() => {
            setOpen(false);
            dispatch({ type: 'api', api: true })
            settaxs('')
            settype('')
            seterrorMassager({ y: "" })
            seterror({ y: "" })



        }).catch(
            function (error) {
             
                if (error.response.data.tax_value) {
                    seterrorMassager({ x: error.response.data.tax_value })
                    seterror({ x: "red" })
                }
                else if (error.response.data.tax_type) {

                    seterrorMassager({ y: error.response.data.tax_type })
                    seterror({ y: "red" })

                }
                else {
                    seterrorMassager({ y: error.response.data.error.tax_type[0] })
                    seterror({ y: "red" })
                }


            }
        )
    };

    return (
        <div>
            <button className='topbutton' onClick={handleClickOpen}>
                + Add Tax
            </button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="Customizeed-dialog-title"
                open={open}
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: {
                                xs: "60%",
                                sm: "60%",
                                md: "50%",
                                lg: "35%",
                                xl: "35%"

                            },
                            height: {
                                xs: "65%",
                                sm: "40%",
                                md: "50%",
                                lg: "50%",
                                xl: "60%"
                            },
                            overflowX: "hidden",

                            border: "1px solid #31B665",
                            maxWidth: "none",  // Set your width here
                        },
                    },
                }}
            >
                <BootstrapDialogTitle id="Customizeed-dialog-title" onClose={handleClose}>
                    Modal title
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <div className='container-fluid '>
                        <div className='row tax_pop_up_Main_row'>

                            <div className='col-12    ' >

                                <div className='col-12 Add_State Add_Category center'>
                                    <div className="col "> <h2> Tax
                                    </h2>
                                    </div>
                                </div>
                                <div className='col-12 top label  con  '>
                                    <div className='col'>
                                        <label className='label'>
                                            <span className='required'>*</span>
                                            Tax Value:
                                        </label>
                                    </div>
                                    <div className='col'>
                                        <TextField type="number" placeholder='Add  Tax Value' id="outlined-basic" variant="outlined" value={tax} style={{ minWidth: 190, fontSize: 15 }}
                                            onChange={handletax}
                                            InputProps={{ startAdornment: <InputAdornment position="start"> </InputAdornment>, style: { fontSize: 14 } }}
                                            label={errorMassager.x}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: error.x,
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
                                                },
                                                root: {
                                                    textTransform: "uppercase"
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className='col-12 top label  con'>
                                    <div className='col'>
                                        <label className='label'>
                                            <span className='required'>*</span>
                                            Tax Type:
                                        </label>
                                    </div>
                                    <div className='col'>

                                        <TextField  type="text" placeholder='Add  Tax Type' id="outlined-basic" variant="outlined" value={type} style={{ minWidth: 190, fontSize: 15 }}
                                            onChange={handleTex}
                                            InputProps={{ startAdornment: <InputAdornment position="start"> </InputAdornment>, style: { fontSize: 14 } }}
                                            label={errorMassager.y}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: error.y,
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
                                                },
                                                root: {
                                                    textTransform: "uppercase"
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className='col-12 top label  con'>
                                    <div className='col mt-4'>
                                        <label className='label'>
                                            Status:
                                        </label>
                                    </div>
                                    <div className='col'>
                                        <Select
                                            value={Status}
                                            size="small"
                                            onChange={handleStatus}
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Without label' }} style={{ minWidth: 120, fontSize: 15 }}
                                        >
                                            <MenuItem value="" style={{ fontSize: 15 }}>
                                                <em>Select option</em>
                                            </MenuItem>
                                            <MenuItem value={"Active"} style={{ fontSize: 15 }}>Active</MenuItem>
                                            <MenuItem value={"Hide"} style={{ fontSize: 15 }}>Hide</MenuItem>

                                        </Select>
                                    </div>
                                </div>
                                <div className='col-12 center top' >
                                    <button className='topbutton' autoFocus onClick={Submit} >
                                       Add Tax
                                    </button>
                                </div>

                            </div>

                        </div>

                    </div>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus style={{ fontSize: 15 }} color="success" onClick={handleClose}>
                        Exit
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}