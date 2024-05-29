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
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './Webcontent.css'
import TextField from '@mui/material/TextField';
import useStyles from '../../Style';
import { useSnackbar } from 'notistack';
const WebContent = () => {
    const cookies = new Cookies();
    const { enqueueSnackbar } = useSnackbar();
    const token_data = cookies.get('Token_access')
    const { register, handleSubmit, errors, control, setError } = useForm();
    const [country, setcontary] = React.useState(Country.getAllCountries());
    const [data, Setdata] = React.useState({
        type: "dispensary",
        Country: "",
        state: "",
        city: ""
    });
    const [Description, SetDescription] = React.useState(``);
    const [city, setcity] = React.useState([]);
    const [state, setstate] = React.useState(() => {
        // const saved = _.find(country, function (o) { return data?.state === o.isoCode });
        return [];
      });

    const classes = useStyles()
    const [isfaq, setIsaq] = useState(false)
    const [faqscount, setfaqscount] = React.useState([{
        title: '',
        answer: ''
    }]);
    const handleChange = (event) => {
        if (event.target.name === "Country") {

            const find = _.find(country, function (o) { return event.target.value === o.isoCode });
            Setdata(prevState => ({
                ...prevState,
                "Country": find.name,
                "state": "",
                "city": ""
            }));
            setstate(State.getStatesOfCountry(event.target.value))
        }
        else if (event.target.name === "state") {
            const statefind = _.find(state, function (o) { return event.target.value === o.isoCode });
            Setdata(prevState => ({
                ...prevState,
                "state": statefind.name
            }));
            setcity(City.getCitiesOfState(statefind.countryCode, statefind.isoCode))
        }
        else if (event.target.name === "city") {
            Setdata(prevState => ({
                ...prevState,
                "city": event.target.value
            }));
        }
        else {
            Setdata(prevState => ({
                ...prevState,
                [event.target.name]: event.target.value
            }));
        }
    };
    const questionchange = (e, index) => {
        faqscount[index].title = e.target.value;
        setfaqscount([...faqscount])
    }
    const removefaqbox = (indx) => {
        let a = faqscount.filter((item, index) => {
            return index !== indx
        })
        setfaqscount(a)
    }
    function Submit() {
        const config = {
            headers: { Authorization: `Bearer ${token_data}` }
        };
        const combinedData = {
            ...data,
            Description,
            faqscount
        };

        axios.post(
            `https://api.cannabaze.com/AdminPanel/Add-Webpagedescription/`,
            combinedData,
            config
        ).then(() => {
            enqueueSnackbar('Web Content success !', { variant: 'success' });
        }).catch((error) => {
            console.log(error)
        })
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
                                    <FormControl fullWidth error={Boolean(errors?.type)}>
                                        <Controller
                                            name="type"
                                            control={control}
                                            rules={{ equired: "Store Type is required", }}
                                            defaultValue={data.type || ''}
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
                                                                    borderColor: Boolean(errors.type) ? 'red' : 'default',
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
                                                    {/* {errors.Store_Type && <FormHelperText error>{errors.Store_Type.message}</FormHelperText>} */}
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
                                                </>
                                            )}
                                        />
                                    </FormControl>
                                </Box>

                            </div>
                            <div className='col-lg-3 col-md-6'>
                                <label className='label_faq'>State </label>
                                <Box >
                                    <Select
                                        name='state'
                                        value={_.find(state, function (o) { return data.state === o.name })?.isoCode || ""}
                                        onChange={(e) => { handleChange(e) }}
                                        displayEmpty
                                        placeholder="Select state"
                                        sx={{
                                            width: '100%',
                                            '& .MuiOutlinedInput-root': {
                                                fontSize: '16px',
                                                '& fieldset': {
                                                    borderColor: Boolean(errors.type) ? 'red' : 'default',
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
                                </Box>
                            </div>
                            <div className='col-lg-3 col-md-6'>
                                <label className='label_faq'>City</label>
                                <Box >
                                    <Select
                                        name='city'
                                        value={data.city}
                                        onChange={(e) => { handleChange(e) }}
                                        displayEmpty
                                        placeholder="Select state"
                                        sx={{
                                            width: '100%',
                                            '& .MuiOutlinedInput-root': {
                                                fontSize: '16px',
                                                '& fieldset': {
                                                    borderColor: Boolean(errors.type) ? 'red' : 'default',
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
                                            return <MenuItem value={city.isoCode} style={{ fontSize: 15 }}>{city.name}</MenuItem>
                                        })}

                                    </Select>
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
                                        name='title'
                                        inputRef={register({
                                            required: "Title is required*.",
                                            minLength: {
                                                value: 3,
                                                message: "Enter min 3 character"
                                            }
                                        })}
                                        helperText={errors.title?.message}
                                        error={Boolean(errors?.title)}
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
                                        <Editortoolbar Description={Description} SetDescription={SetDescription} />
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
                                                faqscount.map((items, index) => {
                                                    return <div className='faqinputbox' key={index}>
                                                        <input type='text' value={items.title} placeholder='Question' onChange={(e) => { questionchange(e, index) }} />
                                                        <textarea placeholder='Answer' value={items.answer}></textarea>
                                                        {
                                                            index !== 0 &&
                                                            <span className='removefaqbtn' onClick={() => { removefaqbox(index) }}><FaTrashAlt /></span>
                                                        }
                                                    </div>
                                                })
                                            }

                                        </div>
                                        <button className='addfaqbtn' onClick={() => {
                                            setfaqscount([...faqscount, {
                                                title: '',
                                                answer: ''
                                            }])
                                        }}>Add FAQs</button>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className='row'>
                            <div className='d-flex justify-content-end gap-3'>
                                <button className='faqsubmitbtn' type='submit' > Submit</button>
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