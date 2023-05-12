import React, { useEffect,useContext } from 'react';
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
import { useSnackbar } from 'notistack';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {

}
export default function NewsSubCategoryEdit(props) {
    const { enqueueSnackbar } = useSnackbar();
    const { dispatch } = useContext(Createcontext)
    const [open, setOpen] = React.useState(false);
    console.log(props)
    const [SubCategory, setSubCategory] = React.useState({
        id: props.data.id,
        Category_id: props.data.category_id,
        name: props.data.name,
        categoryName: props.data.category_name,
    });
    const [Category, setCategory] = React.useState([]);

    const handleChange = (event) => {
        const value = event.target.value;
        setSubCategory({
            ...SubCategory,
            [event.target.name]: value
        });
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const cookies = new Cookies();
    const token_data = cookies.get('Token_access')
    useEffect(() => {

        axios("http://backend.sweede.net/AdminPanel/Get-NewsCategory/", {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }
        }).then(response => {
            setCategory(response.data)
        })
    }, [token_data])

    const Submit = () => {
        const cookies = new Cookies();
        const token_data = cookies.get('Token_access')

        const config = {
            headers: { Authorization: `Bearer ${token_data}` }
        };

        const data = {
            "id" : SubCategory.id,
            "name": SubCategory.name.toUpperCase(),
            "category_id": SubCategory.Category_id,
          
        }
        Axios.post(
            `http://backend.sweede.net/AdminPanel/update-NewsSubCategory/${data.id}`,
            data,
            config
        ).then(() => {
            setOpen(false);
            dispatch({ type: 'api', api: true })
            enqueueSnackbar('Edit Sub-Category  success !', { variant: 'success' });
        })
    };

    return (
        <div>
            <Button color='success' onClick={handleClickOpen}>
                Edit
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

                            <div className='col-12' style={{marginTop:"6%"}} >

                                <div className='col-12 Add_Category center'>
                                    <div className="col "> <h2> Edit Sub Category
                                    </h2>
                                    </div>
                                </div>
                                <div className='col-8 top label  con ' style={{marginTop:"6%"}}>
                                    <div className='col'>
                                        <label className='label'>
                                            Name:
                                        </label>
                                    </div>
                                    <div className='col'>
                                        <TextField type="text" placeholder='Add  Sub Category' id="outlined-basic" variant="outlined" name='name' value={SubCategory.name.toUpperCase()} style={{ minWidth: 190, fontSize: 15 }}
                                            onChange={handleChange} />
                                    </div>
                                </div>
                                <div className='col-8 top label  con'>
                                    <div className='col'>
                                        <label className='label'>
                                           News Category Name:
                                        </label>
                                    </div>
                                    <div className='col'>
                                    <Select
                                        name='Category_id'
                                        value={SubCategory.Category_id}
                                        onChange={handleChange}
                                        displayEmpty
                                        size='small'
                                        inputProps={{ 'aria-label': 'Without label' }} style={{minWidth: 120 , fontSize:15}}
                                    >
                                        {
                                            Category.map((category ,index)=>{
                                               return(
                                                <MenuItem key={index} value={category.id} style={{ fontSize:15}}>{category.name}</MenuItem>
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
                    <Button sx={{color:'#31B665'}} autoFocus onClick={handleClose}>
                        Exit
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}