import React, { useRef, useContext } from 'react';
import { TextField } from "@mui/material";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Cookies from 'universal-cookie';
import axios from "axios"
import { FormControl, } from "@material-ui/core";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import InputAdornment from '@mui/material/InputAdornment';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { IoLocationSharp } from "react-icons/io5"
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import Createcontext from "../../Hooks/Context/Context"
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import _ from 'lodash';
import useGoogle from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import { useForm, Controller } from "react-hook-form";
import { FormHelperText } from "@material-ui/core";
import MuiPhoneNumber from 'material-ui-phone-number';
import { useNavigate } from 'react-router-dom';
export default function Storepopup() {
    const { register, handleSubmit, errors, control, setError } = useForm();
    const { dispatch} = useContext(Createcontext)
    const Licence = useRef(null);
    const cookies = new Cookies();
    const inputRef = useRef(null);
    const token_data = cookies.get('Token_access')
    const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty());
    const [convertedContent, setConvertedContent] = React.useState(null);
    const [image, SetImage] = React.useState('');
    const [vendorlist, setvendorlist] = React.useState([])
    const [imageError, SetimageError] = React.useState(false)
    const [LicError, SetLicError] = React.useState(false)
    const [LicenceImage, SetLicenceImage] = React.useState('');
    const navigate =  useNavigate()
    //  let count =  0 
    //  React.useEffect(()=>{
    //     console.log(count === 0)
    //   if(count === 0){
    //     window.scroll({
    //         top: 0, // 50% of the viewport height
    //         left: 0,
    //         behavior: "smooth"
    //     });
    //     count =  1
    //     console.log(count , "runing count ")
    //   }
    //   console.log(count)
    //  })
    const {
        placesService,
        placePredictions,
        getPlacePredictions,
    } = useGoogle({
        debounce: 500,
        language: 'en',
        apiKey: 'AIzaSyBRchIzUTBZskwvoli9S0YxLdmklTcOicU'
    });

    const [error, seterror] = React.useState({
        Store_Name: "",
        Store_Address: "",
        Stores_MobileNo: "",
        LicenceNo: ""

    })
    const [massage, setmassage] = React.useState({
        Store_Name: "",
        Store_Address: "",
        Stores_MobileNo: "",
        LicenceNo: "",


    })

    const [Store, SetStore] = React.useState({
        Store_Name: "",
        Store_Type: "",
        LicenceNo: "",
        Store_Address: "",
        Stores_Website: "",
        Stores_MobileNo: "",
        Status: "Active",
        License_Type: "None",
        expires: '',
        created_by: '',
    });
    const handleChange = (event) => {

        const value = event.target.value;
        //     SetStore(prevStore => ({
        //         ...prevStore,
        //         Country_id: value
        //     }));
        //     getStatesOfCountry(value);
        // }
        // else if (event.target.name === "State_id") {
        //     SetStore(prevStore => ({
        //         ...prevStore,
        //         State_id: value
        //     }));
        //     var result = _.find(Stat, function(user) { return user.isoCode ===  value; });
        //     SetStore(prevStore => ({
        //         ...prevStore,
        //         State_id: value,
        //         storeStateName:result.name
        //     }));
        //     console.log(City.getCitiesOfState(result.countryCode,result.stateCode) , result.countryCode,result.isoCode, result)
        //     SetCity(City.getCitiesOfState(result.countryCode,result.isoCode))
        // }
        // else if (event.target.name === "city_id") {

        //     SetStore(prevStore => ({
        //         ...prevStore,
        //         StoreCity: value
        //     }));

        // }
        // else {

        // SetStore({
        //     ...Store, [event.target.name]: value
        // });
        SetStore(prevState => ({
            ...prevState,
            [event.target.name]: value
        }));
        setmassage("")
        seterror("")

    }
    const handleimage = (event) => {
        SetImage(event.target.files[0])
        SetimageError(false)
    };
    const licenceFileInput = () => {
        Licence.current.value = null;
        SetLicenceImage(null)
        SetLicError(true)
    };
    const Licenseimage = (event) => {
        SetLicenceImage(event.target.files[0])
        SetLicError(false)
    };
    React.useEffect(() => {
        let html = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(html);
    }, [editorState]);

    const resetFileInput = () => {
        inputRef.current.value = null;
        SetImage(null)
        SetimageError(true)
    };

    React.useEffect(() => {
        axios.get('https://api.cannabaze.com/AdminPanel/Get-AllVendorListApi/', {
            headers: {
                'Authorization': `Bearer ${token_data}`
            }

        }).then((res) => {
            setvendorlist(res.data)
        }).catch((error) => {
            console.trace(error)
        })


    }, [token_data]);

    const Submit = () => {

        if (image === "") {
            SetimageError(true)
            window.scroll({
                top: window.innerHeight * 0.4, // 50% of the viewport height
                left: 0,
                behavior: "smooth"
            });

        }
        else if (LicenceImage === "") {
            SetLicError(true)
        }
        else {
            const formdata = new FormData();
            formdata.append('Store_Name', Store.Store_Name);
            formdata.append('Store_Image', image);
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
            const config = {
                headers: { Authorization: `Bearer ${token_data}` }
            };
            axios.post(
                'https://api.cannabaze.com/AdminPanel/Add-Stores/',
                formdata,
                config
            ).then((response) => {
                dispatch({ type: 'api', api: true })
                navigate("/Store")
            }).catch(
                function (error) {
                    Boolean(error.response.data.error.Stores_MobileNo) && setError('Stores_MobileNo', { type: 'manual', message: 'Mobile number already exists' }); 
                    Boolean(error.response.data.error.Stores_MobileNo) && document.getElementById('Stores_MobileNo').focus();
                    Boolean(error.response.data.error.LicenceNo ) && setError('LicenceNo', { type: 'manual', message: 'LicenceNo number already exists' });
                    Boolean(error.response.data.error.LicenceNo) && document.getElementById('LicenceNo').focus();
                }
            )
        }

    };


    async function handlechnage(e, value) {
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
            SetStore((prevStore) => ({
                ...prevStore,
                "Store_Address": store_address,
                "Country": country1,
                "state": state1,
                "city": city1
            }));

        })
    }

//    console.log(Boolean(errors.License_Type) && document?.getElementById('License_Type')?.focus()  )

// 

    function mobile(e) {
        SetStore({
            ...Store, "Stores_MobileNo": e
        });
    }
    return (
        <div>
            <form onSubmit={handleSubmit(Submit)}>
                <div className='container'>
                    <div className='login_form_feild' >
                        <div className='lg_ip_feild Add_State Add_Category center'>
                            <h2>Store</h2>
                        </div>
                        <div className='lg_ip_feild'>
                            <label> Store Name:</label>
                            <TextField type="text" placeholder='Add  Store Name' id="outlined-basic" variant="outlined" name='Store_Name' value={Store.Store_Name}
                                onChange={(e) => handleChange(e)}
                                InputProps={{ startAdornment: <InputAdornment position="start"> </InputAdornment> }}
                                label={massage.Store_Name}
                                sx={{
                                    width: '100%',
                                    '& .MuiOutlinedInput-root': {
                                        fontSize: '16px',

                                        '& fieldset': {
                                            borderColor: error.Store_Name,
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
                        <div className='lg_ip_feild '>
                            <label> Store Type: </label>
                            <FormControl fullWidth error={Boolean(errors.Store_Type)}>
                                <Controller
                                    name="Store_Type"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: "Store Type is required",
                                        minLength: {
                                            value: 5,
                                            message: "Store Type must be at least 5 characters long"
                                        }
                                    }}
                                    render={(field) => (
                                        <>
                                            <Select
                                                {...field}
                                                value={field.value || ''}
                                                onChange={(e) => {
                                                    handleChange(e, e.target.value);
                                                    field.onChange(e.target.value);
                                                }}
                                                displayEmpty
                                                placeholder="Select Store Type"
                                                sx={{
                                                    width: '100%',
                                                    '& .MuiOutlinedInput-root': {
                                                        fontSize: '16px',
                                                        '& fieldset': {
                                                            borderColor: Boolean(errors.Store_Type) ? 'red' : 'default',
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
                                                <MenuItem value={"dispensary"} style={{ fontSize: 15 }}>Dispensary</MenuItem>
                                                <MenuItem value={"delivery"} style={{ fontSize: 15 }}>Delivery</MenuItem>
                                                <MenuItem value={"Curbside Pickup"} style={{ fontSize: 15 }}>Curbside Pickup</MenuItem>
                                            </Select>
                                            {errors.Store_Type && <FormHelperText error>{errors.Store_Type.message}</FormHelperText>}
                                        </>
                                    )}
                                />
                            </FormControl>
                        </div>
                        <div className='lg_ip_feild '>
                            <label>Store Address:</label>
                            <Controller
                                control={control}
                                name="Store_Address"
                                rules={{ required: { value: !Boolean(Store?.Store_Address), message: 'Invalid Address' } }}
                                render={(field) => (
                                    <Autocomplete
                                        freeSolo
                                        disableClearable
                                        options={placePredictions}

                                        onChange={(event, value) => {
                                            handlechnage(event, value);
                                            field.onChange(value);
                                        }}
                                        renderOption={(props, option) => (
                                            <li {...props} >
                                                <IoLocationSharp />{option.description}
                                            </li>
                                        )}
                                        getOptionLabel={(option) => option?.description || ""}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                onChange={(e) => {
                                                    SetStore({
                                                        ...Store,
                                                        "Store_Address": ""
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
                        <div className=' row  country_main_div'>
                            <div className="col-sm-4">
                                <div className="lg_ip_feild">
                                    <label>
                                        Country:
                                    </label>
                                    <TextField
                                        disabled={true}
                                        type="text" placeholder='Country' id="outlined-basic" variant="outlined" name='Store_Name' value={Store.Country}
                                        sx={{
                                            width: '100%',
                                            '& .MuiOutlinedInput-root': {
                                                fontSize: '16px',

                                                // '& fieldset': {
                                                //     borderColor: error.Store_Name,
                                                // },
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
                                    />
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="lg_ip_feild">
                                    <label>   State: </label>
                                    <TextField
                                        disabled={true}
                                        type="text" placeholder='State' id="outlined-basic" variant="outlined" name='Store_Name' value={Store.state}
                                        sx={{
                                            width: '100%',
                                            '& .MuiOutlinedInput-root': {
                                                fontSize: '16px',

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
                                    />
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="lg_ip_feild">
                                    <label > City :</label>
                                    <TextField
                                        disabled={true}
                                        type="text" placeholder='City' id="outlined-basic" variant="outlined" name='Store_Name' value={Store.city}
                                        sx={{
                                            width: '100%',
                                            '& .MuiOutlinedInput-root': {
                                                fontSize: '16px'
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
                                    />


                                </div>
                            </div>

                        </div>

                        <div className="row">
                            <div className="col-sm-6">
                                <div className='lg_ip_feild    '>

                                    <label > Store Website: </label>
                                    <TextField type="text" placeholder='Add Store Website:' id="outlined-basic" variant="outlined" name='Stores_Website' value={Store.Stores_Website} style={{ minWidth: 120, fontSize: 15 }}
                                        onChange={(e) => handleChange(e)}
                                        InputProps={{ style: { fontSize: 14 } }}
                                        sx={{
                                            width: '100%',
                                            '& .MuiOutlinedInput-root': {
                                                fontSize: '16px',

                                                '& fieldset': {
                                                    // borderColor: error.Store_Name,
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
                                            },
                                            '& .MuiSelect-select': {
                                                fontSize: '16px',
                                                color: 'rgb(133, 133, 133)',
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
                            </div>
                            <div className="col-sm-6">
                                <div className='lg_ip_feild'>
                                    <label>Store MobileNo:</label>
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
                                        defaultValue=""
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
                            </div>
                        </div>


                        <div className='lg_ip_feild'>

                            <label> Store Description:   </label>
                            <Box
                                sx={{
                                    "& .rdw-editor-toolbar": {
                                        width: "100%",
                                        border: "1px solid #c4c4c4",

                                    },
                                    "@media(max-width:600px)": {
                                        "& .rdw-editor-toolbar": {
                                            width: "100%",

                                        },
                                        "& .rdw-editor-main": {
                                            width: "100%",

                                        },
                                    },
                                    ".rdw-editor-main": {
                                        background: "",
                                        width: "100%",
                                        border: "1px solid #c4c4c4",
                                        padding: "3px"
                                    },



                                }}
                            >

                                <Editor
                                    editorState={editorState}
                                    onEditorStateChange={setEditorState}
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    editorClassName="editorClassName"
                                />
                            </Box>

                        </div>

                        <div className='lg_ip_feild'>
                            <label >
                                Store Image:
                            </label>
                            <input type="file" placeholder='Add Store Image:' id="file" ref={inputRef} className="file" variant="outlined" style={{ minWidth: 180, fontSize: 15 }}
                                onChange={handleimage} />

                            <div className={'imagefeild_popus img_store '} style={{ border: imageError && "2px dashed red" }}>

                                {
                                    image ? <div className='center'  >
                                        <img src={URL.createObjectURL(image)} alt="" className='center' style={{ width: "90px", height: "81px", borderRadius: "10px" }} />
                                        <IconButton onClick={resetFileInput} style={{ position: " absolute ", top: "-20px" }}>
                                            <CloseIcon />
                                        </IconButton>
                                    </div> :
                                        <div>
                                            <label htmlFor="file"  >
                                                <AiOutlineCloudUpload color='#9e9b9b' style={{ fontSize: "50px", borderradius: "66px" }} ></AiOutlineCloudUpload>
                                            </label>
                                        </div>
                                }



                            </div>
                        </div>

                        <div className=' Add_State Add_Category '>
                            <h2> Licence Information </h2>
                        </div>
                        <div className='lg_ip_feild'>

                            <label  >
                                Licence Doc:
                            </label>
                            <TextField  type="text" placeholder='Add LicenceNo' id="LicenceNo" variant="outlined"  name='LicenceNo' value={Store.LicenceNo} style={{ minWidth: "90%", fontSize: 15 }}
                                onChange={handleChange}
                                InputProps={{ startAdornment: <InputAdornment position="start"> </InputAdornment>, style: { fontSize: 14 } }}
                                label={massage.LicenceNo}
                                sx={{
                                    width: '100%',
                                    '& .MuiOutlinedInput-root': {
                                        fontSize: '16px',

                                        '& fieldset': {
                                            borderColor: error.Store_Name,
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
                                    },
                                    '& .MuiSelect-select': {
                                        fontSize: '16px',
                                        color: 'rgb(133, 133, 133)',
                                    }

                                }}
                                inputRef={register({
                                    required: "Stores Licence No is required*.",
                                })}
                                helperText={errors.LicenceNo?.message}
                                error={Boolean(errors?.LicenceNo)}

                            />
                        </div>
                        <div className=' row '>
                            <div className="col-sm-6 lg_ip_feild">

                                <label>
                                    Licence Type:
                                </label>
                                <FormControl fullWidth error={Boolean(errors.License_Type)}>
                                    <Controller
                                        name="License_Type"
                              
                                        control={control}
                                        defaultValue=""
                                        rules={{
                                            required: "Store License Type is required",
                                        }}
                                        render={(field) => (
                                            <>
                                                <Select
                                                    {...field}
                                                    value={field.value || ''}
                                                    onChange={(e) => {
                                                        handleChange(e, e.target.value);
                                                        field.onChange(e.target.value);
                                                    }}
                                                    
                                                    placeholder="Select Store Type"
                                                    sx={{
                                                        width: '100%',
                                                        '& .MuiOutlinedInput-root': {
                                                            fontSize: '16px',
                                                            '& fieldset': {
                                                                borderColor: "red 1px solid",
                                                                border: "red 1px solid"
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
                                                            border: Boolean(errors.License_Type) ? "1px solid  red" : "1px solid #f4f4f4"
                                                        },
                                                        "&.Mui-focused": {
                                                            "& .MuiOutlinedInput-notchedOutline": {
                                                                borderColor: '#31B655 !important'
                                                            }
                                                        }
                                                    }}
                                                    id="License_Type"
                                                >
                                                    <MenuItem value={"None"} style={{ fontSize: 15 }}>None</MenuItem>
                                                    <MenuItem value={"Adult-Use Cultivation"} style={{ fontSize: 15 }}>Adult-Use Cultivation</MenuItem>
                                                    <MenuItem value={"Adult-Use Nonstorefront"} style={{ fontSize: 15 }}>Adult-Use Mfg</MenuItem>
                                                    <MenuItem value={"Adult-Use Retail"} style={{ fontSize: 15 }}>Adult-Use Retail</MenuItem>
                                                    <MenuItem value={"Distributor"} style={{ fontSize: 15 }}>Distributor</MenuItem>
                                                    <MenuItem value={"Event"} style={{ fontSize: 15 }}>Event</MenuItem>
                                                    <MenuItem value={"Medical Cultivation"} style={{ fontSize: 15 }}>Medical Cultivation</MenuItem>
                                                    <MenuItem value={"Medical Mfg"} style={{ fontSize: 15 }}>Medical Mfg</MenuItem>
                                                    <MenuItem value={"Medical Nonstorefront"} style={{ fontSize: 15 }}>Medical Nonstorefront</MenuItem>
                                                    <MenuItem value={"Medical Retail"} style={{ fontSize: 15 }}>Medical Retail</MenuItem>
                                                    <MenuItem value={"Microbusiness"} style={{ fontSize: 15 }}>Microbusiness</MenuItem>
                                                    <MenuItem value={"Testing Lab"} style={{ fontSize: 15 }}>Testing Lab</MenuItem>
                                                </Select>
                                                {errors.License_Type && <FormHelperText error>{errors.License_Type.message}</FormHelperText>}
                                            </>
                                        )}
                                    />
                                </FormControl>
                            </div>
                            <div className="col-sm-6 lg_ip_feild">
                                <label>  Expires:  </label>
                                <TextField
                                    id="date"
                                    value={Store.expires}
                                    name="expires"
                                    onChange={handleChange}
                                    type="date"
                                    sx={{
                                        width: '100%',
                                        '& .MuiOutlinedInput-root': {
                                            fontSize: '16px',

                                            '& fieldset': {
                                                borderColor: error.Store_Name,
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
                                        },
                                        '& .MuiSelect-select': {
                                            fontSize: '16px',
                                            color: 'rgb(133, 133, 133)',
                                        }

                                    }}

                                    InputLabelProps={{
                                        shrink: true,
                                    }}

                                    inputRef={register({
                                        required: "Stores expires is required*.",
                                    })}
                                    helperText={errors.expires?.message}
                                    error={Boolean(errors?.expires)}

                                ></TextField>
                            </div>
                        </div>

                        <div className='lg_ip_feild'>

                            <label>Licence Image:  </label>
                            <input type="file" placeholder='Add Store Image:' id="Licence" ref={Licence} className="file" variant="outlined" style={{ minWidth: 190, fontSize: 15 }}
                                onChange={Licenseimage} />

                            <div className={'imagefeild_popus ' + ("img_store")} style={{ border: LicError && "2px dashed red" }} >


                                {
                                    LicenceImage ?
                                        <div className='uploadedImg'>
                                            <img src={URL.createObjectURL(LicenceImage)} alt="" className=' ' style={{ width: "90px", height: "81px", borderRadius: "10px" }} />
                                            <span   >
                                                <IconButton onClick={licenceFileInput} style={{ position: " relative ", top: "-20px" }}>
                                                    <CloseIcon />
                                                </IconButton>
                                            </span>
                                        </div>
                                        :
                                        <label htmlFor="Licence">
                                            <AiOutlineCloudUpload color='#9e9b9b' style={{ fontSize: "50px", borderradius: "66px", color: "#9e9b9b", }} ></AiOutlineCloudUpload >
                                        </label>
                                }

                                <p className="file-name"></p>
                            </div>
                        </div>
                        <div className='lg_ip_feild'>
                            <label>  Status:   </label>
                            <Select
                                name='Status'
                                value={Store.Status}
                                onChange={handleChange}
                                size="small"
                                inputProps={{ 'aria-label': 'Without label' }} sx={{
                                    width: '100%',
                                    '& .MuiOutlinedInput-root': {
                                        fontSize: '16px',

                                        '& fieldset': {
                                            borderColor: error.Store_Name,
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
                                    },
                                    '& .MuiSelect-select': {
                                        fontSize: '16px',
                                        color: 'rgb(133, 133, 133)',
                                    }

                                }}
                            >

                                <MenuItem value={"Active"} style={{ fontSize: 15 }}>Active</MenuItem>
                                <MenuItem value={"Hide"} style={{ fontSize: 15 }}>Hide</MenuItem>

                            </Select>
                        </div>
                        <div className="lg_ip_feild">
                            <label>Vendor Panel:</label>
                            <FormControl fullWidth error={Boolean(errors.License_Type)}>
                                <Controller
                                    name="created_by"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: "Store is required",

                                    }}
                                    render={(field) => (
                                        <>
                                            <Select
                                                {...field}
                                                value={field.value || ''}
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    field.onChange(e.target.value);
                                                }}
                                                displayEmpty
                                                placeholder="Select Store Type"
                                                sx={{
                                                    width: '100%',
                                                    '& .MuiOutlinedInput-root': {
                                                        fontSize: '16px',
                                                        '& fieldset': {
                                                            borderColor: Boolean(errors.License_Type) ? 'red' : 'default',
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
                                            {errors.License_Type && <FormHelperText error>{errors.License_Type.message}</FormHelperText>}
                                        </>
                                    )}
                                />
                            </FormControl>



                        </div>

                        <div className='lg_ip_feild center top' >
                            <button className='topbutton' autoFocus >
                                Add Store
                            </button>
                        </div>
                    </div>
                </div>

            </form>
        </div >
    );
}












{/* <TextField type="text" placeholder='Add Store Address:' id="outlined-basic" variant="outlined" name='Store_Address' value={Store.Store_Address} style={{ minWidth: "90%", fontSize: 15 }}
                                        onChange={handleChange}
                                        InputProps={{ startAdornment: <InputAdornment position="start"> </InputAdornment>, style: { fontSize: 14 } }}
                                        label={massage.Store_Address}
                                        sx={{
                                            width: '100%',
                                            '& .MuiOutlinedInput-root': {
                                                fontSize: '16px',

                                                '& fieldset': {
                                                    borderColor: error.Store_Name,
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
                                            },
                                            '& .MuiSelect-select': {
                                                fontSize: '16px',
                                                color: 'rgb(133, 133, 133)',
                                            }

                                        }}
                                    /> */}

{/* <Controller
                                        control={control}
                                        name="Store_Address"
                                        rules={{ required: { value: !Boolean(Store?.Store_Address), message: 'Invalid Address' } }}
                                        render={(field) => (
                                            <Autocomplete
                                                freeSolo
                                                disableClearable
                                                open={Autocompleteget}
                                                onOpen={() => {
                                                    setAutocomplete(true);
                                                }}
                                                onClose={() => {
                                                    setAutocomplete(false);
                                                }}

                                                options={placePredictions}
                                                inputValue={Store.Store_Address}
                                                // onChange={(event, value) => {
                                                //     handlechnage(event, value);
                                                //     field.onChange(event)

                                                // }}
                                                onInputChange={(event, value) => {
                                                    SetStore({
                                                        ...Store,
                                                        "Store_Address": value
                                                    });
                                                    getPlacePredictions({ input: value });
                                                    field.onChange(value);
                                                }}
                                                renderOption={(props, option) => (
                                                    <li {...props}>
                                                        <IoLocationSharp  ></IoLocationSharp> {option.description}
                                                    </li>
                                                )}
                                                getOptionLabel={(option) => option?.description || ""}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        {...field}
                                                        fullWidth
                                                        value={Store.Store_Address}
                                                        sx={{
                                                            width: '100%',
                                                            '& .MuiOutlinedInput-root': {
                                                                fontSize: '16px',

                                                                '& fieldset': {
                                                                    borderColor: error.Store_Name,
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
                                                            },
                                                            '& .MuiSelect-select': {
                                                                fontSize: '16px',
                                                                color: 'rgb(133, 133, 133)',
                                                            }

                                                        }}
                                                        type="text"
                                                        placeholder="Enter Location.."
                                                        onChange={(e) => {
                                                            SetStore({
                                                                ...Store, "Store_Address": e.target.value
                                                            });
                                                            getPlacePredictions({ input: e.target.value });
                                                            field.onChange(e)
                                                        }}
                                                        // InputProps={{
                                                        //     ...params.InputProps,
                                                        //     startAdornment: (
                                                        //         <>
                                                        //             {/* <InputAdornment position="start">
                                                        //                 <IoLocationSharp />
                                                        //             </InputAdornment> */}
{/* {params.InputProps.startAdornment} */ }
{/* //         </>
                                                        //     ),
                                                        //     endAdornment: (
                                                        //         // <IconButton>
                                                        //         //     {/* <MdOutlineMyLocation color="inherit" size={16} style={{ cursor: 'pointer' }} /> */}
{/* //         // </IconButton>
                                                        //     ),
                                                        // }}
                                                        helperText={errors.Store_Address?.message}
                                                        error={Boolean(errors?.Store_Address)} */}
{/* />
                                                )}
                                            />
                                        )}
                                    /> */}
