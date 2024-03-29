import React, { useEffect,useContext , useRef } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { LuUpload } from "react-icons/lu";
import { FaEdit } from "react-icons/fa";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Cookies from 'universal-cookie';
import axios from "axios"
import Axios from "axios"
import Createcontext from "../../Hooks/Context/Context"
import { useSnackbar } from 'notistack';
import InputAdornment from '@mui/material/InputAdornment';
import useStyles from '../../Style';
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
    '& .MuiButtonBase-root':{
        fontSize: "1.5rem",
        color:"#31B665"
    }
}));

function BootstrapDialogTitle(props) {

}
export default function SubCategoryEdit(props) {
    const inputRef = useRef(null);
    const [image, SetImage] = React.useState();
    const { enqueueSnackbar } = useSnackbar();
    const { dispatch } = useContext(Createcontext)
    const [open, setOpen] = React.useState(false);
    const [error, seterror] = React.useState('')
    const [massage, setmassage] = React.useState()
    const classes = useStyles()
    const [SubCategory, setSubCategory] = React.useState({
        id: props.data.id,
        Category_id: props.data.category_id,
        name: props.data.name,
        categoryName: props.data.category_name,
        Status: props.data.Status,
        SubCategoryImage: props.data.SubCategoryImage
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
        setmassage ( "")
                
        seterror("")
      
    };
    const handleimage = (event) => {
        SetImage(event.target.files[0])
    };
    const resetFileInput = () => {
        // resetting the input value
        inputRef.current.value = null;
        SetImage(null)
      };
    const cookies = new Cookies();
    const token_data = cookies.get('Token_access')
        useEffect(() => {

            axios("https://api.cannabaze.com/AdminPanel/ActiveCategory/", {

                headers: {
                    'Authorization': `Bearer ${token_data}`
                }
            }).then(response => {
                setCategory(response.data.data)
            })
        }, [token_data])

    const Submit = () => {
        const cookies = new Cookies();
        const token_data = cookies.get('Token_access')

        const config = {
            headers: { Authorization: `Bearer ${token_data}` }
        };
        const formdata = new FormData();
     
        formdata.append("id",SubCategory.id);
        formdata.append("name",  SubCategory.name.toUpperCase());
        formdata.append("category_id", SubCategory.Category_id);
        formdata.append("Status",SubCategory.Status);
        image ? formdata.append('SubCategoryImage',image)  :  SubCategory.SubCategoryImage ==="" &&  formdata.append('SubCategoryImage',SubCategory.SubCategoryImage)
        Axios.post(
            `https://api.cannabaze.com/AdminPanel/update-SubCategory/${SubCategory.id}`,
            formdata,
            config
        ).then(() => {
            setOpen(false);
            dispatch({ type: 'api', api: true })
            enqueueSnackbar('Edit Sub-Category  success !', { variant: 'success' });
            setmassage ( "")
        seterror("")
        }).catch(
            function (error) {
                setmassage ( error.response.data.name)
                
                seterror("red")
              
                return Promise.reject(error)
            }
        )
    };
    const handleDragOver = (event) => {
        event.preventDefault()
      }
      
      // Function to handle image drop
      const handleDrop = (event) => {
        event.preventDefault()
        const file = event.dataTransfer.files[0]
        if (file) {
            SetImage(file)
        }
      }
    return (
        <div>
            <span color='success' onClick={handleClickOpen}>
             <FaEdit size={22} color='#31B655'/>
             </span>
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
                            maxWidth: "none",
                            borderRadius: "15px",
                            overflowX: "hidden",
                            border: "1px solid #31B665"
                            // Set your width here
                        },
                    },
                }}
            >
                <BootstrapDialogTitle id="Customizeed-dialog-title" onClose={handleClose}>
                    Modal title
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <div className='container-fluid '>
                        <div className='row '>

                            <div className='col-12    ' >

                                <div className='col-12  text-center'>
                                   <h2 className='popupTitle'> Edit Sub Category </h2>
                                  
                                </div>
                                <div className='addSubcategoryForm'>
                                    <div className='inputFeildasf  '>
                                    
                                            <label className='label'>
                                              <span className='required'>*</span>
                                                Name:
                                            </label>
                                    
                                    
                                            <TextField type="text" placeholder='Add  Sub Category' id="outlined-basic" variant="outlined" name='name' value={SubCategory.name.toUpperCase()} 
                                                InputProps={{ startAdornment: <InputAdornment position="start"> </InputAdornment>, style: { fontSize: 14 } }}
                                                style={{ minWidth: "11vw" }} 
                                                onChange={handleChange}
                                                label={massage}
                                                 className={classes.popuptextfeild}
                                                />
                                        
                                    </div>
                                    <div className='inputFeildasf'>
                                    
                                            <label className='label'>
                                                Category Name:
                                            </label>
                                    
                                        <Select
                                            name='Category_id'
                                            value={SubCategory.Category_id}
                                            onChange={handleChange}
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Without label' }} 
                                            className={classes.popupselectFeild}
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
                                    <div className='inputFeildasf'>
                                        
                                        
                                        <label className='label'>
                                            Status:
                                        </label>
                                
                                
                                        <Select
                                        name='Status'
                                        value={SubCategory.Status}
                                        onChange={handleChange}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}  
                                        className={classes.popupselectFeild}
                                    >
                                        
                                        <MenuItem value={"Active"} style={{ fontSize:15}}>Active</MenuItem>
                                        <MenuItem value={"Hide"} style={{ fontSize:15}}>Hide</MenuItem>

                                    </Select>
                                
                                    </div>
                                   
                                    <div className='inputFeildasf'>
                                     

                                            <label className='label'>
                                                Image:
                                            </label>
                                            <input  type="file" id="formFile" ref={inputRef} accept="image/*"  variant="outlined" className='d-none'
                                                onChange={handleimage}
                                            />
                                           <label className='Imagelabel' htmlFor='formFile'  onDragOver= {handleDragOver} onDrop={handleDrop}>
                                        <LuUpload  size={24} color='#31B655'/> Drop files here or click to upload
                                     </label>


                                   
                                 
                                        <div className='col mt-4'>
                                        {
                                            image ? <> <img src={URL.createObjectURL(image)} alt="" style={{ width: "120px", height: "110px" }} />
                                                <Button  onClick={resetFileInput} color='success' >Cancel </Button></>
                                                :
                                                <>
                                                    <img src={ SubCategory.SubCategoryImage} alt="" style={{ width: "120px", height: "110px" }} />
                                                    <Button  name="SubCategoryImage" value="" color='success'onClick={handleChange} >Cancel </Button>
                                                </>
                                        }
                                        </div>

                                    </div>


                                  
                                        <div className='col-12 center top' >
                                            <button className='topbutton' autoFocus onClick={Submit} >
                                                Save changes
                                            </button>
                                        </div>
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