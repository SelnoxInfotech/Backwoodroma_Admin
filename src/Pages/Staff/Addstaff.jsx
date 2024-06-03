import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import { CiUser } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { Select, MenuItem } from "@mui/material";
import Box from "@mui/material/Box";
import MuiPhoneNumber from "material-ui-phone-number";
import { AiOutlineMail } from "react-icons/ai";
import { useForm, Controller } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Cookies from "universal-cookie";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import useStyles from "../../Style";
import { FormControl } from "@mui/material";
import { SlSocialDropbox } from "react-icons/sl";
import "./Stall.css";
import axios from "axios";
import {useNavigate} from 'react-router-dom';


const Addusers = () => {
  const classes = useStyles();
  const navigate = useNavigate()
  const { register, handleSubmit, watch, errors,setError,clearErrors,getValues,setValue, control } =   useForm();
  const [loading, setLoading] = React.useState(false);
  const [dulicate, Setduplicate] = React.useState([]);
  const [status, setdatatus] = React.useState(true);
  const [roleoptions, Setroleoptions] = React.useState([]);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showcPassword, setShowcPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const cookies = new Cookies();
  const token_data = cookies.get("Token_access");
  const [multipleroles, setmultipleroles] = React.useState([]);


  const multipleroleschnage = (event) => {
    const {
      target: { value },
    } = event;
      setmultipleroles(
      typeof value === "string" ? value.split(",") : value
    );

    setValue('Roles',multipleroles );

  };
  const onSubmit = (data) => {
    axios.post('https://api.cannabaze.com/AdminPanel/register/',{...data , Roles :multipleroles  ,  is_superuser: false, Status : status , user_type:"Admin"} ).then((res)=>{
      navigate('/allstaff')
    }).catch((error)=>{
    
 
      if ( error.response.data.error === "{'username': [ErrorDetail(string='user with this username already exists.', code='unique')], 'email': [ErrorDetail(string='user with this email already exists.', code='unique')]}") {
        setError( 'username', {
          type: "manual",
          message:"username id already exists",
        })
        setError( 'email', {
          type: "manual",
          message:"email id already exists",
        })
      }
      else if (error.response.data.error === "{'email': [ErrorDetail(string='user with this email already exists.', code='unique')]}") {
        setError( 'email', {
          type: "manual",
          message:"email id already exists",
        })
      }
      else if (error.response.data.error === "{'username': [ErrorDetail(string='user with this username already exists.', code='unique')]}") {
        setError( 'username', {
          type: "manual",
          message:"username id already exists",
        })
    }
    })
  };
  useEffect(() => {
    axios
      .get("https://api.cannabaze.com/AdminPanel/Get-RolesAndPermission/", {
        headers: {
          Authorization: `Bearer ${token_data}`,
        },
      })
      .then((res) => {
        Setroleoptions(res?.data);
      });
  }, []);
  function chackduplicate(e){
  
    var key = e.target.name;
    var obj = {};

    obj[key] = e.target.value;
  

    Setduplicate('')
   
    const getData = setTimeout(() => {
      axios.post(`https://api.cannabaze.com/AdminPanel/UserNameCheck/`,  obj ,{
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM2NTcwOTQ1LCJpYXQiOjE3MDUwMzQ5NDUsImp0aSI6IjkzMTFlYTFkYTViNjRlOTk4NGY2YjUxN2M2MzI5NGM4IiwidXNlcl9pZCI6MX0.dZlMMBW7B93MWh1xSRklg1c7FRL7tKQttM0J9RjZKq0`,
        },
      }
    
      ).then((response) => {
        if(response.data !== "False"){
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
  return (
    <div className="adduserForm_container section_card">
      <div className="formsadduser">
        <form onSubmit={handleSubmit((data)=>onSubmit(data))}>
          <div className="row center">
            <h6 className="Login_title pagetitle text-start"> <SlSocialDropbox color='#31B655' size={25}/> Add User</h6>
          </div>

          <div className="row newLogin_label m-2">
            <h6 htmlFor="userName">Name</h6>
            <TextField
              //   id="userName"
              variant="standard"
              placeholder="Type User Name"
              fullWidth
              className={classes.StandardTextFieldStyle}
              onChange={(e)=>chackduplicate(e)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CiUser />
                  </InputAdornment>
                ),
              }}
              name="username"
              inputRef={register({
                required: "This Field is required*.",
              })}
              helperText={errors?.username?.message || dulicate?.username}
              error={Boolean(errors?.username) || Boolean(dulicate?.username)}
            />
          </div>

          <div className="row newLogin_label m-2">
            <h6>Mobile</h6>

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
                  className={classes.StandardTextFieldStyle}
                />
              )}
              name="MobilePhone"
              control={control}
              className={classes.StandardTextFieldStyle}
              defaultValue=""
              fullWidth
              rules={{
                required: "Enter valid phone number",
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
          <div className="row newLogin_label m-2">
            <h6 htmlFor="email">Email</h6>

            <TextField
              id="email"
              variant="standard"
              placeholder="Type Your Email"
              fullWidth
              onChange={(e)=>chackduplicate(e)}
              type="email"
              className={classes.StandardTextFieldStyle}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AiOutlineMail />
                  </InputAdornment>
                ),
              }}
              name="email"
              inputRef={register({
                required: "email  is required*.",
              })}
              helperText={errors?.email?.message || dulicate?.email}
              error={Boolean(errors?.email) || Boolean(dulicate?.email)}
            />
          </div>
          <div className="row newLogin_label m-2">
            <h6 htmlFor="password">Password</h6>
            <TextField
              id="password"
              variant="standard"
              placeholder="Type Your Password"
              fullWidth
              type={showPassword ? "text" : "password"}
              name="password"
              className={classes.StandardTextFieldStyle}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CiLock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                
              }}
              defaultValue=""
              inputRef={register({
                required: "password  is required*.",
                minLength: {
                  value: 8,
                  message: "Password must be more than 8 characters",
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "At least one uppercase letter, one lowercase letter, one number and one special character",
                },
              })}
              autocomplete="new-password"
              helperText={errors?.password?.message}
              error={Boolean(errors?.password)}
            />
          </div>
          <div className="row newLogin_label m-2">
            <h6 htmlFor="password">Confirm Password</h6>
            <TextField
              id="cpassword"
              variant="standard"
              placeholder="Confirm Password"
              fullWidth
              type={showcPassword ? "text" : "password"}
              name="cpassword"
              className={classes.StandardTextFieldStyle}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CiLock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={()=>setShowcPassword(!showcPassword)}
                    >
                      {showcPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                
              }}
              autocomplete="new-password"
              inputRef={register({
                required:
                  watch("password") !== watch("cpassword") &&
                  "Confirm password mot match",
                validate: (val) => {
                  if (watch("password") != val) {
                    return "Your passwords do no match";
                  }
                },
              })}
              helperText={errors?.cpassword?.message}
              error={Boolean(errors?.cpassword)}
            />
          </div>
        
          <div className="row newLogin_label m-2">
            <h6>Roles</h6>

            

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
                defaultValue={''}
                error={!Boolean(multipleroles?.length) && !!errors.Roles}
                rules={{ required: 'Please Assign Role' }}
                helperText={errors.Roles && errors.Roles.message}
              />
              {/* {/ <FormHelperText>{method.errors.Store_Type?.message}</FormHelperText> /} */}
            </FormControl>




        
          </div>
          <div className="row newLogin_label d-flex justify-content-between align-items-center m-2">
           <h6 className="d-content">Status</h6>

           
                <label className="switch">
                <input
                    type="checkbox"
                   checked={status}
                   onClick={()=>setdatatus(!status)}
                />
                <span className="slider round"></span>
                </label>


          </div>

          <div className="row mt-2">
            <div className="col-lg-12  ">
              <Box className={`center ${classes.loginBtnStyle}`}>
                <LoadingButton type="submit" loading={loading}>
                  Add Staff
                </LoadingButton>
              </Box>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addusers;
