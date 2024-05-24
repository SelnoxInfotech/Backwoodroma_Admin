import axios from 'axios'
import React, { useState, useContext,useEffect } from 'react'
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import OtpInput from 'react-otp-input';
import Cookies from 'universal-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import { AiFillEye } from 'react-icons/ai';
import { AiFillEyeInvisible } from "react-icons/ai"
import InputAdornment from '@material-ui/core/InputAdornment';
import useStyles from '../../Style'
import Createcontext from "../../Hooks/Context/Context"
import { LoadingButton } from '@mui/lab';
import { useForm, Controller } from "react-hook-form";

export default function Login_logout() {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const { register, handleSubmit, errors, reset } = useForm();
    const [invalide, Setinvalid] = React.useState(false)
    const [otpvalid, setotpvalid] = useState("");
    const [inputs, setInputs] = useState({ username: '', Email: '', password: '' });
    const [show, setOpen] = useState(false);
    const [isLoggedIn, setLoading] = useState(false);
    const [OTP, setotp] = useState("");
    const [values, setValues] = React.useState({
        password: "",
        showPassword: false,
    });
    const classes = useStyles();
    useEffect(() => {
        const savedUsername = cookies.get('username') || '';
        const savedEmail = cookies.get('email') || '';
        const rememberMe = cookies.get('rememberMe') || false;
        setInputs({ username: savedUsername, Email: savedEmail, password: '' , rememberMe: rememberMe });
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
    };

    const handleotp = (event) => {
        setotp(event);
        Setinvalid(false)
    };

    const onSubmit = (data) => {
        setLoading(true);
        axios.post("https://api.cannabaze.com/AdminPanel/Login/", {
            email: inputs.Email,
            username: inputs.username,
            password: inputs.password
        })
        .then((response) => {
            setLoading(false);
            alert(response.data.message);
            setOpen(true);

            if (Boolean(inputs.rememberMe)) {
                let date = new Date();
                date.setTime(date.getTime() + (60 * 60 * 8000));
                cookies.set('username', inputs.username, { expires: date });
                cookies.set('email', inputs.Email, { expires: date });
                cookies.set('rememberMe', true, { expires: date });
            } else {
                cookies.remove('username');
                cookies.remove('email');
                cookies.remove('rememberMe');
            }
        })
        .catch((error) => {
            if (error) {
                alert("Invalid credentials");
                setLoading(false);
            }
        });
        setTimeout(alertFunc, 5 * 60 * 1000);
    };

    const otp_send = () => {
      
        setOpen(false);
        axios.post("https://api.cannabaze.com/AdminPanel/VerifyOtp/", { email: inputs.Email, OTP: OTP })
        .then((response) => {
            if (response.data.data === "invalid Otp") {
                setOpen(true);
                setotpvalid(response.data.data);
                Setinvalid(true)
            } else {
                if (Boolean(response.data.permission.length !== 0) || response?.data?.is_superuser) {
                    if (!response.data.is_superuser && Boolean(response.data.permission.length === 0)) {
                        navigate("/*");
                    } else {
                        let date = new Date();
                        date.setTime(date.getTime() + (60 * 60 * 8000));
                        cookies.set('Token_access', response.data.tokens.access, { expires: date });
                        navigate("/");
                    }
                } else {
                    window.alert("You are not an authorized user");
                }
            }
        }).catch((error)=>{
            window.alert("somthing went wrong")
            Setinvalid(true)

        });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const alertFunc = () => {
        setOpen(false);
    };

    return (
        <div>
            <div className='login_logout_center'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="login_form_container">

                        <p className="Login_title">ADMIN PANEL</p>
                        <p className='login_description'> Login to access your account</p>

                        <div className='login_form_feild'>

                            <div className='lg_ip_feild'>


                                <label htmlFor='name'>
                                    Name<span className='required '>*</span>:
                                </label>

                                <TextField placeholder='User Name'
                                    fullWidth
                                    // id="name"
                                    type='text'
                                    variant="outlined"
                                    name="username"
                                    defaultValue={''}
                                    inputProps={{ style: { fontSize: 15, height: 5 } }}
                                    onChange={(e)=>handleChange(e)}
                                    value={inputs.username}
                                    className={classes.Username}
                                    inputRef={register({
                                        required: "username is required*.",
                                        minLength: {
                                            value: 1,
                                            message: "Please enter valid name",
                                        },
                                        maxLength: {
                                            value: 150,
                                            message: "Please enter shot valid name",
                                        },
                                    })}
                                    helperText={errors.username?.message}
                                    error={
                                        Boolean(errors?.username)
                                    }
                                />
                            </div>

                            <div className='lg_ip_feild'>

                                <label htmlFor='email'>
                                    Email<span className='required'>*</span>:
                                </label>
                                <TextField placeholder='Email Address'
                                    fullWidth
                                    id="email" variant="outlined" name="Email"
                                    type="email" style={{ fontSize: 15 }} inputProps={{ style: { fontSize: 15, height: 5 } }}
                                    value={inputs.Email}
                                    onChange={(e)=>handleChange(e)}
                                    className={classes.Username}
                                    inputRef={register({
                                        required: "email  is required*.",
                                      })}
                                      helperText={errors.Email?.message}
                                      error={Boolean(errors?.Email)}
                                />
                            </div>

                            <div className='lg_ip_feild'>


                                <label htmlFor='password'>
                                    Password<span className='required'>*</span>:
                                </label>

                                <TextField placeholder='Password' type={values.showPassword ? "text" : "password"} id="password" variant="outlined"
                                    name="password" fullWidth inputProps={{ style: { fontSize: 15, height: 5 } }}
                                    onChange={(e)=>handleChange(e)}
                                    className={classes.Username}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position='end'>
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                >
                                                    {values.showPassword ? <AiFillEye size={20} color='#747474' /> : <AiFillEyeInvisible size={20} color='#747474' />}
                                                </IconButton>
                                            </InputAdornment>

                                        )
                                    }}

                                    value={inputs.password || ""}
                                    inputRef={register({
                                        required: "password  is required*.",
                                      })}
                                      helperText={errors.password?.message}
                                      error={Boolean(errors?.password)}
                                />


                            </div>
                            <div className='lg_ip_feild d-flex w-100 justify-content-between align-items-center'>
                                <div className='d-flex gap-1 align-items-center'>
                                <input type="checkbox" name='rememberMe' id='rememberme' checked={inputs.rememberMe} onChange={()=>{ setInputs((prevInputs) => ({ ...prevInputs, "rememberMe": !prevInputs.rememberMe }));}} />
                                    <label className='RememberMeCheckBox' htmlFor='rememberme'>
                                        Remember me
                                    </label>
                                </div>
                                <div>
                                    <Link to={"/Forgot"} className='RememberMeCheckBox'> Forgot Password?</Link>
                                </div>
                            </div>
                            <div className={classes.SubmitLoginButton}>

                                <LoadingButton style={{  backgroundColor: isLoggedIn && '#fff'}}
                                    loading={isLoggedIn}
                                    // loadingPosition="start"
                                    type='submit'
                                > Submit </LoadingButton>

                            </div>

                        </div>
                    </div>
                </form>
            </div>
            <div>

                <Dialog open={true} onClose={handleClose} disableEscapeKeyDown className={classes.otppopup}>
                    <DialogTitle>Enter Otp</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {
                                otpvalid === "invalid Otp" &&
                                <div className='col-12 center colorotp'>
                                    <p>{otpvalid}</p>
                                </div>
                            }
                            Please Enter Otp Which Is Sent On Your Register Email
                        </DialogContentText>
<div className='d-flex  justify-content-center text-center'>
                                    <OtpInput
                                    shouldAutoFocus
                                    value={OTP}
                                    onChange={handleotp}
                                    numInputs={4}
                                    renderSeparator={<span> </span>}
                                    autofocus={true}
                                    isInputNum={true}
                                    hasErrored={true}
                                    renderInput={(props) => <input {...props}  />}
                                    inputStyle={{
                                                width: "30px",
                                                marginBottom: "10px",
                                                height: "30px",
                                                margin:'0 3px',
                                                backgroundColor: "transparent",
                                                outline: "none",
                                                borderColor:invalide ? 'red' : "#31B655",
                                            }}  
                                />
                                </div>
<div className='d-flex  justify-content-center text-center'>

                                {
                                    invalide && <span style={{ color: "red" }}>Invalid OTP</span>
                                                            }
                                                            </div>
                    </DialogContent>
                    <DialogActions>
                        {
                            otpvalid === "invalid Otp" ? <p>
                                <button className='  ' onClick={handleSubmit}>resend</button>
                                <button className='  ' onClick={otp_send}>Verify</button>
                            </p>
                                : <button className='  ' onClick={otp_send}>Verify</button>
                        }
                    </DialogActions>
                </Dialog>
            </div>

        </div>
    )
}
