import React, { useState } from 'react'
import axios from 'axios'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Link} from 'react-router-dom'
export default function Forgot() {
    const [inputs, setInputs] = useState({});
    const [show, setOpen] = useState(false);
    const [isLoggedIn, loading] = useState(false)
    const [OTP, setotp] = useState("");
    const data = {
        email: inputs.Email
    }
    const otp_data = {
        email: inputs.Email,
        OTP: OTP.OTP,
        new_password:inputs.password
    }
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            axios.post("http://192.168.29.70:7000/AdminPanel/ResetPasswordAPI/", data,

                loading(true)
            ).then((response) => {
                setOpen(true)
                loading(false)

            }).catch((error)=>{
                loading(false) 
            })
            setTimeout(alertFunc, 5 * 60 * 1000)
        } catch (error) {
        

        }
    }
    function alertFunc() {
        setOpen(false);
    }
    const handleClose = () => {
        setOpen(false);
    }
    const handleotp = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setotp(values => ({ ...values, [name]: value }))
    }
    const otp_send = () => {
        setotp("")
        setOpen(false);
        axios.post("http://192.168.29.70:7000/AdminPanel/VerifyOtpResetPassword/", otp_data,

        ).then((response) => {
          
            alert(response.data.message)


        })
    };
    function password_show_hide() {
        var x = document.getElementById("password");
        var show_eye = document.getElementById("show_eye");
        var hide_eye = document.getElementById("hide_eye");
        hide_eye.classList.remove("d-none");
        if (x.type === "password") {
            x.type = "text";
            show_eye.style.display = "none";
            hide_eye.style.display = "block";
        } else {
            x.type = "password";
            show_eye.style.display = "block";
            hide_eye.style.display = "none";
        }
    }
    return (
        <div className='forgotcontainer'>
            <div className='login_form_container'>
                    <h3 className="Login_title">Forgot Password</h3>
                    <form onSubmit={handleSubmit}>
                        <div className='form mx-sm-3 mb-2'>
                                <div className='inputBox'>
                                    <label>Email:</label>
                                    <input required placeholder=' Email Address' type="email" name="Email" value={inputs.Email || ""} onChange={handleChange} />
                                </div>
                                {/* <div className='checkinputBox'>
                                       <label className='d-inline flex-1'> Remember me :  </label>
                                        <input type="checkbox" name='checkbox' value={inputs.checkbox || ""} onChange={handleChange} required ></input>
                                </div> */}
                                <p className='backtologin'>Go Back to <Link to={'/login'}>Login</Link> </p>
                            <div>
                                <div className='text-center'>
                                {isLoggedIn ? <>
                                    <input className='inputbtn' id='Submit_but' type="submit" />
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    <span className="visually-hidden">Loading...</span>
                                </> : <input className='inputbtn' id='Submit_but' type="submit" />}

                                </div>
                            </div>
                            <Dialog open={show} onClose={handleClose}>
                                <DialogTitle>Enter Otp</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Please Enter Otp Which Is Sent Your Register Email
                                    </DialogContentText>

                                    <div className='container-fluid'>
                                        <div className='row gy-3 '>
                                            <div className='col form mx-sm-3 mb-2'>
                                                <input className='otp' placeholder='Enter Otp' type="number" id="otp" name="OTP" min="4" max="4" value={OTP.OTP || ""} onChange={handleotp} />
                                                <label> Password:
                                                    <input required placeholder='Password' type="password" id="password" name="password" value={inputs.password || ""} onChange={handleChange} />
                                                    <span className='eye' onClick={password_show_hide}>
                                                        <i className="fas fa-eye" id="show_eye"></i>
                                                        <i className="fas fa-eye-slash d-none" id="hide_eye"></i>
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </DialogContent>
                                <DialogActions>
                                    <button className='btn otpbtn' onClick={otp_send}>Verify</button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </form>
            </div>

        </div>
    )
}
