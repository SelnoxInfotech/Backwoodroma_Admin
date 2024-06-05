import axios from 'axios'
import React, { useState,useEffect } from 'react'
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import OtpInput from 'react-otp-input';
import Cookies from 'universal-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import { AiFillEye } from 'react-icons/ai';
import { AiFillEyeInvisible } from "react-icons/ai"
import Aos from "aos";
import "aos/dist/aos.css";
import InputAdornment from '@material-ui/core/InputAdornment';
import useStyles from '../../Style'
import { LoadingButton } from '@mui/lab';
import { MdVerified } from "react-icons/md";
import { useForm, Controller } from "react-hook-form";
  Aos.init({
    duration: 1200
  });
export default function Login_logout() {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const { register, handleSubmit, errors, reset , control ,clearErrors } = useForm();
    const [invalide, Setinvalid] = React.useState(false);
    const [loginsucces, setloginsucces] = React.useState(false);
    const [inputs, setInputs] = useState({ username: '', Email: '', password: '' });
    const [show, setOpen] = useState(false);
    const [isLoggedIn, setLoading] = useState(false);
    const [OTP, setotp] = useState("");
    const [timer, setTimer] = useState(10); 
    React.useEffect(function () {
        Aos.init({ duration: 500 });
    }, []);
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
        clearErrors("otp")
        Setinvalid(false)
    };
    useEffect(()=>{
        if(show && timer >0){
          
            const intervalId = setInterval(() => {
                setTimer(timer => {
                    if (timer === 1) {
                        clearInterval(intervalId);
                        setOpen(false);
                        return 0;
                    } else {
                        return timer - 1;
                    }
                });
            }, 1000);
            return () => clearInterval(intervalId);
        }
    },[show , timer])
  
    const onSubmit = (data) => {
        setLoading(true);
        axios.post("https://api.cannabaze.com/AdminPanel/Login/", {
            email: inputs.Email,
            username: inputs.username,
            password: inputs.password
        })
        .then((response) => {
            setLoading(false);
            setOpen(true);
            setTimer(30)
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
      
    };
    const handleMeetingCreateDialogClose = (event, reason) => {
        if (reason && reason === "backdropClick")   return; 
        setOpen(false);
    };
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    const onOtpSubmit= (data)=>{
      
      setOpen(false);
      axios.post("https://api.cannabaze.com/AdminPanel/VerifyOtp/", { email: data.Email, OTP: data.otp }).then((response) => {
          if (response.data.data === "invalid Otp") {
              setOpen(true);
              Setinvalid(true)
          } else {
         
                if (Boolean(response.data.permission.length !== 0) || response?.data?.is_superuser) {
                  if (!response.data.is_superuser && Boolean(response.data.permission.length === 0)) {
                      setloginsucces(true)
                      setTimeout(()=>{
                         navigate("/*");
                        setloginsucces(false)

                      }, 1000)
                  } else {
                        let date = new Date();
                        date.setTime(date.getTime() + (60 * 60 * 8000));
                        cookies.set('Token_access', response.data.tokens.access, { expires: date });
                        setTimeout(()=>{
                            navigate("/");
                        setloginsucces(false)

                        }, 1000)
                        setloginsucces(true)

                  }
              } else {
                  window.alert("You are not an authorized user");
              }
          }
      }).catch((error)=>{
        setOpen(true);
       
        Setinvalid(true)
      });
    }
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
                                    type='submit'
                                > Submit </LoadingButton>

                            </div>

                        </div>
                    </div>
                </form>
              
            </div>
            <div>
                <Dialog open={show} onClose={handleMeetingCreateDialogClose} disableBackdropClick  disableEscapeKeyDown className={classes.otppopup}>
                   <div className='otppopup'>
                            <h4> Enter OTP</h4>
                            <p> Please Enter OTP Which Is Sent On Your Register Email</p>

                        <form  onSubmit={handleSubmit(onOtpSubmit)}>
                        <DialogContent>
                            
                              
                        
                                        <div className='d-flex  justify-content-center text-center'>
                                        <Controller
                                            render={( field ) => (
                                                <OtpInput   shouldAutoFocus    value={field.value}  onChange={(e)=>{handleotp(e) ; field.onChange(e)}}    numInputs={4} renderSeparator={<span> </span>}    autofocus={true}    isInputNum={true}  hasErrored={true}  renderInput={(props) => <input {...props} type='number' className='otpinputboxstyle'  />}
                                                                                inputStyle={{
                                                                                        width: "30px",
                                                                                        marginBottom: "10px",
                                                                                        height: "30px",
                                                                                        margin:'0 3px',
                                                                                        backgroundColor: "transparent",
                                                                                        outline: "none",
                                                                                        borderColor:(errors.otp || invalide ) ? 'red' : "#31B655",
                                                                                    }}  
                                                                        />
                                                                    )}
                                                                    control={control}
                                                                    name="otp"  
                                                                    value={OTP}
                                                                    rules={{ required: 'Please enter OTP' }}
                                                                />
                                        </div>
                                        <p className='timer_box'>Didn't get a code? resend after <span> {`${Math.floor(timer / 60)}`.padStart(2, 0)}: {`${timer % 60}`.padStart(2, 0)}</span></p>
                                        <div className='d-flex mt-2 justify-content-center text-center'>
                                            { invalide && <span className='errormessage'>Invalid OTP</span>   }
                                            {
                                                errors.otp && <span className='errormessage' > {errors.otp.message}</span>  
                                            }
                                        </div>
                        </DialogContent>
                        <div className='d-flex justify-content-end'>        
                            <button className='' type='submit' >Verify</button>
                        </div>
                        </form>
                    </div>
                </Dialog>
            </div>
              { loginsucces &&  <div className='verifiedopt'>
                    <div className='verifiedotpcontent'  data-aos={'zoom-in'}>
                        <span> <MdVerified  size={52} color='#31B655' /> </span>
                        <h3>Successfully</h3>
                        <p>Your OTP has been Matched successfully</p>
                        <button onClick={()=>{setloginsucces(false) ;navigate("/"); }}>Continue</button>
                    </div>
                </div>}
        </div>
    )
}
