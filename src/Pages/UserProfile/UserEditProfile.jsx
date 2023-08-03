import React from "react"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import useStyles from "../../Style";
import { AiFillCamera } from "react-icons/ai"
import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import { MdModeEditOutline } from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {FaUser} from "react-icons/fa"
const UserEditProfile = () => {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Edit user profile
            </Button>
            <Dialog className={classes.userEditProfileDialog} open={open} onClose={handleClose}>
                <div className="container-fluid">

                    <div className="row">
                        <div className="col-12 userEditProfileContainer">
                            <div className="col-12 editProfile_headings">
                                <div className="col-6 userEditProfileHeadingCol">
                                    <p className="EditProfileHeadingStyle">Edit Profile</p>
                                </div>
                                <div className="col-6 editProfileEdit_Icons">
                                    <Box className={classes.UserEditButton}>

                                        <LoadingButton
                                            endIcon={<MdModeEditOutline color='#707070' size={20} />}
                                        >Edit</LoadingButton>
                                    </Box>

                                </div>

                            </div>
                            <div className="col-12 userProfileEdit_imageContainer">
                                <section className="d-flex">
                                    <div className="imageContainer">
                                        <LazyLoadImage className="userEditProfleImage" src="./image/blank_Image.webp" />
                                    </div>
                                    <div className=" inputLabel_image">
                                        <label htmlFor="Add photo" className="userEdit_photo_label">
                                            <div className='center'>
                                                <AiFillCamera color="#000000" size={22} />
                                            </div>
                                            <div className="changePhoto_title mx-0">Upload photo</div>

                                            <input
                                                type="file"
                                                accept="image/*"
                                                hidden
                                                id="Add photo"


                                            />
                                        </label>
                                    </div>
                                </section>


                            </div>
                            <div className="col-12 userEditNameFlex">
                                <div className="col-4 userEditNameIconFlex ">
                                  <span><FaUser/></span><span>Name</span>
                                </div>
                                <div className="col-8">

                                </div>

                            </div>


                        </div>

                    </div>

                </div>
            </Dialog>

        </React.Fragment>
    )
}
export default UserEditProfile