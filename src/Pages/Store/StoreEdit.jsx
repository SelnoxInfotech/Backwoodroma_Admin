import React, { useEffect, useContext, useRef } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { FaEdit } from "react-icons/fa";
import MuiPhoneNumber from 'material-ui-phone-number';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Cookies from 'universal-cookie';
import { FiEdit } from 'react-icons/fi';
import axios from "axios"
import Axios from "axios"
import { IoLocationSharp } from "react-icons/io5"
import { AiOutlineCloudUpload } from "react-icons/ai";
import htmlToDraft from 'html-to-draftjs';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, ContentState } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import Createcontext from "../../Hooks/Context/Context"
import { useSnackbar } from 'notistack';
import _ from 'lodash';
import useGoogle from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import { useForm, Controller } from "react-hook-form";
import Autocomplete from '@mui/material/Autocomplete';
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
    const { register, handleSubmit, errors, control, setError } = useForm();
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
        Store_Type: props.data.Store_Type,
        LicenceNo: props.data.LicenceNo,
        Store_Address: props.data.Store_Address,
        Stores_Website: props.data.Stores_Website,
        Stores_MobileNo: props.data.Stores_MobileNo,
        Status: props.data.Status,
        Store_Image: props.data.Store_Image,
        created_by: props.data.created_by,
        Country: props.data.Country,
        state: props.data.State,
        city: props.data.City,
        License_Type: "None",

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


    const {
        placesService,
        placePredictions,
        getPlacePredictions,
    } = useGoogle({
        debounce: 500,
        language: 'en',
        apiKey: 'AIzaSyBRchIzUTBZskwvoli9S0YxLdmklTcOicU'
    });


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

    image ? formdata.append('Store_Image', image) : Store.Store_Image === "" && formdata.append('Store_Image', Store.Store_Image)
    // formdata.append('Store_Name', Store.Store_Name);
    // formdata.append('City_id', Store.city_id);
    // formdata.append('Store_Type', Store.Store_Type);
    // formdata.append('LicenceNo', Store.LicenceNo);
    // formdata.append('Store_Address', Store.Store_Address);
    // formdata.append('Stores_Website', Store.Stores_Website);
    // formdata.append('Stores_MobileNo', Store.Stores_MobileNo);
    // formdata.append('Status', Store.Status);
    // formdata.append('Stores_Description', convertedContent);
    // formdata.append('created_by', Store.created_by);

    formdata.append('Store_Name', Store.Store_Name);
    formdata.append('City', Store?.city?.replace(/-/g, " "));
    formdata.append("State" , Store?.state?.replace(/-/g, " "))
    formdata.append("Country" , Store?.Country?.replace(/-/g, " "))
    formdata.append('Store_Type', Store.Store_Type);
    formdata.append("StoreFront" ,  Boolean(Store.Store_Type === "dispensary"))
    formdata.append("Delivery" ,  Boolean(Store.Store_Type === "delivery"))
    formdata.append("CurbSide_Pickup" ,  Boolean(Store.Store_Type === "Curbside Pickup"))
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
    function tomorrowdate() {
        var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
        var day = String(currentDate.getDate()).padStart(2, '0')
        var month = String(currentDate.getMonth() + 1).padStart(2, '0')

        var year = currentDate.getFullYear()
        return `${year}-${month}-${day}`
    }

    async function handleAddress(e, value) {
        let store_address = ""
        let country1 = ""
        let state1 = ""
        let city1 = ""
        placesService?.getDetails({ placeId: value?.place_id }, async (placeDetails) => {
            store_address = placeDetails.formatted_address
            // setValue('Store_Address', placeDetails?.formatted_address, { shouldValidate: true })
            const object = {}
            placeDetails?.address_components.map((data) => {
                let l = data.types[0] === "political" ? data.types[1] : data.types[0]
                object[l] = data.long_name
                return object
            })
            if (Boolean(object.country)) {

                country1 = object.country
            }
            else if (Object.keys(object).length === 1) {
                country1 = Object.values(object)[0].replace(/\s/g, '-')

            }

            if (Boolean(object.administrative_area_level_1)) {

                state1 = object.administrative_area_level_1.replace(/\s/g, '-');


            }
            if (Boolean(object.administrative_area_level_3) || Boolean(object.establishment) || Boolean(object.locality) || Boolean(object.sublocality) || Boolean(object.administrative_area_level_2)) {


                if (Boolean(object.administrative_area_level_3)) {
                    city1 = object.administrative_area_level_3
                }
                if (Boolean(object.sublocality) && Boolean(object.locality)) {

                    city1 = object.sublocality.replace(/\s/g, '-')
                }
                else if (Boolean(object.locality)) {

                    city1 = object.locality.replace(/\s/g, '-')
                }
                else if (Object.keys(object).length !== 1 && Boolean(object.establishment)) {
                    city1 = object.establishment.replace(/\s/g, '-')
                }
                else if (Boolean(object.sublocality_level_1)) {
                    city1 = object.sublocality_level_1.replace(/\s/g, '-')
                }

                if (Boolean(object.sublocality_level_1) && Boolean(object.locality)) {
                    city1 = object.sublocality_level_1.replace(/\s/g, '-')
                }

                if ((Boolean(object.administrative_area_level_3) && Boolean(object.locality)) && (Boolean(object.administrative_area_level_1) && Boolean(object.locality))) {

                    city1 = object.locality.replace(/\s/g, '-')
                }
                else {
                    if (!Boolean(object.administrative_area_level_3) && !Boolean(object.establishment) && !Boolean(object.locality) && !Boolean(object.sublocality) && Boolean(object.administrative_area_level_2)) {
                        if (!city1) {
                            city1 = object.administrative_area_level_2.replace(/\s/g, '-')

                        }
                    }
                }
            }
            setStore((prevStore) => ({
                ...prevStore,
                "Store_Address": store_address,
                "Country": country1,
                "state": state1,
                "city": city1
            }));

        })
    }

    function mobile(e) {
        setStore({
            ...Store, "Stores_MobileNo": e
        });
    }
    return (
        <div>
            <span color='success' onClick={handleClickOpen}>
                <FaEdit size={22} color='#31B655' />

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
                        <form onSubmit={handleSubmit(Submit)}>
                            <div className='row login_form_feild'>
                                <div className='Add_Category center' style={{ marginTop: "2%" }}><h2> Edit Store  </h2>  </div>
                                <div className='col-sm-6 lg_ip_feild'>
                                    <label> Store Name: </label>
                                    <TextField type="text" placeholder='Store Name' id="outlined-basic" variant="outlined" name='Store_Name' value={Store.Store_Name} style={{ minWidth: 190, fontSize: 15 }}
                                        onChange={handleChange}
                                        sx={{
                                            width: '100%',
                                            '& .MuiOutlinedInput-root': {
                                                fontSize: '16px',

                                                '& fieldset': {
                                                    borderColor: 'black',
                                                },
                                            },
                                            '& .MuiOutlinedInput-input': {
                                                padding: ' 10px',
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
                                        inputRef={register({
                                            required: "Store Name is required*.",
                                            minLength: {
                                                value: 3,
                                                message: "Enter min 3 character"
                                            }
                                        })}
                                        helperText={errors.Store_Name?.message}
                                        error={Boolean(errors?.Store_Name)}

                                    />
                                </div>
                                <div className='col-sm-6 lg_ip_feild'>

                                    <label> City Name:</label>
                                    <TextField
                                        name='city'
                                        value={Store.city}
                                        disabled
                                        size='small'
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        sx={{
                                            width: '100%',
                                            '& .MuiOutlinedInput-root': {
                                                fontSize: '16px',

                                                '& fieldset': {
                                                    borderColor: 'black',
                                                },
                                            },
                                            '& .MuiOutlinedInput-input': {
                                                padding: ' 10px',
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
                                        {/* {
                                        Cities.map((Cities, index) => {
                                            return (
                                                <MenuItem key={index} value={Cities.id} style={{ fontSize: 15 }}>{Cities.CityName}</MenuItem>
                                            )
                                        })
                                    } */}

                                    </TextField>

                                </div>
                                <div className='col-sm-6 lg_ip_feild'>

                                    <label> State Name:</label>
                                    <TextField
                                        name='state'
                                        value={Store.state}
                                        disabled
                                        size='small'
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        sx={{
                                            width: '100%',
                                            '& .MuiOutlinedInput-root': {
                                                fontSize: '16px',

                                                '& fieldset': {
                                                    borderColor: 'black',
                                                },
                                            },
                                            '& .MuiOutlinedInput-input': {
                                                padding: ' 10px',
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
                                        {/* {
    Cities.map((Cities, index) => {
        return (
            <MenuItem key={index} value={Cities.id} style={{ fontSize: 15 }}>{Cities.CityName}</MenuItem>
        )
    })
} */}

                                    </TextField>

                                </div>
                                <div className='col-sm-6 lg_ip_feild'>

                                    <label> Country Name:</label>
                                    <TextField
                                        name='Country'
                                        value={Store.Country}
                                        disabled
                                        size='small'
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        sx={{
                                            width: '100%',
                                            '& .MuiOutlinedInput-root': {
                                                fontSize: '16px',

                                                '& fieldset': {
                                                    borderColor: 'black',
                                                },
                                            },
                                            '& .MuiOutlinedInput-input': {
                                                padding: ' 10px',
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
                                        {/* {
Cities.map((Cities, index) => {
return (
<MenuItem key={index} value={Cities.id} style={{ fontSize: 15 }}>{Cities.CityName}</MenuItem>
)
})
} */}

                                    </TextField>

                                </div>

                                <div className='col-sm-6 lg_ip_feild'>
                                    <label> Store Type:  </label>
                                    <Select
                                        name='Store_Type'
                                        value={Store.Store_Type}
                                        onChange={(e) => handleChange(e)}
                                        displayEmpty
                                        size='small'
                                        inputProps={{ 'aria-label': 'Without label' }} sx={{
                                            width: '100%',
                                            '& .MuiOutlinedInput-root': {
                                                fontSize: '16px',

                                                '& fieldset': {
                                                    borderColor: 'black',
                                                },
                                            },
                                            '& .MuiOutlinedInput-input': {
                                                padding: ' 10px',
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

                                        <MenuItem value={"dispensary"} style={{ fontSize: 15 }}>Dispensary</MenuItem>
                                        <MenuItem value={"delivery"} style={{ fontSize: 15 }}>Delivery</MenuItem>
                                        <MenuItem value={"Curbside Pickup"} style={{ fontSize: 15 }}>Curbside Pickup</MenuItem>


                                    </Select>
                                </div>
                                <div className='col-sm-6 lg_ip_feild'>
                                    <label> LicenceNo: </label>
                                    <TextField type="text" placeholder='Add LicenceNo' id="outlined-basic" variant="outlined" name='LicenceNo'
                                        value={Store.LicenceNo} style={{ minWidth: 190, fontSize: 15 }}
                                        sx={{
                                            width: '100%',
                                            '& .MuiOutlinedInput-root': {
                                                fontSize: '16px',

                                                '& fieldset': {
                                                    borderColor: 'black',
                                                },
                                            },
                                            '& .MuiOutlinedInput-input': {
                                                padding: ' 10px',
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
                                        inputRef={register({
                                            required: "Stores Licence No is required*.",
                                        })}
                                        helperText={errors.LicenceNo?.message}
                                        error={Boolean(errors?.LicenceNo)}

                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                                <div className='col-sm-6 lg_ip_feild'>
                                    <label>  Store Address:  </label>
                                    <Controller
                                        control={control}
                                        name="Store_Address"
                                        rules={{ required: { value: !Boolean(Store?.Store_Address), message: 'Invalid Address' } }}
                                        // value={"fgjfs"}
                                        // defaultValue={"ghgf"}
                                        render={(field) => (
                                            <Autocomplete
                                                freeSolo
                                                disableClearable
                                                inputValue={Store?.Store_Address}
                                                options={placePredictions}
                                                onChange={(event, value) => {
                                                    handleAddress(event, value);
                                                    field.onChange(value);
                                                }}
                                                renderOption={(props, option) => (
                                                    <li {...props} >
                                                        <IoLocationSharp />{option.description}
                                                    </li>
                                                )}
                                                getOptionLabel={(option) => option?.description }
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        onChange={(e) => {
                                                            setStore({
                                                                ...Store,
                                                                "Store_Address": e.target.value
                                                            });

                                                            getPlacePredictions({ input: e.target.value });
                                                        }}
                                                        type="text"
                                                        placeholder="Enter Location.."
                                                        helperText={errors.Store_Address?.message}
                                                        error={Boolean(errors?.Store_Address)}
                                                    />
                                                )}
                                            />
                                        )}
                                    />
                                </div>
                                <div className='col-sm-6 lg_ip_feild'>

                                    <label  >
                                        Store Website:
                                    </label>


                                    <TextField type="text" placeholder='Add  Store Website:' id="outlined-basic" variant="outlined" name='Stores_Website' value={Store.Stores_Website} style={{ minWidth: 190, fontSize: 15 }}
                                        onChange={handleChange} sx={{
                                            width: '100%',
                                            '& .MuiOutlinedInput-root': {
                                                fontSize: '16px',

                                                '& fieldset': {
                                                    borderColor: 'black',
                                                },
                                            },
                                            '& .MuiOutlinedInput-input': {
                                                padding: ' 10px',
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
                                        inputRef={register({
                                            required: "Stores Website is required*.",
                                            pattern: {
                                                value: new RegExp(
                                                    '^([a-zA-Z]+:\\/\\/)?' +
                                                    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
                                                    '((\\d{1,3}\\.){3}\\d{1,3}))' +
                                                    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
                                                    '(\\?[;&a-z\\d%_.~+=-]*)?' +
                                                    '(\\#[-a-z\\d_]*)?$',
                                                    'i'
                                                ),
                                                message: "Url in not valid"
                                            }
                                        })}
                                        helperText={errors.Stores_Website?.message}
                                        error={Boolean(errors?.Stores_Website)}

                                    />

                                </div>
                                <div className='col-sm-6 lg_ip_feild'>
                                    <label  >  Store MobileNo: </label>
                                    {/* <TextField type="text" placeholder='Add Store MobileNo:' id="outlined-basic" variant="outlined" name='Stores_MobileNo' value={Store.Stores_MobileNo} style={{ minWidth: 190, fontSize: 15 }}
                                        onChange={handleChange} sx={{
                                            width: '100%',
                                            '& .MuiOutlinedInput-root': {
                                                fontSize: '16px',

                                                '& fieldset': {
                                                    borderColor: 'black',
                                                },
                                            },
                                            '& .MuiOutlinedInput-input': {
                                                padding: ' 10px',
                                            },
                                            "& label": {
                                                fontSize: 13,
                                                color: "red",
                                                "&.Mui-focused": {
                                                    marginLeft: 0,
                                                    color: "red",
                                                }
                                            }
                                        }} /> */}
                                    <Controller
                                        render={({ name, onChange, value }) => (
                                            <MuiPhoneNumber
                                                name={name}
                                                value={value}
                                                onChange={((e) => {
                                                    onChange(e);
                                                    mobile(e);
                                                })}
                                                id="Stores_MobileNo"
                                                defaultCountry={"us"}
                                                style={{ width: "100%" }}
                                                margin="normal"
                                                error={Boolean(errors?.Stores_MobileNo)}
                                                helperText={errors.Stores_MobileNo?.message}
                                            />
                                        )}
                                        name="Stores_MobileNo"
                                        control={control}
                                        // onChange={mobile}
                                        defaultValue={Store.Stores_MobileNo}
                                        // ref={mobile}
                                        rules={
                                            {
                                                required: "Enter valid phone number",
                                                minLength: {
                                                    value: 10,
                                                    message: "Please enter minimum 10 digits"
                                                },
                                                maxLength: {
                                                    value: 20,
                                                    message: "Please enter valid mobile number"
                                                }
                                            }
                                        }
                                    />


                                </div>
                                <div className='col-sm-6 lg_ip_feild'>

                                    <label>  Status: </label>
                                    <Select
                                        name='Status'
                                        value={Store.Status}
                                        onChange={handleChange}
                                        size="small"
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }} sx={{
                                            width: '100%',
                                            '& .MuiOutlinedInput-root': {
                                                fontSize: '16px',

                                                '& fieldset': {
                                                    borderColor: 'black',
                                                },
                                            },
                                            '& .MuiOutlinedInput-input': {
                                                padding: ' 10px',
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
                                    <label htmlFor='storeeditimage' onDragOver={handleDragOver} onDrop={handleDrop} className='imagelabelstore'> <AiOutlineCloudUpload size={22} color='#31B655' /> Change Store Image</label>
                                    <div className=''>
                                        {
                                            image ?
                                                <>
                                                    <img src={URL.createObjectURL(image)} alt="" style={{ width: "120px", height: "110px" }} />
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
                                    <button className='topbutton' autoFocus type='submit' >
                                        Save changes
                                    </button>
                                </div>


                            </div>

                        </form>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ color: "#31B665" }} autoFocus onClick={handleClose}>
                        Exit
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}