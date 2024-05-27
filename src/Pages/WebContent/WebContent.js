import React, { useEffect , useState} from 'react'
import { SectionCard } from '../../molecules/SectionCard/Index'
import { SlSocialDropbox } from "react-icons/sl";
import Box from '@mui/material/Box';
import { Editor } from "react-draft-wysiwyg"; 
import Editortoolbar, { modules, formats } from "./Editortoolbar";
import { FaTrashAlt } from "react-icons/fa";
import {
    CitySelect,
    CountrySelect,
    StateSelect,
  } from "react-country-state-city";
  import "react-country-state-city/dist/react-country-state-city.css";
  import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import draftToHtml from "draftjs-to-html";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import  './Webcontent.css'
import { EditorState } from "draft-js";
import TextField from '@mui/material/TextField';
import useStyles from '../../Style';
const WebContent = () => {
    const [age, setAge] = React.useState('');
    const [convertedContent, setConvertedContent] = React.useState("");
    const [city, setcity] = React.useState([]);
    const [state, setstate] = React.useState([]);
    const [value, setValue] = useState('');
    const [contary, setcontary] = React.useState([]);
    const [countryid, setCountryid] = useState(0);
    const [stateid, setstateid] = useState(0);
    const classes  = useStyles()
    const [isfaq , setIsaq] = useState(false)
    const [faqscount, setfaqscount] = React.useState([{
        title:'',
        answer:''
    }]);
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
    const [editorState, setEditorState] = React.useState(() =>
        EditorState.createEmpty()
      );
    
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
    const handleChange = (event) => {
      setAge(event.target.value);
    };
    // const handleContentStateChange = (contentState) => {
    //     setConvertedContent(draftToHtml(contentState));
    // };
    // const handleEditorStateChange = (editorState) => {
    //     setEditorState(editorState);
    // };
    const questionchange=(e , index)=>{
        faqscount[index].title =e.target.value;
        setfaqscount([...faqscount])
    }
    const removefaqbox=(indx)=>{
           let a= faqscount.filter((item ,index)=>{
            return index !== indx
           })
           setfaqscount(a)
    }
    console.log(faqscount)
  return (
    <SectionCard >
        <div className='col-12 Add_Category m-2  mb-3 px-4'>
            <h2 className='pagetitle '> <SlSocialDropbox color='#31B655' size={25}/>  Add Content  </h2>
        
        </div>
        <div className='col-12 '>
       
        <div className='webcontentform'>
        
                    <div className='row'>
                        <div className='col-lg-3 col-md-6'>
                            <label className='label_faq'>Title </label>
                            <Box >
                                   <FormControl fullWidth>
                                            <Select
                                                className={classes.faqselectBox}
                                                id="demo-simple-select"
                                                value={age}
                                                onChange={handleChange}
                                            >
                                                <MenuItem value={'Dispensaries'} className={classes.faqtitlelistitem}>Weed Dispensaries</MenuItem>
                                                <MenuItem value={'Deliveries'} className={classes.faqtitlelistitem}>Weed Deliveries</MenuItem>
                                            </Select>
                                    </FormControl>
                               
                            </Box>
                        </div>
                        <div className='col-lg-3 col-md-6'>
                        <label className='label_faq'> Contary</label>
                  
                            <CountrySelect
                            onChange={(e) => {
                            setCountryid(e.id);
                            setcontary(e.name)
                            }}
                            placeHolder="Select Country"
                            containerClassName='locationcontainerstyle'
                            inputClassName='locationinputstyle'
                            />
                        </div>
                        <div className='col-lg-3 col-md-6'>
                        <label className='label_faq'>State </label>
                        {/* <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={state}
                            className={classes.faqautofeild}
                            renderInput={(params) => <TextField {...params} />}
                        /> */}
                            <StateSelect
                        countryid={countryid}
                        onChange={(e) => {
                        setstateid(e.id);
                        setstate(e.name)
                        }}
                        containerClassName='locationcontainerstyle'
                        inputClassName='locationinputstyle'
                        placeHolder="Select State"
                    />
                        </div>
                        <div className='col-lg-3 col-md-6'>
                        <label className='label_faq'>City</label>
                        {/* <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={city}
                            className={classes.faqautofeild}
                            renderInput={(params) => <TextField {...params} />}
                        /> */}
                            <CitySelect
                        countryid={countryid}
                        stateid={stateid}
                        containerClassName='locationcontainerstyle'
                        inputClassName='locationinputstyle'
                        onChange={(e) => {
                        setcity(e.name)
                        }}
                        placeHolder="Select City"
                    />
                        </div>
                    </div>
                    <div className='row my-5'>
                        <div className='col-12'>
                            <div>
                                <label className='label_faq'>Title</label>
                                <TextField id="outlined-basic" placeholder='Title' variant="outlined" className={classes.faqtextfeild} />
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
                                "& .quill":{
                                    height:'250px',
                                }
                                }}
                            >
                                {/* <Editor
                                    editorState={editorState}
                                    toolbar={toolbar}
                                    localization={localization}
                                    onEditorStateChange={handleEditorStateChange}
                                    onContentStateChange={handleContentStateChange}
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    editorClassName="editorClassName"
                                /> */}
                                <Editortoolbar  />
                                <ReactQuill theme="snow" value={value} onChange={setValue}
                                    modules={modules}
                                    formats={formats}
                                />
                                </Box>
                            </div>
                        </div>
                    </div>
                    <div className='row my-3'>
                        <div className=' my-5  d-flex justify-content-between align-items-center'>
                            <h3 className=''>FAQs</h3>
                            <div className='faqtoggle'>
                                <label class="container"> Open
                                    <input type="checkbox" checked={isfaq} onChange={()=>{setIsaq(!isfaq)}} />
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
                                            faqscount.map((items , index)=>{
                                                return <div className='faqinputbox' key={index}>
                                                        <input type='text' value={items.title} placeholder='Question' onChange={(e)=>{questionchange(e ,index)}} />
                                                        <textarea placeholder='Answer' value={items.answer}></textarea>
                                                            {
                                                                index !== 0 &&  
                                                                <span className='removefaqbtn' onClick={()=>{removefaqbox(index)}}><FaTrashAlt /></span>
                                                            } 
                                                        </div>
                                            })
                                        }
                                           
                                    </div>
                                    <button className='addfaqbtn' onClick={()=>{setfaqscount([...faqscount ,{
                                                            title:'',
                                                            answer:''
                                                        }])}}>Add FAQs</button>
                                </div>
                            </div>
                        }
                    </div>
                    <div className='row'>
                        <div className='d-flex justify-content-end gap-3'>
                            <button className='faqsubmitbtn' > Submit</button>
                            <button className='faqcancelbtn'>Cancel</button>
                        </div>
                    </div>
          
        </div>
        </div>
    </SectionCard> 
  )
}
export default WebContent