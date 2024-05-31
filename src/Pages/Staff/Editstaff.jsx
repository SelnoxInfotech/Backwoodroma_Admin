import React, { useState , useContext, useEffect } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { FormControl } from "@mui/material";
import MuiPhoneNumber from "material-ui-phone-number";
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useForm, Controller } from "react-hook-form";
import Successfullypopup from '../../Components/Component/Successfullypopup'
import Unsuccesspopup from '../../Components/Component/Unsuccesspopup'
import Cookies from 'universal-cookie';
import Axios from "axios"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from 'axios'
import Createcontext from "../../Hooks/Context/Context"
import { FaEdit } from "react-icons/fa";
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
        '& .MuiButtonBase-root': {
            fontSize: "1.5625rem",
            color: "#31B665"
        },
    },
}));
function BootstrapDialogTitle(props) {
}
export default function Editstaff(props) {
console.log(props.MobileNo)
    const { register, handleSubmit, watch, errors,setError,clearErrors,getValues,setValue, control } =   useForm();
    const cookies = new Cookies();
    const token_data = cookies.get("Token_access");
    const  [defaulrole ,Setdefaulrole]=useState([])
    const { dispatch } = useContext(Createcontext)
    const [open, setOpen] = React.useState(false);
    const [roleoptions, Setroleoptions] = React.useState([]);
    const [dulicate, Setduplicate] = React.useState([]);
    function chackduplicate(e){
    
        var key = e.target.name;
        var obj = {};

        obj[key] = e.target.value;
    

        Setduplicate('')
    
        const getData = setTimeout(() => {
        axios.post(`https://api.cannabaze.com/AdminPanel/UserNameCheck/`,  obj ,{
            headers: {
            Authorization: `Bearer ${token_data}`,
            },
        }
        
        ).then((response) => {
            if(response.data !== "False" && props.data[key] !== e.target.value ){
            Setduplicate(response.data);
            setError( key, {
                type: "manual",
                message: response.data,
            })
            }else{
              clearErrors(key)
            }
        
        });
        }, 1000)

        return () => clearTimeout(getData)
    }
    const [sucsesopen , setsucsesopen] = useState(false)
    const [unsucsesopen , setunsucsesopen] = useState(false)
    const [multipleroles, setmultipleroles] = React.useState([]);

    
    const classes = useStyles()
    const [Brand, setBrand] = React.useState({
        Roles: props.data.Roles ,
        username:  props.data.Name,
        email: props.data.Email,
        MobileNo: props.data.MobileNo
    });
    const handleChange = (event) => {
        const value = event.target.value;
        setBrand({
            ...Brand,
            [event.target.name]: value
        });

    };
    React.useEffect(() => {
        axios.get("https://api.cannabaze.com/AdminPanel/Get-RolesAndPermission/", {
            headers: {
              Authorization: `Bearer ${token_data}`,
            },
          })
          .then((res) => {
            Setroleoptions(res?.data);
            let a = res.data.filter((item)=>{
                if(Boolean(props.data.Roles.includes(item.RoleTitle))){
                     return item.id
                }
            })
           
            setmultipleroles(a.map((item)=>item.id))
            let dataas = res?.data.filter((item)=>{
              
               if(Boolean(props?.data?.Roles.includes(item.RoleTitle))){
                 return item.id
               }
            }).map((item)=>item.id)  
           
            setBrand({...Brand , Roles:dataas})
          });
      }, []);
      const multipleroleschnage = (event) => {
        const {
          target: { value },
        } = event;
          setmultipleroles(
          typeof value === "string" ? value.split(",") : value
        );
    
        setValue('Roles',multipleroles );
    
      };
    const handleClickOpen = async () => {
      
            
            setValue("Roles", props.data.Roles, { shouldValidate: true })
           setOpen(true);
       
        
    };
    const  handleClose = () => {
       
        setOpen(false);
    };
    setValue('Roles',multipleroles );
    // const Submit = () => {
    //     const config = {
    //         headers: { Authorization: `Bearer ${token_data}` }
    //     };
    //     Axios.post(
    //         `https://api.cannabaze.com/AdminPanel/UpdateAdminProfile/${props.data.ID}`,
    //         Brand,
    //         config
    //     ).then(() => {
           
    //         setsucsesopen(true)
    //         dispatch({ type: 'api', api: true })
    //         axios.get('https://api.cannabaze.com/AdminPanel/AllStaff/',{
    //             headers: {
    //               Authorization: `Bearer ${token_data}`,
    //             },
    //       }).then((res)=>{
    //         let a = res.data.map((data , index)=>{
    //           return {...data , sno:index+1}
    //         })
    //         props.setuserdata(a)
    //       })
    //     }).catch((error)=>{
    //         setunsucsesopen(true)
    //     })
        
    // };
   useEffect(()=>{
    if( !sucsesopen ){
        setOpen(false)
    }
   },[sucsesopen , unsucsesopen])

   const onSubmit = (data) => {
   
        const config = {
            headers: { Authorization: `Bearer ${token_data}` }
        };
        Axios.post(
            `https://api.cannabaze.com/AdminPanel/UpdateAdminProfile/${props.data.ID}`,
            data,
            config
        ).then(() => {
           
            setsucsesopen(true)
            dispatch({ type: 'api', api: true })
            axios.get('https://api.cannabaze.com/AdminPanel/AllStaff/',{
                headers: {
                  Authorization: `Bearer ${token_data}`,
                },
          }).then((res)=>{
            let a = res.data.map((data , index)=>{
              return {...data , sno:index+1}
            })
            props.setuserdata(a)
          })
        }).catch((error)=>{
            setunsucsesopen(true)
        })
  };

    return (
        <div>
           
                <FaEdit  onClick={()=>handleClickOpen()} size={20} color='#31B655'/>
        
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="Customizeed-dialog-title"
                open={open}
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {                        
                            width: {
                                xs: "100%",
                                sm: "80%",
                                md: "75%",
                                lg: "60%",
                                xl: "50%"

                            },
                          
                            maxWidth: "none",  // Set your width here
                            border: "1px solid #31B665",
                            borderRadius: "15px",

                        },
                    },
                }}
            >
                  { sucsesopen && <Successfullypopup  setsucsesopen={setsucsesopen} link={'/allstaff'} popupset={setOpen}/>}
                  { unsucsesopen && <Unsuccesspopup setsucsesopen={setunsucsesopen} link={'/allstaff'} popupset={setOpen}/>}
                <BootstrapDialogTitle id="Customizeed-dialog-title" onClose={handleClose}>
                    Modal title
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <div className='container-fluid '>
                        <div className='row'>

                            <div className='col-12' >

                                <div className='col-12 Add_State  center'>
                                    <h2 className='popupTitle'> Edit staff</h2>
                                   
                                </div>
                                <form onSubmit={handleSubmit((data)=>onSubmit(data))}>
                                <div className='addSubcategoryForm'>

                                        <div className='inputFeildasf  '>
                                        
                                                <label className='label'>
                                                    Roles:
                                                </label>
                                        
                                            
                                                <FormControl fullWidth>
                                                <Controller
                                                    render={(props) => (
                                                    <Select
                                                    multiple
                                                        className={classes.selectformbox}
                                                        error={!Boolean(multipleroles?.length) && !!errors.Roles}
                                                        helperText={errors.Roles && errors.Roles.message}
                                                        value={multipleroles}
                                                        onChange={multipleroleschnage}
                                                    >
                                                        {roleoptions.map((item, index) => {
                                                        return (
                                                            <MenuItem  key={index} className={classes.selectrolesoptions} value={item.id}>{item.RoleTitle} </MenuItem>
                                                        );
                                                        })}
                                                    </Select>
                                                    )}
                                                
                                                
                                                    name="Roles"
                                                    control={control}
                                                    defaultValue={defaulrole}
                                                    rules={{ required: 'Please Assign Role' }}
                                                />
              {/* {/ <FormHelperText>{method.errors.Store_Type?.message}</FormHelperText> /} */}
                                                </FormControl>
                                                    {/* <Select
                                                        className={classes.popupselectFeild}
                                                        multiple
                                                        id="Roles" name='Roles'
                                                        value={Brand.Roles} 
                                                        onChange={(e)=>{setBrand({...Brand  ,Roles: e.target.value })}}
                                                    >
                                                        {roleoptions.map((item, index) => {
                                                        return (
                                                            <MenuItem  key={index} className={classes.selectrolesoptions} value={item.id}>{item.RoleTitle} </MenuItem>
                                                        );
                                                        })}
                                                    </Select> */}
                                        
                                        </div>
                                        <div className='inputFeildasf  '>
                                        
                                        <label className='label'>
                                            Name:
                                        </label>
                                           <TextField
                                                placeholder="Type User Name"
                                                fullWidth
                                                className={classes.popuptextfeild}
                                                onChange={(e)=>chackduplicate(e)}
                                                name="username"
                                                inputRef={register({
                                                    required: "This Field is required*.",
                                                })}
                                                defaultValue={ props.data.Name}
                                                helperText={errors?.username?.message || dulicate?.username}
                                                error={Boolean(errors?.username) || Boolean(dulicate?.username)}
                                            />
                                        </div>
                                        <div className='inputFeildasf  '>
                                                
                                                <label className='label'>
                                                    Email:
                                                </label>
                                        
                                             
                                                      <TextField
                                                        id="email"
                                                       
                                                        placeholder="Type Your Email"
                                                        fullWidth
                                                        onChange={(e)=>chackduplicate(e)}
                                                        type="email"
                                                        className={classes.popuptextfeild}
                                                        name="email"
                                                        inputRef={register({
                                                            required: "email  is required*.",
                                                        })}
                                                        defaultValue={ props.data.Email}
                                                        helperText={errors?.email?.message || dulicate?.email}
                                                        error={Boolean(errors?.email) || Boolean(dulicate?.email)}
                                                        />
                                        
                                        </div>
                                        <div className='inputFeildasf  '>
                                                
                                                <label className='label'>
                                                Phone Number:
                                                </label>
                                        
{/*                                             
                                                    <MuiPhoneNumber
                                                    name={'MobilePhone'}
                                                    value={Brand.MobilePhone}
                                                    size="small"
                                                    id="Phone"
                                                    defaultCountry={"us"}
                                                    style={{ width: "100%" }}
                                                    margin="normal"
                                                    onChange={(e)=>{setBrand({...Brand , Phone:e })}}
                                                /> */}
                                                 <Controller
                                                        render={({ name, onChange, value }) => (
                                                            <MuiPhoneNumber
                                                            name={name}
                                                            value={value}
                                                            size="small"
                                                            onChange={onChange}
                                                            id="Mobile"
                                                            defaultCountry={"us"}
                                                            style={{ width: "100%" }}
                                                            margin="normal"
                                                            error={Boolean(errors?.MobilePhone)}
                                                            helperText={errors?.MobilePhone?.message}
                                                            />
                                                        )}
                                                        name="MobilePhone"
                                                        control={control}
                                                        className={classes.StandardTextFieldStyle}
                                                        defaultValue={props?.data?.MobileNo !== null ? props.data.MobileNo  :""}
                                                        fullWidth
                                                        rules={{
                                                          
                                                            minLength: {
                                                            value: 8,
                                                            message: "Please enter minimum 10 digits",
                                                            },
                                                            maxLength: {
                                                            value: 20,
                                                            message: "Please enter valid mobile number",
                                                            },
                                                        }}
                                                />
                                                                
                                        </div>
                                        <div className='col-12 center top' >
                                            <button className='topbutton' type='submit' autoFocus  >
                                                Save changes
                                            </button>
                                        </div>
                             
                           
                               
                              </div>
                              </form>
                            </div>

                        </div>

                    </div>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus color='success' onClick={handleClose}>
                        Exit
                    </Button>
                </DialogActions>
            </BootstrapDialog>

              
        </div>
    );
}