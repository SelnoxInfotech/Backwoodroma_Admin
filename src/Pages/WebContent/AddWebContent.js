import React, { useEffect, useState } from 'react'
import { SectionCard } from '../../molecules/SectionCard/Index'
import { SlSocialDropbox } from "react-icons/sl";
import Box from '@mui/material/Box';
import Editortoolbar from "../../Components/Editer/Editer"
import { FaTrashAlt } from "react-icons/fa";
import { Country, State, City } from 'country-state-city';
import axios from "axios";
import Cookies from 'universal-cookie';
import { useForm, Controller } from "react-hook-form";
import _ from 'lodash';
import { FormHelperText } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './Webcontent.css'
import TextField from '@mui/material/TextField';
import useStyles from '../../Style';
import { useSnackbar } from 'notistack';
import { Link, useNavigate } from 'react-router-dom';
const WebContent = () => {
    const cookies = new Cookies();
    const Navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar();
    const token_data = cookies.get('Token_access')
    const { register, handleSubmit, errors, control, setError , clearErrors } = useForm();
    const [country, setcontary] = React.useState(Country.getAllCountries());
    const [isLoggedIn, setLoading] = useState(false);
    const [editer , setediter] =  React.useState(false)
    const [data, Setdata] = React.useState({
        Type: "",
        Country: "",
        State: "",
        City: "",
        Title: ""
    });
    const [Content, SetDescription] = React.useState(``);
    const [city, setcity] = React.useState([]);
    const [state, setstate] = React.useState(() => {
        return [];
    });

    React.useEffect(()=>{
        Content !== "" && setediter(false)
    },[Content])
    const classes = useStyles()
    const [isfaq, setIsaq] = useState(false)
    const [Faq, setFaq] = React.useState([{
        title: '',
        answer: ''
    }]);
    const handleChange = (event) => {
        if (event.target.name === "Country") {

            const find = _.find(country, function (o) { return event.target.value === o.isoCode });
            Setdata(prevState => ({
                ...prevState,
                "Country": find.name,
                "State": "",
                "City": ""
            }));
            setstate(State.getStatesOfCountry(event.target.value))
            clearErrors('Country')
            clearErrors('State')
            clearErrors('City')
        }
        else if (event.target.name === "State") {
            const statefind = _.find(state, function (o) { return event.target.value === o.isoCode });
            Setdata(prevState => ({
                ...prevState,
                "State": statefind.name
            }));
            setcity(City.getCitiesOfState(statefind.countryCode, statefind.isoCode))
            clearErrors('Country')
            clearErrors('State')
            clearErrors('City')
        }
        else if (event.target.name === "City") {
            Setdata(prevState => ({
                ...prevState,
                "City": event.target.value
            }));
            clearErrors('Country')
            clearErrors('State')
            clearErrors('City')
        }
        else {
            Setdata(prevState => ({
                ...prevState,
                [event.target.name]: event.target.value
            }));
        }
    };
    const questionchange = (e, index) => {
        Faq[index].title = e.target.value;
        setFaq([...Faq])
    }
    const Answerchange = (e, index) => {
        Faq[index].answer = e.target.value;
        setFaq([...Faq])
    }
    const removefaqbox = (indx) => {
        let a = Faq.filter((item, index) => {
            return index !== indx
        })
        setFaq(a)
    }
    function Submit() {
        const config = {
            headers: { Authorization: `Bearer ${token_data}` }
        };
        const combinedData = {
            ...data,
            Content,
            Faq
        };

       if( Content !== "") {
        setLoading(true)
        axios.post(
            `https://api.cannabaze.com/AdminPanel/Add-Webpagedescription/`,
            combinedData,
            config
        ).then(() => {
            enqueueSnackbar('Web Content success !', { variant: 'success' });
            Navigate("/webcontent")
            setLoading(false)
        }).catch((error) => {
            setLoading(false)
            if (error.response.data.Country) {
                setError('Country', { type: 'manual', message: 'already exists' })
                const countryField = document.getElementById('Country');
                if (countryField) {
                    countryField.scrollIntoView({ behavior: 'smooth' });
                    countryField.focus();
                }
            }
            else if (error.response.data.State) {
               
                setError('State', { type: 'manual', message: 'already exists' })
                const countryField = document.getElementById('State');
                if (countryField) {
                    countryField.scrollIntoView({ behavior: 'smooth' });
                    countryField.focus();
                }
            }
            else if (error.response.data.City) {
               
                setError('City', { type: 'manual', message: 'already exists' })
                const countryField = document.getElementById('City');
                if (countryField) {
                    countryField.scrollIntoView({ behavior: 'smooth' });
                    countryField.focus();
                }
            }
        })
       }
    
       else{
        setediter(true)
       }
    }
    return (
        <SectionCard >
            <div className='col-12 Add_Category m-2  mb-3 px-4'>
                <h2 className='pagetitle '> <SlSocialDropbox color='#31B655' size={25} />  Add Content  </h2>

            </div>
            <div className='col-12 '>

                <form onSubmit={handleSubmit(Submit)}>
                    <div className='webcontentform'>

                        <div className='row'>
                            <div className='col-lg-3 col-md-6'>
                                <label className='label_faq'>Type </label>
                                <Box >
                                    <FormControl fullWidth error={Boolean(errors?.Type)}>
                                        <Controller
                                            name="Type"
                                            control={control}
                                            rules={{ required: "Type is required", }}
                                            defaultValue={data.Type || ''}
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
                                                                    borderColor: Boolean(errors.Type) ? 'red' : 'default',
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
                                                    </Select>
                                                    {errors.Type && <FormHelperText error>{errors.Type.message}</FormHelperText>}
                                                </>
                                            )}
                                        />
                                    </FormControl>
                                </Box>
                            </div>
                            <div className='col-lg-3 col-md-6'>
                                <label className='label_faq'> Country</label>
                                <Box >

                                    <FormControl fullWidth error={Boolean(errors?.Country)}>
                                        <Controller
                                            name="Country"
                                            id="Country"
                                            control={control}
                                            rules={{
                                                required: "Country is required",

                                            }}
                                            defaultValue={_.find(country, function (o) { return data.Country === o.name })?.isoCode || ''}
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
                                                                    // borderColor: Boolean(errors.Country) ? 'red' : 'default',
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
                                                        {country.map((country) => {
                                                            return (<MenuItem value={country.isoCode} style={{ fontSize: 15 }}>{country.name}</MenuItem>)
                                                        })}

                                                    </Select>
                                                    {errors?.Country && (
                                                        <FormHelperText>{errors?.Country?.message}</FormHelperText>
                                                    )}
                                                </>
                                            )}
                                        />
                                    </FormControl>
                                </Box>

                            </div>
                            <div className='col-lg-3 col-md-6'>
                                <label className='label_faq'>State </label>
                                <Box >
                                    <FormControl fullWidth  error={Boolean(errors.State)}>
                                    <Select
                                        name='State'
                                        id="State"
                                        value={_.find(state, function (o) { return data?.State === o.name })?.isoCode || ""}
                                        onChange={(e) => { handleChange(e) }}
                                        displayEmpty
                                        placeholder="Select state"
                                        error={Boolean(errors.State)}
                                        // helperText={errors.State.message}
                                        sx={{
                                            width: '100%',
                                            '& .MuiOutlinedInput-root': {
                                                fontSize: '16px',
                                                '& fieldset': {
                                                    borderColor: Boolean(errors.State) ? 'red' : 'default',
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
                                        {state.map((state) => {
                                            return <MenuItem value={state.isoCode} style={{ fontSize: 15 }}>{state.name}</MenuItem>
                                        })}
                                    
                                    </Select>
                                    {errors?.State && (
                                                        <FormHelperText>{errors?.State?.message}</FormHelperText>
                                                    )}
                                    </FormControl>
                                </Box>
                             
                            </div>
                            <div className='col-lg-3 col-md-6'>
                                <label className='label_faq'>City</label>
                                <Box >
                                    <FormControl fullWidth error={Boolean(errors.City)}>
                                    <Select
                                    id="City"
                                        name='City'
                                        value={data?.City}
                                        onChange={(e) => { handleChange(e) }}
                                        displayEmpty
                                        placeholder="Select state"
                                        sx={{
                                            width: '100%',
                                            '& .MuiOutlinedInput-root': {
                                                fontSize: '16px',
                                                '& fieldset': {
                                                    borderColor: Boolean(errors.City) ? 'red' : 'default',
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
                                        {city.map((city) => {
                                            return <MenuItem value={city.name} style={{ fontSize: 15 }}>{city.name}</MenuItem>
                                        })}

                                    </Select>
                                    {errors?.City && (
                                                        <FormHelperText>{errors?.City?.message}</FormHelperText>
                                                    )}
                                    </FormControl>
                                </Box>
                            </div>
                        </div>
                        <div className='row my-5'>
                            <div className='col-12'>
                                <div>
                                    <label className='label_faq'>Title</label>
                                    <TextField
                                        onChange={(e) => { handleChange(e) }}
                                        id="outlined-basic"
                                        placeholder='Title'
                                        variant="outlined"
                                        className={classes.faqtextfeild}
                                        name='Title'
                                        value={data.Title}
                                        inputRef={register({
                                            required: "Title is required*.",
                                            minLength: {
                                                value: 3,
                                                message: "Enter min 3 character"
                                            }
                                        })}
                                        helperText={errors.Title?.message}
                                        error={Boolean(errors?.Title)}
                                    />
                                </div>
                                <div>
                                    <label className='label_faq'>Content</label>
                                    <Box
                                        sx={{
                                            "& .rdw-editor-toolbar": {
                                                width: "100%",
                                            },
                                            "& .rdw-editor-wrapper": {
                                                height: "240px",
                                                // width: "991px",
                                            },
                                            ".rdw-editor-main": {
                                                background: "",
                                                border: "1px solid #c4c4c4",
                                                padding: "3px",
                                            },
                                            "& .quill": {
                                                height: '250px',
                                            }
                                        }}
                                    >
                                        <Editortoolbar Description={Content} SetDescription={SetDescription} />
                                       {editer && <p style={{color:'red'}}>Content is required</p>  }
                                    </Box>
                                </div>
                            </div>
                        </div>
                        <div className='row my-3'>
                            <div className=' my-5  d-flex justify-content-between align-items-center'>
                                <h3 className=''>FAQs</h3>
                                <div className='faqtoggle'>
                                    <label class="container"> Open
                                        <input type="checkbox" checked={isfaq} onChange={() => { setIsaq(!isfaq) }} />
                                        <span class="checkmark"></span>
                                    </label>
                                </div>
                            </div>
                            {
                                isfaq &&
                                <div className='col-8 mt-5 mx-auto'>
                                    <div className='faqs'>

                                        <div>
                                            {
                                                Faq.map((items, index) => {
                                                    return <div className='faqinputbox' key={index}>
                                                        <input type='text' value={items.title} placeholder='Question' onChange={(e) => { questionchange(e, index) }} />
                                                        <textarea placeholder='Answer'  onChange={(e) => { Answerchange(e, index) }} value={items.answer}></textarea>
                                                        {
                                                            index !== 0 &&
                                                            <span className='removefaqbtn' onClick={() => { removefaqbox(index) }}><FaTrashAlt /></span>
                                                        }
                                                    </div>
                                                })
                                            }

                                        </div>
                                        <p className='addfaqbtn' onClick={() => {
                                            setFaq([...Faq, {
                                                title: '',
                                                answer: ''
                                            }])
                                        }}>Add FAQs</p>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className='row'>
                            <div className='d-flex justify-content-end gap-3'>
                            <LoadingButton style={{   width:"20px", backgroundColor: isLoggedIn ? '#fff' : '#31B655', color:"white"}}
                                    loading={isLoggedIn}
                                    type='submit'
                                > Submit </LoadingButton>
                                <button className='faqcancelbtn'>Cancel</button>
                            </div>
                            
                        </div>

                    </div>

                </form>

            </div>
        </SectionCard>

    )
}
export default WebContent