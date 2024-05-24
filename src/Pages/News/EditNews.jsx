import React, { useContext, useState, useEffect, useRef } from "react";
import Successfullypopup from '../../Components/Component/Successfullypopup'
import Unsuccesspopup from '../../Components/Component/Unsuccesspopup'
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { FaEdit } from "react-icons/fa";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { LuUpload } from "react-icons/lu";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Cookies from "universal-cookie";
import Axios from "axios";
import axios from "axios";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, ContentState } from "draft-js";
import { MdFileUpload } from "react-icons/md";
import Createcontext from "../../Hooks/Context/Context";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import htmlToDraft from "html-to-draftjs";
import useStyles from "../../Style";
import EditNewsEditer from "./EditNewsEditer";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderWidth: "1px",
      borderColor: "black",
    },
    "& .MuiButtonBase-root": {
      fontSize: "1.5625rem",
      color: "#31B665",
    },
  },
}));

function BootstrapDialogTitle(props) { }
const getInitialState = (defaultValue) => {
  if (defaultValue) {
    const blocksFromHtml = htmlToDraft(defaultValue);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(
      contentBlocks,
      entityMap
    );
    return EditorState.createWithContent(contentState);
  } else {
    return EditorState.createEmpty();
  }
};

export default function NewsEdit(props) {
  const defaultValue = props?.data?.Description;

  const { state, dispatch } = useContext(Createcontext);
  const [sucsesopen, setsucsesopen] = useState(false)
  const [unsucsesopen, setunsucsesopen] = useState(false)
  const [open, setOpen] = React.useState(false);
  const classes = useStyles()
  const cookies = new Cookies();
  const token_data = cookies.get("Token_access");

  const [convertedContent, setConvertedContent] = React.useState();

  const [Category, SetCategory] = React.useState([]);
  const [SubCategory, SetSubCategory] = React.useState([]);
  const [Image, SetImage] = React.useState("");
  const inputRef = useRef(null);
  const [News, setNews] = React.useState({
    Title: props.data.Title,
    Category_id: props.data.Category_id,
    Link: props.data.Link,
    Meta_Description: props.data.Meta_Description,
    Meta_title: props.data.Meta_title,
    StrainType: props.data.StrainType,
    SubCategory_id: props.data.SubCategory_id,
    Url_slug: props.data.Url_slug,
    Alt_Text: props.data.Alt_Text,
    Image: props.data.Image,
  });

  const [error, seterror] = React.useState({
    Title: "",
    Image: "",
    Meta_Description: "",
    Url_slug: "",
    Meta_title: "",
    Alt_Text: "",
    Link: "",
  });
  const [massage, setmassage] = React.useState({
    Title: "",
    Image: "",
    Meta_Description: "",
    Url_slug: "",
    Meta_title: "",
    Alt_Text: "",
    Link: "",
  });


  const handleimage = (event) => {
    SetImage(event.target.files[0]);
  };
  const handleChange = (event) => {
    if (event.target.name === "Title") {
      const value = event.target.value;
      setNews({
        ...News,
        Title: value,
        Meta_Description: value,
        Url_slug: value.replace(/\s/g, "-"),
      });
      setmassage("");
      seterror("");
    }
    if (event.target.name === "Url_slug") {
      const value = event.target.value;
      setNews({
        ...News,
        Url_slug: value.replace(/\s/g, "-"),
      });
      setmassage("");
      seterror("");
    } else {
      const value = event.target.value;
      setNews({
        ...News,
        [event.target.name]: value,
      });
      setmassage("");
      seterror("");
    }
  };
  const resetFileInput = () => {
    // resetting the input value
    inputRef.current.value = null;
    SetImage(null);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    axios("https://api.cannabaze.com/AdminPanel/Get-NewsCategory/", {
      headers: {
        Authorization: `Bearer ${token_data}`,
      },
    }).then((response) => {
      SetCategory(response.data);
    });

    axios("https://api.cannabaze.com/AdminPanel/Get-NewsSubCategory/", {
      headers: {
        Authorization: `Bearer ${token_data}`,
      },
    }).then((response) => {
      SetSubCategory(response.data.data);
    });
  }, [token_data]);

  const formdata = new FormData();
  formdata.append("Title", News.Title);
  formdata.append("Category_id", News.Category_id);
  formdata.append("Meta_Description", News.Meta_Description);
  formdata.append("Meta_title", News.Meta_title);
  formdata.append("SubCategory_id", News.SubCategory_id);
  formdata.append("Url_slug", News.Url_slug);
  formdata.append("Alt_Text", News.Alt_Text === undefined ? "" : News.Alt_Text);
  if (News.Image === "") {
    formdata.append("Image", News.Image);
  }
  Image && formdata.append("Image", Image);

  formdata.append("Description", convertedContent === undefined ? defaultValue : convertedContent);
  formdata.append("Url_slug", News.Url_slug);
  const Submit = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token_data}`,
        "Content-Type": "multipart/form-data",
      },
    };
    Axios.post(
      `https://api.cannabaze.com/AdminPanel/update-News/${props.data.id}`,
      formdata,
      config
    )
      .then(() => {
        dispatch({ type: 'api', api: !state.api })
        setsucsesopen(true)
      })
      .catch(function (error) {
        if (error.response.data.error) {
          setmassage({ Link: error.response.data.error.Link[0] });
          seterror({ Link: "red" });
        }
        for (const [key, value] of Object.entries(error.response.data)) {
          switch (key) {
            case "Title":
              setmassage({ Title: value });
              seterror({ Title: "red" });
              break;
            case "Image":
              setmassage({ Image: value });
              seterror({ Image: "red" });
              break;
            case "Meta_Description":
              setmassage({ Meta_Description: value });
              seterror({ Meta_Description: "red" });
              break;
            case "Url_slug":
              setmassage({ Url_slug: value });
              seterror({ Url_slug: "red" });
              break;
            case "Meta_title":
              setmassage({ Meta_title: value });
              seterror({ Meta_title: "red" });
              break;
            case "Alt_Text":
              setmassage({ Alt_Text: value });
              seterror({ Alt_Text: "red" });
              break;

            default:
              return "foo";
          }
        }
        setunsucsesopen(true)
      });
  };

  const file = document.querySelector("#file");
  if (file) {
    file.addEventListener("change", (e) => {
      // Get the selected file
      const [file] = e.target.files;
      // Get the file name and size
      const { name: fileName, size } = file;
      // Convert size in bytes to kilo bytes
      const fileSize = (size / 1000).toFixed(2);
      // Set the text content
      const fileNameAndSize = `${fileName} - ${fileSize}KB`;
      document.querySelector(".file-name").textContent = fileNameAndSize;
    });
  }


  const handleDragOver = (event) => {
    event.preventDefault()
  }

  // Function to handle image drop
  const handleDrop = (event) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (file) {
      SetImage(file)
    }
  }
  useEffect(() => {
    if (!sucsesopen) {
      setOpen(false)
    }
  }, [sucsesopen, unsucsesopen])
  return (
    <div>
      <span color="success" onClick={handleClickOpen}>
     
<FaEdit size={22} color='#31B655'/>


      </span>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="Customizeed-dialog-title"
        open={open}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: {
                xs: "100%",
                sm: "90%",
                md: "80%",
                lg: "70%",
                xl: "60%",
              },
              height: {
                xs: "75%",
                sm: "75%",
                md: "75%",
                lg: "100%",
                xl: "100%",
              },
              maxWidth: "none", // Set your width here
              border: "1px solid #31B665",
              borderRadius: "15px",
            },
          },
        }}
      >
        <BootstrapDialogTitle
          id="Customizeed-dialog-title"
          onClose={handleClose}
        >
          Modal title
        </BootstrapDialogTitle>

        <DialogContent dividers>
          <div className="container-fluid ">
            <div className="row ">
              <div className="col-12">


                <h2 className="popupTitle"> Edit News</h2>{" "}

                <div className="addSubcategoryForm">
                  <div className="inputFeildasf">
                    <label className="label">Title:</label>

                    <TextField
                      type="Text"
                      placeholder=" Title"
                      id="outlined-basic"
                      name="Title"
                      variant="outlined"
                      value={News.Title}
                      style={{ minWidth: 100, fontSize: 15 }}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start"> </InputAdornment>
                        ),
                        style: { fontSize: 14 },
                      }}
                      label={massage.Title}
                      className={classes.popuptextfeild}
                    />
                  </div>
                  <div className="inputFeildasf">

                    <label className="label">Meta Title:</label>

                    <TextField
                      type="Text"
                      placeholder="Meta Title"
                      id="outlined-basic"
                      name="Meta_title"
                      variant="outlined"
                      value={News.Meta_title}
                      style={{ minWidth: 190, fontSize: 15 }}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start"> </InputAdornment>
                        ),
                        style: { fontSize: 14 },
                      }}
                      label={massage.Meta_title}
                      className={classes.popuptextfeild}
                    />

                  </div>
                  <div className="inputFeildasf">

                    <label className="label">Category:</label>

                    <Select
                      name="Category_id"
                      value={News.Category_id}
                      onChange={handleChange}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      className={classes.popupselectFeild}
                      size="small"
                    >
                      <MenuItem value="" style={{ fontSize: 15 }}>
                        <em>Select option</em>
                      </MenuItem>
                      {Category.map((Category, index) => {
                        return (
                          <MenuItem
                            value={Category.id}
                            style={{ fontSize: 15 }}
                            key={index}
                          >
                            {Category.name}
                          </MenuItem>
                        );
                      })}
                    </Select>

                  </div>
                  <div className="inputFeildasf">

                    <label className="label">Sub Category:</label>

                    <Select
                      name="SubCategory_id"
                      value={News.SubCategory_id}
                      onChange={handleChange}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      className={classes.popupselectFeild}
                      size="small"
                    >
                      <MenuItem value="" style={{ fontSize: 15 }}>
                        <em>Select option</em>
                      </MenuItem>
                      {SubCategory.map((SubCategory, index) => {
                        return (
                          <MenuItem
                            value={SubCategory.id}
                            style={{ fontSize: 15 }}
                            key={index}
                          >
                            {SubCategory.name}
                          </MenuItem>
                        );
                      })}
                    </Select>

                  </div>
                  <div className="inputFeildasf">

                    <label className="label">Featured Image:</label>
                    <input
                      type="file"
                      id="file"
                      ref={inputRef}
                      className="file"
                      onChange={handleimage}
                    />
                    {/* <label htmlFor="file">
                              UPLOAD
                              <p className="file-name"></p>
                            </label> */}
                    <label className='Imagelabel' htmlFor='file' onDragOver=


                      {handleDragOver} onDrop={handleDrop}>
                      <LuUpload size={24} color='#31B655' /> Drop files here or click to upload
                    </label>
                    <div className="w-100 text-center mt-3">
                      {Image ? (
                        <div >
                          <img
                            src={URL.createObjectURL(Image)}
                            alt=""
                            style={{
                              width: "90px",
                              height: "81px",
                              borderRadius: "10px",
                            }}
                          />
                          <Button onClick={resetFileInput} color="success">
                            Cancel{" "}
                          </Button>
                        </div>
                      ) : News.Image !== "" ? (
                        <div >
                          <img
                            src={News.Image}
                            alt=""
                            style={{
                              width: "90px",
                              height: "81px",
                              borderRadius: "10px",
                            }}
                          />
                          <Button
                            name="Image"
                            value=""
                            onClick={handleChange}
                            color="success"
                          >
                            Cancel{" "}
                          </Button>
                        </div>
                      ) : (
                        <MdFileUpload
                          style={{
                            backgroundColor: "#31B665",
                            borderradius: "66px",
                          }}
                        ></MdFileUpload>
                      )}
                    </div>
                  </div>
                  <div className="inputFeildasf">

                    <label className="label">Alt Text:</label>

                    <TextField
                      type="text"
                      placeholder="Add Alt Text"
                      name="Alt_Text"
                      value={News.Alt_Text}
                      id="outlined-basic"
                      variant="outlined"
                      style={{ minWidth: 190, fontSize: 15 }}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start"> </InputAdornment>
                        ),
                        style: { fontSize: 14 },
                      }}
                      label={massage.Alt_Text}
                      className={classes.popuptextfeild}
                    />

                  </div>


                  <div className="inputFeildasf">

                    <label className="label">Url slug :</label>

                    <TextField
                      type="Text"
                      placeholder=" Url slug"
                      name="Url_slug"
                      value={News.Url_slug}
                      id="outlined-basic"
                      variant="outlined"
                      style={{ minWidth: 190, fontSize: 15 }}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start"> </InputAdornment>
                        ),
                        style: { fontSize: 14 },
                      }}
                      label={massage.Url_slug}
                      className={classes.popuptextfeild}
                    />

                  </div>
                  <div className="inputFeildasf">
                    <label className="label">Meta Description :</label>
                    <TextField
                      type="Text"
                      placeholder="Meta Description"
                      id="outlined-basic"
                      name="Meta_Description"
                      variant="outlined"
                      value={News.Meta_Description}
                      style={{ minWidth: "100%", fontSize: 15 }}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start"> </InputAdornment>
                        ),
                        style: { fontSize: 14 },
                      }}
                      label={massage.Meta_Description}
                      className={classes.popuptextfeild}
                    />
                  </div>
                  <div className="inputFeildasf">

                    <label className="label">Description:</label>

                    <Box
                      sx={{
                        "& .rdw-editor-toolbar": {
                          width: "100%",
                         
                        },
                        "& .rdw-editor-wrapper": {
                          height: "240px",
                          // width: "991px",
                          marginBottom:'70px',
                         },
                        ".rdw-editor-main": {
                          background: "",
                          border: "1px solid #c4c4c4",
                          padding: "3px",
                        },
                      }}
                    >

                      <EditNewsEditer
                        defaultValue={defaultValue}
                        convertedContent={convertedContent} setConvertedContent={setConvertedContent}
                      ></EditNewsEditer>
                    </Box>

                  </div>
                  <div className="col-12 center top">
                    <button
                      className="topbutton"
                      color="success"
                      autoFocus
                      onClick={Submit}
                    >
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "#31B665" }} autoFocus onClick={handleClose}>
            Exit
          </Button>
        </DialogActions>
        {sucsesopen && <Successfullypopup setsucsesopen={setsucsesopen} link={'/News'} popupset={setOpen} />}
        {unsucsesopen && <Unsuccesspopup setsucsesopen={setunsucsesopen} link={'/News'} popupset={setOpen} />}
      </BootstrapDialog>
    </div>
  );
}
