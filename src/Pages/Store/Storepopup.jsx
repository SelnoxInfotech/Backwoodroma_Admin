import React, { useRef, useContext } from 'react';
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
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import InputAdornment from '@mui/material/InputAdornment';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import countryList from 'react-select-country-list'
import Createcontext from "../../Hooks/Context/Context"
import Box from '@mui/material/Box';
import { Country, State ,City } from 'country-state-city';
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


export default function Storepopup() {
    const options = React.useMemo(() => countryList().getData(), [])
    const { dispatch } = useContext(Createcontext)
    const Licence = useRef(null);
    const cookies = new Cookies();
    const inputRef = useRef(null);
    const token_data = cookies.get('Token_access')
    const [open, setOpen] = React.useState(false);
    const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty());
    const [convertedContent, setConvertedContent] = React.useState(null);
    const [image, SetImage] = React.useState('');
    const [vendorlist, setvendorlist] = React.useState([])
    const [Stat, SetState] = React.useState([]);
    const [City, SetCity] = React.useState([]);
    const [LicenceImage, SetLicenceImage] = React.useState('');

    const [error, seterror] = React.useState({
        Store_Name: "",
        Store_Address: "",
        Stores_MobileNo: "",
        LicenceNo: ""

    })
    // console.log(options)
    const [massage, setmassage] = React.useState({
        Store_Name: "",
        Store_Address: "",
        Stores_MobileNo: "",
        LicenceNo: "",


    })

    function tomorrowdate() {
        var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
        var day = String(currentDate.getDate()).padStart(2, '0')
        var month = String(currentDate.getMonth() + 1).padStart(2, '0')

        var year = currentDate.getFullYear()
        return `${year}-${month}-${day}`
    }

    const [Store, SetStore] = React.useState({
        Store_Name: "",
        city_id: '',
        Store_Type: "brand",
        LicenceNo: "",
        Store_Address: "",
        Stores_Website: "",
        Stores_MobileNo: "",
        Status: "Active",
        Country_id: "",
        State_id: "",
        City_id: "",
        License_Type: "None",
        expires: '',
        created_by: ''
    });
    function getStatesOfCountry(countryName) {
        // Find the country object by name
        console.log("asdkjadas")
        const country = Country.getCountryByCode(countryName);

        if (!country) {
            return [];
        }
        // SetStore({
        //     ...Store, ["Country_Name"]: country.name
        // });
        SetStore(prevStore => ({
            ...prevStore,
            Country_Name: country.name
        }));
        const states = State.getStatesOfCountry(country.isoCode);
        SetState(states)
        return states;
    }
    const handleChange = (event) => {
        const value = event.target.value;
          console.log(value)
        if (event.target.name === "Country_id") {
            SetStore(prevStore => ({
                ...prevStore,
                Country_id: value
            }));
            getStatesOfCountry(value);
        }
        else if (event.target.name === "State_id") {
            SetStore(prevStore => ({
                ...prevStore,
                State_id: value
            }));
        }
        else {

            SetStore({
                ...Store, [event.target.name]: value
            });
            setmassage("")
            seterror("")

        }

    };
   


    const handleimage = (event) => {
        SetImage(event.target.files[0])
    };
    const licenceFileInput = () => {
        Licence.current.value = null;
        SetLicenceImage(null)
    };
    const Licenseimage = (event) => {
        SetLicenceImage(event.target.files[0])
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        let html = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(html);
    }, [editorState]);

    const resetFileInput = () => {
        inputRef.current.value = null;
        SetImage(null)
    };

    React.useEffect(() => {

        axios("https://api.cannabaze.com/AdminPanel/ActiveCountry/", {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }

        }).then(response => {


            // Setcountry(response.data.data)
        })
        if (Store.Country_id !== "") {
            axios.get(`https://api.cannabaze.com/AdminPanel/FilterStatesByCountry/${Store.Country_id}`, {

                headers: {
                    'Authorization': `Bearer ${token_data}`
                }

            }).then(response => {
                SetState(response.data.data)
                SetStore(Store => ({ ...Store, State_id: response.data.data[0].id }))
            })
        }

        if (Store.State_id !== "") {
            axios.get(`https://api.cannabaze.com/AdminPanel/FilterCitiesByStates/${Store.State_id}`, {

                headers: {
                    'Authorization': `Bearer ${token_data}`
                }

            }).then(response => {
                SetCity(response.data.data)
                SetStore(Store => ({ ...Store, city_id: response.data.data[0].id }))
            })
        }
        axios.get('https://api.cannabaze.com/AdminPanel/Get-AllVendor/', {
            headers: {
                'Authorization': `Bearer ${token_data}`
            }

        }).then((res) => {
            setvendorlist(res.data.data)
        }).catch((error) => {
            console.trace(error)
        })


    }, [token_data, Store.Country_id, Store.State_id]);



    const formdata = new FormData();
    formdata.append('Store_Name', Store.Store_Name);
    formdata.append('Store_Image', image);
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

        const config = {
            headers: { Authorization: `Bearer ${token_data}` }
        };
        axios.post(
            'https://api.cannabaze.com/AdminPanel/Add-Stores/',
            formdata,
            config
        ).then((response) => {
            setOpen(false);
            dispatch({ type: 'api', api: true })
        }).catch(
            function (error) {

                if (error.response.data.error) {
                    setmassage({ LicenceNo: error.response.data.error.LicenceNo[0] })
                    seterror({ LicenceNo: "red" })
                }
                if (error.response.data.error) {
                    setmassage({ Stores_MobileNo: error.response.data.error.Stores_MobileNo[0] })
                    seterror({ Stores_MobileNo: "red" })
                }
                for (const [key, value] of Object.entries(error.response.data)) {
                    switch (key) {
                        case "Store_Name":
                            setmassage({ Store_Name: value })
                            seterror({ Store_Name: "red" })
                            break
                        case "Store_Address":
                            setmassage({ Store_Address: value })
                            seterror({ Store_Address: "red" })
                            break
                        case "Stores_MobileNo":
                            setmassage({ Stores_MobileNo: value })
                            seterror({ Stores_MobileNo: "red" })
                            break
                        case "LicenceNo":
                            setmassage({ LicenceNo: value })
                            seterror({ LicenceNo: "red" })
                            break
                        default:
                            return 'foo';
                    }
                }
            }
        )
    };
    //    console.log(<CountrySelect></CountrySelect>)

  console.log(Store.State_id ,Stat)
    return (
        <div>
            <button onClick={handleClickOpen} className='topbutton'>+ Add Store </button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="Customizeed-dialog-title"
                open={open}
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "800px",
                            height: "100%",
                            maxWidth: "none",
                            border: "1px solid #31B665",
                            borderRadius: "15px",
                            overflowY: "hidden",
                        },
                    },
                }}
            >
                <BootstrapDialogTitle id="Customizeed-dialog-title" onClose={handleClose}>
                    Modal title
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <div className='container-fluid'>
                        <div className='login_form_feild'>



                            <div className='lg_ip_feild Add_State Add_Category center'>
                                <h2> Store  </h2>
                            </div>
                            <div className='lg_ip_feild'>
                                <label  >
                                    Store Name:
                                </label>


                                <TextField type="text" placeholder='Add  Store Name' id="outlined-basic" variant="outlined" name='Store_Name' value={Store.Store_Name}
                                    onChange={handleChange}
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
                                />

                            </div>
                            <div className='lg_ip_feild '>

                                <label> Store Type: </label>
                                <Select
                                    name='Store_Type'
                                    value={Store.Store_Type}
                                    onChange={handleChange}
                                    inputProps={{ 'aria-label': 'Without label' }}
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
                                >
                                    <MenuItem value={"cbd store"} style={{ fontSize: 15 }}>CBD Store</MenuItem>
                                    <MenuItem value={"brand"} style={{ fontSize: 15 }}>Brand</MenuItem>
                                    <MenuItem value={"dispensary"} style={{ fontSize: 15 }}>Dispensary</MenuItem>
                                    <MenuItem value={"delivery"} style={{ fontSize: 15 }}>Delivery</MenuItem>
                                    <MenuItem value={"doctor"} style={{ fontSize: 15 }}>Doctor</MenuItem>


                                </Select>

                            </div>
                            <div className=' row  country_main_div'>
                                <div className="col-sm-4">
                                    <div className="lg_ip_feild">
                                        <label>
                                            Country:
                                        </label>
                                        <Select

                                            name='Country_id'
                                            value={Store.Country_id}
                                            onChange={handleChange}
                                            displayEmpty

                                            fullWidth
                                            inputProps={{ 'aria-label': 'Without label' }} style={{ fontSize: 15 }}
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
                                        >
                                            <MenuItem disabled value="" style={{ fontSize: 15 }}>
                                                <em>Select ountry</em>
                                            </MenuItem>
                                            {
                                                countryList().getData().map((data, index) => {
                                                    return (
                                                        <MenuItem key={index} value={data.value} style={{ fontSize: 15 }}>{data.label}</MenuItem>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="lg_ip_feild">
                                        <label>   State: </label>
                                        <Select

                                            name='State_id'
                                            value={Store.State_id}
                                            onChange={handleChange}
                                            displayEmpty

                                            fullWidth
                                            inputProps={{ 'aria-label': 'Without label' }} style={{ fontSize: 15 }}
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
                                        >
                                            <MenuItem disabled value="" style={{ fontSize: 15 }}>
                                                <em>Select</em>
                                            </MenuItem>

                                            {
                                                Stat.map((data, index) => {

                                                    return (
                                                        <MenuItem key={index} value={data.name} style={{ fontSize: 15 }}>{data.name}</MenuItem>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="lg_ip_feild">
                                        <label > City :</label>
                                        <Select
                                            name='city_id'
                                            value={Store.city_id}
                                            onChange={handleChange}
                                            displayEmpty
                                            fullWidth
                                            inputProps={{ 'aria-label': 'Without label' }} style={{ minWidth: "60%", fontSize: 15 }}
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
                                        >
                                            <MenuItem disabled value="" style={{ fontSize: 15 }}>
                                                <em>Select City</em>
                                            </MenuItem>

                                            {
                                                City.map((data, index) => {

                                                    return (
                                                        <MenuItem key={index} value={data.id} style={{ fontSize: 15 }}>{data.CityName}</MenuItem>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </div>
                                </div>

                            </div>


                            <div className='lg_ip_feild '>
                                <label >   Store Address:  </label>
                                <TextField type="text" placeholder='Add Store Address:' id="outlined-basic" variant="outlined" name='Store_Address' value={Store.Store_Address} style={{ minWidth: "90%", fontSize: 15 }}
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
                                />

                            </div>


                            <div className="row">
                                <div className="col-sm-6">
                                    <div className='lg_ip_feild    '>

                                        <label > Store Website: </label>
                                        <TextField type="text" placeholder='Add Store Website:' id="outlined-basic" variant="outlined" name='Stores_Website' value={Store.Stores_Website} style={{ minWidth: 120, fontSize: 15 }}
                                            onChange={handleChange}
                                            InputProps={{ style: { fontSize: 14 } }}
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
                                        />

                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className='lg_ip_feild'>
                                        <label >   Store MobileNo:   </label>
                                        <TextField type="text" placeholder='Add Store MobileNo:' id="outlined-basic" variant="outlined" name='Stores_MobileNo' value={Store.Stores_MobileNo} style={{ minWidth: 120 }}
                                            onChange={handleChange}
                                            InputProps={{ startAdornment: <InputAdornment position="start"> </InputAdornment>, style: { fontSize: 14 } }}
                                            label={massage.Stores_MobileNo}
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

                                <div className={'imagefeild_popus ' + (image ? null : "img_store")}>

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
                                <TextField type="text" placeholder='Add LicenceNo' id="outlined-basic" variant="outlined" name='LicenceNo' value={Store.LicenceNo} style={{ minWidth: "90%", fontSize: 15 }}
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
                                />
                            </div>
                            <div className=' row '>
                                <div className="col-sm-6 lg_ip_feild">

                                    <label>
                                        Licence Type:
                                    </label>
                                    <Select
                                        name='License_Type'
                                        value={Store.License_Type}
                                        onChange={handleChange}

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
                                        InputProps={{ inputProps: { min: tomorrowdate() } }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    ></TextField>
                                </div>
                            </div>

                            <div className='lg_ip_feild'>

                                <label>Licence Image:  </label>
                                <input type="file" placeholder='Add Store Image:' id="Licence" ref={Licence} className="file" variant="outlined" style={{ minWidth: 190, fontSize: 15 }}
                                    onChange={Licenseimage} />

                                <div className={'imagefeild_popus ' + (image ? null : "img_store")} >


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
                                <label>   Vendor Panel: </label>
                                <Select

                                    name='created_by'
                                    value={Store.created_by}
                                    onChange={handleChange}
                                    displayEmpty

                                    fullWidth
                                    inputProps={{ 'aria-label': 'Without label' }} style={{ fontSize: 15 }}
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
                            </div>

                            <div className='lg_ip_feild center top' >
                                <button className='topbutton' autoFocus onClick={Submit} >
                                    Add Store
                                </button>
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ color: "#31B665", fontSize: '18px' }} autoFocus onClick={handleClose}>
                        Exit
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div >
    );
}