import React, { useRef, useState, useContext } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import { AiOutlineCloudUpload } from "react-icons/ai";
import Successfullypopup from '../../Components/Component/Successfullypopup'
import Unsuccesspopup from '../../Components/Component/Unsuccesspopup'
import { SectionCard } from '../../molecules/SectionCard/Index'
import { TextField } from "@material-ui/core";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Cookies from "universal-cookie";
import Axios from "axios";
import axios from "axios";

import Editer from "../../Components/Editer/Editer"
import InputAdornment from "@mui/material/InputAdornment";
import Createcontext from "../../Hooks/Context/Context";
import { SlSocialDropbox } from "react-icons/sl";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import useStyles from "../../Style";
import { useNavigate } from 'react-router-dom'

export default function Newspop() {
  const form = useForm({
    defaultValue: {
      Title: "",
      Meta_title: "",
    },
  });
  const [sucsesopen, setsucsesopen] = useState(false)
  const [unsucsesopen, setunsucsesopen] = useState(false)
  const classes = useStyles()
  const navigate = useNavigate()
  const { register, handleSubmit, formState, watch, reset } = form;
  const { errors } = formState;
  const { dispatch } = useContext(Createcontext);
  const inputRef = useRef(null);
  const cookies = new Cookies();
  const token_data = cookies.get("Token_access");
  const [Category, SetCategory] = React.useState([]);
  const [SubCategory, SetSubCategory] = React.useState([]);
  const [Image, SetImage] = React.useState("");
  const [loading, Setloading] = React.useState(false);
  const [Description, SetDescription] = React.useState('')
  const [News, setNews] = React.useState({
    Title: "",
    Category_id: "",
    Link: "",
    Meta_Description: "",
    Meta_title: "",
    StrainType: "None",
    SubCategory_id: "",
    Url_slug: "",
    Alt_Text: "",
  });

  const [error, seterror] = React.useState({
    Title: "",
    Image: " ",
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
  const toolbar = {
    options: ['blockType', 'inline', 'list', 'colorPicker', 'link', 'image'],
    blockType: {
      inDropdown: true,
      options: ['H2', 'H3', 'H4', 'Normal', 'Blockquote']
    },
    inline: {
      inDropdown: false,
      options: ['bold', 'italic', 'underline']
    },
    link: {
      defaultTargetOption: '_self',
      options: ['link', 'unlink']
    },
    list: { options: ['ordered', 'unordered'] },
    image: {
      urlEnabled: true,
      uploadEnabled: true,
      alignmentEnabled: true,
      uploadCallback: undefined,
      alt: { present: true, mandatory: true }
    }
  };

  const localization = {
    locale: 'en-us',
    translations: {
      'generic.add': 'Add',
      'generic.cancel': 'Cancel',
      'components.controls.blocktype.normal': 'Normal',
      'components.controls.blocktype.h2': 'Heading 2',
      'components.controls.blocktype.h3': 'Heading 3',
      'components.controls.blocktype.h4': 'Heading 4  ',
      'components.controls.blocktype.blockquote': 'Blockquote',
      'components.controls.link.link': 'Link',
      'components.controls.link.unlink': 'Unlink',
      'components.controls.image.image': 'Image',
      'components.controls.image.fileUpload': 'File Upload',
      'components.controls.image.byURL': 'URL',
      'components.controls.image.dropFileText': 'Drop the file or click to upload'
    }
  };

  const handleimage = (event) => {
    SetImage(event.target.files[0]);
    setmassage("");
    seterror({ Image: "white" });
  };
  const handleChange = (event) => {
    const value = event.target.value;
    setNews({
      ...News,
      [event.target.name]: value,
    });
    setmassage("");
    seterror("");
  };
  React.useEffect(() => {
    axios("https://api.cannabaze.com/AdminPanel/Get-NewsCategory/", {
      headers: {
        Authorization: `Bearer ${token_data}`,
      },
    }).then((response) => {
      SetCategory(response?.data);

      setNews((Category) => ({
        ...Category,
        Category_id: response?.data[0]?.id,
      }));
    });

    axios("https://api.cannabaze.com/AdminPanel/Get-NewsSubCategory/", {
      headers: {
        Authorization: `Bearer ${token_data}`,
      },
    }).then((response) => {
      SetSubCategory(response?.data?.data);
      setNews((Category) => ({
        ...Category,
        SubCategory_id: response?.data?.data[0]?.id,
      }));
    });
  }, [token_data]);

  const Submit = (data) => {
    console.log(Description)
    const formdata = new FormData();
    formdata.append("Title", data.Title);
    formdata.append("Category_id", News.Category_id);
    formdata.append("Meta_Description", data.Meta_Description);
    formdata.append(
      "Meta_title",
      News.Meta_title === "" ? News.Title : News.Meta_title
    );
    formdata.append("SubCategory_id", News.SubCategory_id);
    formdata.append(
      "Url_slug",
      News.Url_slug === "" ? News.Title : News.Url_slug
    );
    formdata.append("Alt_Text", data.Alt_Text);
    formdata.append("Image", Image);
    formdata.append("Description", Description);
    Setloading(true);
    const config = {
      headers: { Authorization: `Bearer ${token_data}` },
    };
    Axios.post(
      "https://api.cannabaze.com/AdminPanel/Add-News/",
      formdata,
      config
    ).then(() => {
      dispatch({ type: "api", api: true });

      setNews((Brand) => ({
        ...Brand,
        Title: "",
        Link: "",
        Meta_Description: "",
        Meta_title: "",
        Url_slug: "",
        Alt_Text: "",
      }));
      reset();
      SetImage("");
      Setloading(false);
      setsucsesopen(true)
    })
      .catch(function (error) {
        Setloading(false);
        setunsucsesopen(true)

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
  React.useEffect(() => {
    setNews({
      ...News,
      Title: watch("Title"),
      Url_slug: watch("Title")?.replace(/\s/g, "-"),
      Meta_title: watch("Title"),
    });
  }, [watch("Title")]);

  return (
    <div className="container-fluid ">
      <SectionCard className="row">
        <form onSubmit={handleSubmit(Submit)}>
          <div className="row justify-content-between">
            <div className="col-lg-7">
              <div className="col-12 Add_Category center">

                <h2 className='d-flex align-items-center pagetitle'> <SlSocialDropbox color='#31B655' size={25} />Add News</h2>

              </div>
              <div className="addnewinputbox  ">

                <label >
                  <span className="required">*</span>
                  Title:
                </label>
                <TextField
                  type="Text"
                  fullWidth
                  placeholder="Title"
                  id="outlined-basic"
                  name="Title"
                  className={classes.addnewstext}

                  variant="outlined"
                  label={massage.Title}
                  inputRef={register({
                    required: "Title is Required",
                  })}
                  error={Boolean(errors?.Title)}
                  helperText={errors?.Title?.message}
                />

              </div>
              <div className="col gap-5  justify-content-between mb-4" style={{ display: "flex" }}>
                <div className="col " >
                  <div className="">
                    <label >Category:</label>
                  </div>

                  <Select
                    fullWidth
                    name="Category_id"
                    value={News.Category_id}
                    onChange={handleChange}
                    displayEmpty
                    // size="small"
                    inputProps={{ "aria-label": "Without label" }}
                    className={classes.addnewselect}
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
                <div className="col">

                  <label >Sub Category:</label>

                  <Select
                    name="SubCategory_id"
                    value={News.SubCategory_id}
                    onChange={handleChange}
                    displayEmpty
                    fullWidth
                    // size="small"
                    inputProps={{ "aria-label": "Without label" }}
                    className={classes.addnewselect}
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
              </div>
              <div className=" addnewinputbox  ">

                <label >
                  <span className="required">*</span>
                  Description:
                </label>
                <Editer SetDescription={SetDescription} Description={Description}></Editer>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="  ">
                <div className="col-12 Add_Category center">

                  <h2> SEO</h2>

                </div>
              </div>
              <div className=" addnewinputbox">

                <label >
                  <span className="required">*</span>
                  Meta Title:
                </label>

                <TextField
                  type="Text"
                  placeholder="Title... "
                  id="outlined-basic"
                  name="Meta_title"
                  value={News.Meta_title}
                  onChange={handleChange}
                  fullWidth

                  variant="outlined"
                  label={massage.Meta_title}
                  className={classes.addnewstext}
                  inputRef={register({
                    required: " Meta Title is Required",
                    maxLength: { value: 60, message: 'Character limit is only 60' },
                  })}
                  error={Boolean(errors?.Meta_title)}
                  helperText={errors?.Meta_title?.message}
                />
                {News.Meta_title.length > 160 && <span className="required">Maximum limit is 160 Characters</span>}

              </div>
              <div className="  addnewinputbox ">

                <label >
                  <span className="required">*</span>
                  Url slug :
                </label>

                <TextField
                  type="Text"
                  placeholder="https://"
                  name="Url_slug"
                  value={News.Url_slug}
                  id="outlined-basic"
                  fullWidth
                  variant="outlined"
                  onChange={handleChange}
                  label={massage.Url_slug}
                  className={classes.addnewstext}
                  inputRef={register({
                    required: "Url Slug is Required",
                  })}
                  error={Boolean(errors?.Url_slug)}
                  helperText={errors?.Url_slug?.message}
                />

              </div>
              <div className=" addnewinputbox">

                <label >
                  <span className="required">*</span>
                  Meta Description :
                </label>

                <TextField
                  type="Text"
                  placeholder="Meta description"
                  id="outlined-basic"
                  name="Meta_Description"
                  fullWidth
                  variant="outlined"
                  label={massage.Meta_Description}
                  className={classes.addnewstext}
                  inputRef={register({
                    required: "Meta Description is Required",
                    maxLength: { value: 160, message: 'Character limit is only 160' },
                  })}
                  error={Boolean(errors?.Meta_Description)}
                  helperText={errors?.Meta_Description?.message}
                />

              </div>

              <div className="mb-4">
                <label >
                  Banner  <span className="required">*</span>
                </label>
                <div className="image_uploade" >

                  {Image ? (
                    <div className="addnewsimagebox">
                      <img
                        src={URL.createObjectURL(Image)}
                        alt=""
                        style={{
                          width: "90px",
                          height: "81px",
                          borderRadius: "10px",
                        }}
                      />
                      <Button color="success" onClick={() => { SetImage('') }}>
                        Cancel
                      </Button>
                    </div>
                  ) :
                    <div className="addnewsimagebox">
                      <input
                        type="file"
                        id="file"
                        ref={inputRef}
                        className="file"
                        onChange={handleimage}
                        accept="image/png, image/gif, image/jpeg"
                      />
                      <label htmlFor="file">
                        <AiOutlineCloudUpload size={32} />  Drop files here or click to upload
                      </label>
                    </div>
                  }

                </div>
              </div>
              {
                Image &&

                <div className="  addnewinputbox ">

                  <label >
                    <span className="required">*</span>
                    Alt Text:
                  </label>

                  <TextField
                    type="text"
                    placeholder="Add Alt Text"
                    name="Alt_Text"
                    id="outlined-basic"

                    InputProps={{
                      disableUnderline: true,
                      startAdornment: (
                        <InputAdornment position="start"> </InputAdornment>
                      ),

                    }}
                    label={massage.Alt_Text}
                    className={classes.addnewstext}
                    inputRef={register({
                      required: "Alt_Text is Required",
                    })}
                    error={Boolean(errors?.Alt_Text)}
                    helperText={errors?.Alt_Text?.message}
                  />
                </div>
              }
            </div>
          </div>


          <div className="col-12 d-flex justify-content-start gap-4 mb-4 top">
            <LoadingButton
              loading={loading}
              autoFocus
              onClick={() => { navigate('/News') }}
              style={{
                backgroundColor: "rgb(49, 182, 101)",
                color: "white",
                fontSize: "14px",
              }}
            >
              Cancel
            </LoadingButton>
            <LoadingButton
              loading={loading}
              autoFocus
              type="submit"
              style={{
                backgroundColor: 'white',
                color: "rgb(49, 182, 101)",
                fontSize: "14px",
                border: '1px solid #31B655'
              }}

            >
              Add News
            </LoadingButton>

          </div>
        </form>
      </SectionCard>
      {sucsesopen && <Successfullypopup setsucsesopen={setsucsesopen} link={'/News'} />}
      {unsucsesopen && <Unsuccesspopup setsucsesopen={setunsucsesopen} link={'/News'} />}
    </div>
  );
}
