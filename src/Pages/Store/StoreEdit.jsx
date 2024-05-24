import React, { useEffect, useContext ,useRef} from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { FaEdit } from "react-icons/fa";

import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Cookies from 'universal-cookie';
import { FiEdit } from 'react-icons/fi';
import axios from "axios"
import Axios from "axios"
import { AiOutlineCloudUpload } from "react-icons/ai";
import htmlToDraft from 'html-to-draftjs';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, ContentState } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import Createcontext from "../../Hooks/Context/Context"
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



const getInitialState = (defaultValue) => {
    if (defaultValue) {
        const blocksFromHtml = htmlToDraft(defaultValue);
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        return EditorState.createWithContent(contentState);
    } else {
        return EditorState.createEmpty();
    }
};


export default function StoreEdit(props) {
    const inputRef = useRef(null);
    const defaultValue = props.data.Stores_Description
    const [editorState, setEditorState] = React.useState(getInitialState(defaultValue));
    const [convertedContent, setConvertedContent] = React.useState();
    const { enqueueSnackbar } = useSnackbar();
    const { dispatch } = useContext(Createcontext)
    const [open, setOpen] = React.useState(false);
    const [Cities, setCities] = React.useState([]);
    const [image, SetImage] = React.useState('');
    const [vendorlist, setvendorlist] = React.useState([])
    const [Store, setStore] = React.useState({
        Store_Name: props.data.Store_Name,
        city_id: props.data.City,
        Store_Type: props.data.Store_Type,
        LicenceNo: props.data.LicenceNo,
        Store_Address: props.data.Store_Address,
        Stores_Website: props.data.Stores_Website,
        Stores_MobileNo: props.data.Stores_MobileNo,
        Status: props.data.Status,
        Store_Image: props.data.Store_Image,
        created_by:props.data.created_by,
    });
    React.useEffect(() => {
        let html = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(html);

    }, [editorState]);

    React.useEffect(() => {
        const cookies = new Cookies();
        const token_data = cookies.get('Token_access')
        axios.get('https://api.cannabaze.com/AdminPanel/Get-AllVendor/', {
            headers: {
                'Authorization': `Bearer ${token_data}`
            }

        }).then((res) => {
            setvendorlist(res.data.data)
        }).catch((error) => {
            console.trace(error)
        })


    }, []);

    const handleChange = (event) => {
        const value = event.target.value;
        setStore({
            ...Store,
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

        axios("https://api.cannabaze.com/AdminPanel/ActiveCities/", {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }
        }).then(response => {
            setCities(response.data.data)
        })
    }, [token_data])

    const handleimage = (event) => {
        SetImage(event.target.files[0])
    };


    const resetFileInput = () => {
        inputRef.current.value = null;
        SetImage(null)
    };
    const handleDragOver = (event) => {
        event.preventDefault()
    }
      
      const handleDrop = (event) => {
        event.preventDefault()
        const file = event.dataTransfer.files[0]
        if (file) {
            SetImage(file)
        }
      }
    const formdata = new FormData();

    image ? formdata.append('Store_Image',image)  :  Store.Store_Image ==="" &&  formdata.append('Store_Image',Store.Store_Image)
    formdata.append('Store_Name', Store.Store_Name);
    formdata.append('City_id', Store.city_id);
    formdata.append('Store_Type', Store.Store_Type);
    formdata.append('LicenceNo', Store.LicenceNo);
    formdata.append('Store_Address', Store.Store_Address);
    formdata.append('Stores_Website', Store.Stores_Website);
    formdata.append('Stores_MobileNo', Store.Stores_MobileNo);
    formdata.append('Status', Store.Status);
    formdata.append('Stores_Description', convertedContent);
    formdata.append('created_by', Store.created_by);

    const Submit = () => {
        const cookies = new Cookies();
        const token_data = cookies.get('Token_access')

        const config = {
            headers: { Authorization: `Bearer ${token_data}` }
        };


        Axios.post(
            `https://api.cannabaze.com/AdminPanel/update-Stores/${props.data.id}`,
            formdata,
            config
        ).then(() => {
            setOpen(false);
            dispatch({ type: 'api', api: true })
            enqueueSnackbar('Edit Sub-Category  success !', { variant: 'success' });
        })
    };
    function tomorrowdate(){
        var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
        var day =  String(currentDate.getDate()).padStart(2, '0')
        var month = String(currentDate.getMonth() + 1).padStart(2, '0')
        
        var year = currentDate.getFullYear()
       return  `${year}-${month}-${day}` 
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
                                xs: "100%",
                                sm: "100%",
                                md: "100%",
                                lg: "70%",
                                xl: "700px"

                            },
                            height: {
                                xs: "75%",
                                sm: "75%",
                                md: "75%",
                                lg: "100%",
                                xl: "600px"
                            },
                            border: "1px solid #31B665",
                            borderRadius: "15px",
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
                        <div className='row login_form_feild'>
                                <div className='Add_Category center' style={{marginTop:"2%"}}><h2> Edit Store  </h2>  </div>
                                <div className='col-sm-6 lg_ip_feild'>
                                        <label> Store Name: </label>
                                        <TextField type="text" placeholder='Add  Sub Category' id="outlined-basic" variant="outlined" name='Store_Name' value={Store.Store_Name} style={{ minWidth: 190, fontSize: 15 }}
                                            onChange={handleChange} 
                                            sx={{
                                                width:'100%',
                                                '& .MuiOutlinedInput-root': {
                                                    fontSize:'16px',
                                                  
                                                    '& fieldset': {
                                                        borderColor: 'black',
                                                    },
                                                },
                                                '& .MuiOutlinedInput-input':{
                                                padding:' 10px',
                                                },
                                                "& label": {
                                                    fontSize: 13,
                                                    color: "red",
                                                    "&.Mui-focused": {
                                                        marginLeft: 0,
                                                        color: "red",
                                                    }
                                                }
                                            }}/>
                                </div>
                                <div className='col-sm-6 lg_ip_feild'>
                                  
                                        <label> City Name:</label>
                                        <Select
                                            name='city_id'
                                            value={Store.city_id}
                                            onChange={handleChange}
                                            displayEmpty
                                            size='small'
                                            inputProps={{ 'aria-label': 'Without label' }} 
                                            sx={{
                                                width:'100%',
                                                '& .MuiOutlinedInput-root': {
                                                    fontSize:'16px',
                                                  
                                                    '& fieldset': {
                                                        borderColor: 'black',
                                                    },
                                                },
                                                '& .MuiOutlinedInput-input':{
                                                padding:' 10px',
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
                                        >
                                            {
                                                Cities.map((Cities, index) => {
                                                    return (
                                                        <MenuItem key={index} value={Cities.id} style={{ fontSize: 15 }}>{Cities.CityName}</MenuItem>
                                                    )
                                                })
                                            }

                                        </Select>
                                    
                                </div>
                                <div className='col-sm-6 lg_ip_feild'>
                                        <label> Store Type:  </label>
                                        <Select
                                            name='Store_Type'
                                            value={Store.Store_Type}
                                            onChange={handleChange}
                                            displayEmpty
                                            size='small'
                                            inputProps={{ 'aria-label': 'Without label' }}   sx={{
                                                width:'100%',
                                                '& .MuiOutlinedInput-root': {
                                                    fontSize:'16px',
                                                  
                                                    '& fieldset': {
                                                        borderColor: 'black',
                                                    },
                                                },
                                                '& .MuiOutlinedInput-input':{
                                                padding:' 10px',
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
                                        >
                                            <MenuItem disabled value="" style={{ fontSize: 15 }}>
                                                <em>Store Type</em>
                                            </MenuItem>
                                            <MenuItem value={"cbd store"} style={{ fontSize: 15 }}>CBD Store</MenuItem>
                                            <MenuItem value={"brand"} style={{ fontSize: 15 }}>Brand</MenuItem>
                                            <MenuItem value={"dispensary"} style={{ fontSize: 15 }}>Dispensary</MenuItem>
                                            <MenuItem value={"delivery"} style={{ fontSize: 15 }}>Delivery</MenuItem>
                                            <MenuItem value={"doctor"} style={{ fontSize: 15 }}>Doctor</MenuItem>


                                        </Select>
                                </div>
                                <div className='col-sm-6 lg_ip_feild'>
                                        <label> LicenceNo: </label>
                                        <TextField type="text" placeholder='Add LicenceNo' id="outlined-basic" variant="outlined" name='LicenceNo' value={Store.LicenceNo} style={{ minWidth: 190, fontSize: 15 }}
                                            onChange={handleChange}   sx={{
                                                width:'100%',
                                                '& .MuiOutlinedInput-root': {
                                                    fontSize:'16px',
                                                  
                                                    '& fieldset': {
                                                        borderColor: 'black',
                                                    },
                                                },
                                                '& .MuiOutlinedInput-input':{
                                                padding:' 10px',
                                                },
                                                "& label": {
                                                    fontSize: 13,
                                                    color: "red",
                                                    "&.Mui-focused": {
                                                        marginLeft: 0,
                                                        color: "red",
                                                    }
                                                }
                                            }} />
                                </div>
                                <div className='col-sm-6 lg_ip_feild'>
                                        <label>  Store Address:  </label>
                                        <TextField type="text" placeholder='Add Store Address:' id="outlined-basic" variant="outlined" name='Store_Address' value={Store.Store_Address} style={{ minWidth: 190, fontSize: 15 }}
                                            onChange={handleChange}    sx={{
                                                width:'100%',
                                                '& .MuiOutlinedInput-root': {
                                                    fontSize:'16px',
                                                  
                                                    '& fieldset': {
                                                        borderColor: 'black',
                                                    },
                                                },
                                                '& .MuiOutlinedInput-input':{
                                                padding:' 10px',
                                                },
                                                "& label": {
                                                    fontSize: 13,
                                                    color: "red",
                                                    "&.Mui-focused": {
                                                        marginLeft: 0,
                                                        color: "red",
                                                    }
                                                }
                                            }}/>
                                </div>
                                <div className='col-sm-6 lg_ip_feild'>
                                  
                                        <label  >
                                            Store Website:
                                        </label>
                                 

                                        <TextField type="text" placeholder='Add  Store Website:' id="outlined-basic" variant="outlined" name='Stores_Website' value={Store.Stores_Website} style={{ minWidth: 190, fontSize: 15 }}
                                            onChange={handleChange}   sx={{
                                                width:'100%',
                                                '& .MuiOutlinedInput-root': {
                                                    fontSize:'16px',
                                                  
                                                    '& fieldset': {
                                                        borderColor: 'black',
                                                    },
                                                },
                                                '& .MuiOutlinedInput-input':{
                                                padding:' 10px',
                                                },
                                                "& label": {
                                                    fontSize: 13,
                                                    color: "red",
                                                    "&.Mui-focused": {
                                                        marginLeft: 0,
                                                        color: "red",
                                                    }
                                                }
                                            }}/>
                                    
                                </div>
                                <div className='col-sm-6 lg_ip_feild'>
                                        <label  >  Store MobileNo: </label>
                                        <TextField type="text" placeholder='Add Store MobileNo:' id="outlined-basic" variant="outlined" name='Stores_MobileNo' value={Store.Stores_MobileNo} style={{ minWidth: 190, fontSize: 15 }}
                                            onChange={handleChange}   sx={{
                                                width:'100%',
                                                '& .MuiOutlinedInput-root': {
                                                    fontSize:'16px',
                                                  
                                                    '& fieldset': {
                                                        borderColor: 'black',
                                                    },
                                                },
                                                '& .MuiOutlinedInput-input':{
                                                padding:' 10px',
                                                },
                                                "& label": {
                                                    fontSize: 13,
                                                    color: "red",
                                                    "&.Mui-focused": {
                                                        marginLeft: 0,
                                                        color: "red",
                                                    }
                                                }
                                            }} />
                                </div>
                                <div className='col-sm-6 lg_ip_feild'>
                                  
                                  <label>  Status: </label>
                                  <Select
                                      name='Status'
                                      value={Store.Status}
                                      onChange={handleChange}
                                      size="small"
                                      displayEmpty
                                      inputProps={{ 'aria-label': 'Without label' }}   sx={{
                                          width:'100%',
                                          '& .MuiOutlinedInput-root': {
                                              fontSize:'16px',
                                            
                                              '& fieldset': {
                                                  borderColor: 'black',
                                              },
                                          },
                                          '& .MuiOutlinedInput-input':{
                                          padding:' 10px',
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
                                  >
                                      <MenuItem value="" style={{ fontSize: 15 }}>
                                          <em>Select option</em>
                                      </MenuItem>
                                      <MenuItem value={"Active"} style={{ fontSize: 15 }}>Active</MenuItem>
                                      <MenuItem value={"Hide"} style={{ fontSize: 15 }}>Hide</MenuItem>

                                  </Select>
                              
                                </div>
                                <div className='col-12 lg_ip_feild'>
                                  
                                        <label> Store Image:</label>
                                        <input type="file" placeholder='Add Store Image:' ref={inputRef} id="storeeditimage" className='d-none'
                                                onChange={handleimage} />
                                        <label htmlFor='storeeditimage' onDragOver={handleDragOver} onDrop={handleDrop} className='imagelabelstore'> <AiOutlineCloudUpload  size={22} color='#31B655'/> Change Store Image</label>
                                            <div className=''>
                                                {
                                                    image ? 
                                                    <>
                                                    <img src={URL.createObjectURL(image)}  alt="" style={{ width: "120px", height: "110px" }} /> 
                                                    <Button onClick={resetFileInput} color='success' >Cancel </Button>
                                                    </>
                                                    
                                                    :  
                                                <>
                                                    <img src={(Store.Store_Image)} alt="" style={{ width: "120px", height: "110px" }} />
                                                    <Button name="Store_Image" value="" color='success' onClick={handleChange} >Cancel </Button>
                                                </>
                                                }
                                            </div>
                                        
                                </div>
                                <div className='col-12 lg_ip_feild'>
                               
                                        <label  >  Store Description: </label>
                                        <div className='text_editor'>
                                        <Editor
                                            editorState={editorState}
                                            onEditorStateChange={setEditorState}
                                            toolbarClassName="toolbarClassName"
                                            wrapperClassName="wrapperClassName"
                                            editorClassName="editorClassName"
                                        /></div>
                                   
                                </div>
                                <Select
                                                // {...field}
                                                value={Store.created_by || ''}
                                                onChange={(e) => {
                                                    handleChange(e);
                                                }}
                                                name='created_by'
                                                displayEmpty
                                                placeholder="Select Store Type"
                                                sx={{
                                                    width: '100%',
                                                    '& .MuiOutlinedInput-root': {
                                                        fontSize: '16px',
                                                        '& fieldset': {
                                                            // borderColor: Boolean(errors.License_Type) ? 'red' : 'default',
                                                        },
                                                    },
                                                    '& .MuiOutlinedInput-input': {
                                                        padding: '10px',
                                                    },
                                                    "& label": {
                                                        fontSize: 13,
                                                        color: "red",
                                                        "&.Mui-focused": {
                                                            marginLeft: 0,
                                                            color: "red",
                                                        }
                                                    },
                                                    '& .MuiSelect-select': {
                                                        fontSize: '16px',
                                                        color: 'rgb(133, 133, 133)',
                                                    }
                                                }}
                                            >
                                                <MenuItem disabled value="" style={{ fontSize: 15 }}>
                                                    <em>Select</em>
                                                </MenuItem>

                                                {
                                                    vendorlist?.map((data, index) => {
                                                        return (
                                                            <MenuItem key={index} value={data?.id} style={{ fontSize: 15 }}>{data?.Name} ({data?.email})</MenuItem>
                                                        )
                                                    })
                                                }
                                            </Select>
                                <div className='col-12 center top' >
                                    <button className='topbutton' autoFocus onClick={Submit} >
                                        Save changes
                                    </button>
                                </div>


                        </div>

                    </div>
                </DialogContent>
                <DialogActions>
                    <Button  sx={{color:"#31B665"}} autoFocus onClick={handleClose}>
                        Exit
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}