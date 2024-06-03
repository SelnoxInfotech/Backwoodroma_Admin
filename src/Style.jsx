import { makeStyles } from "@material-ui/core/styles";
import './App.css'
const useStyles = makeStyles(theme =>(
  {
      FilledTextFieldStyle: {
        "& .MuiFilledInput-root:hover": {
          background: "#F2F1F1"
        },
        "& .MuiInputBase-input.MuiFilledInput-input": {
          padding: "18px",
        },
        "& .MuiFilledInput-underline:after": {
          borderBottomColor: "#31B665"
        },
        "& input::placeholder": {
          fontSize: "12px"
        },
      
        " && .MuiFilledInput-underline:hover::before": {
          borderColor: "#31B665",
        },
        "& input": {
          "&:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 1000px #F2F1F1 inset"

          }
        }
      },
      textFieldFocusBorderColor: {
        "& .MuiOutlinedInput-root": {
          width:'100%',
          "& .MuiOutlinedInput-input": {
            backgroundColor:'White',
            padding:'10px 15px',
            fontSize:'16px',
            fontWeight:'400',
          },
          " &.Mui-focused fieldset": {
            borderColor: "#31B665",
          },
          '&:hover fieldset': {
            borderColor: '#31B665', // - Set the Input border when parent has :hover
          },
        }
      },
      locationBox:{
        width:'100%',
        "& .MuiAutocomplete-root":{
          width:'100%',
          backgroundColor:'#fff',
          "& .MuiFormControl-root":{
            "& .MuiInputBase-root":{
              padding:'4px !important' ,
            }
          }
        }
       
      },
      mobilenobox:{
         backgroundColor:'#fff',
         "& .MuiFormControl-root":{
         
          "& .MuiInputBase-root":{
            padding:'5px',
            border:'1px solid gray',
            borderRadius:'4px',
            "&.Mui-focused":{
               border:'2px solid #31B655 !important',
            },
            "&::before":{
              display:'none',
            },
            "&::after":{
              borderColor:'#31B655',
              border:'1px solid #31B655',
              display:'none',
            },
            "& .MuiButtonBase-root":{
                "& svg":{
                  margin:'0'
                }
            },
            "& .MuiInputBase-input":{
               fontSize:'16px',
            }
          },
         
 
         }
      },
      signupMuiPhone: {
        "&.MuiTextField-root": {
          width: "50%",
          marginTop: "15px"

        },
        "@media(max-width:700px)": {
          "&.MuiTextField-root": {
            width: "100%",

          },
        }
      },
      signupNameTextFieldWidth: {
        "&.MuiTextField-root": {
          width: "42%",

        },
        "& .MuiOutlinedInput-root": {
          " &.Mui-focused fieldset": {
            borderColor: "#31B665",
          },
          '&:hover fieldset': {
            borderColor: '#31B665', // - Set the Input border when parent has :hover
          },
        },

        "@media(max-width:700px)": {
          "&.MuiTextField-root": {
            width: "100%",

          },
        }
      },
   
      signuproleSelectDropdown: {
        "&.MuiFormControl-root": {
          width: "42%"
        },
        "@media(max-width:700px)": {
          "&.MuiFormControl-root": {
            width: "100%"
          },
        },
        "& .MuiOutlinedInput-root": {
          " &.Mui-focused fieldset": {
            borderColor: "#31B665",
          },
          '&:hover fieldset': {
            borderColor: '#31B665', // - Set the Input border when parent has :hover
          },
        }


      },
      signupStatusSelectDropdown: {
        "&.MuiFormControl-root": {
          width: "50%"
        },
        "@media(max-width:700px)": {
          "&.MuiFormControl-root": {
            width: "100%"
          },
        },
        "& .MuiOutlinedInput-root": {
          " &.Mui-focused fieldset": {
            borderColor: "#31B665",
          },
          '&:hover fieldset': {
            borderColor: '#31B665', // - Set the Input border when parent has :hover
          },
        }


      },
      SignuploadingBtnTextAndBack: {
        "& .MuiButton-text": {
          fontSize: ".5rem",
        },
        "& .MuiLoadingButton-root": {
          fontSize: "14px",
          width: "25%",
          height: "38px",
          borderRadius: "4px",
          backgroundColor: "#ffff",
          color: "#31B665",
          textTransform: "none",
          border: "2px solid #31B665"
        },
        "& .MuiButtonBase-root:hover": {
          color: "#ffff",
          backgroundColor: "#00b96a",
          border: "2px solid #31B665"
        },
      },
      Username: {
        '& .MuiOutlinedInput-root': {
          '&.Mui-focused fieldset': {
            borderWidth: "1px",
            borderColor: '#31B665',
          },
        },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
          borderColor: "#31B665"
        },
      },
      SubmitLoginButton:{
        textAlign:'center',
        '& .MuiLoadingButton-root':{
          color:'#FFFFFF',
          backgroundColor:"#31B665",
            margin:'0 auto',
            marginTop:"10px",
            fontSize:"15px",
            width:"49%",
            height:"30px",
            textTransform:"none",
          
          },
          '& .MuiLoadingButton-root:hover':{
            color:'#31B665',
          borderWidth:'1px',
          borderColor:'#31B665',
          border:'solid',
            marginTop:"10px",
            fontSize:"15px",
            backgroundColor:'#fff',
          },

        '& .MuiLoadingButton-outlined':{
          outlined:"#31B665"
        }
      
    
      },
      generalRoleViewBTn:{
        '& .MuiLoadingButton-root':{
        
          color:'#31B665',
          fontSize:"10px",
          width:"30%",
          border:"1px solid #31B665",
          borderRadius:"20px",
          height:"24px",
          
        },
        '& .MuiLoadingButton-root:hover':{
          border:"1px solid #31B665",
          backgroundColor:"#31B665",
          color:"#FFFFFF"
        },
        "@media(max-width:600px)":{
          '& .MuiLoadingButton-root':{
            width: "63px",
            height: "20px",
            fontSize:" 7px",
            padding: "4px"


          }
        },
      '& .MuiLoadingButton-outlined':{
        outlined:"#31B665"
      }
      },
      signupTextFieldWidth: {
        "&.MuiTextField-root": {
          width: "50%",
          marginTop: "15px"
        },
        "@media(max-width:700px)": {
          "&.MuiTextField-root": {
            width: "100%",

          },
        },
        "& .MuiOutlinedInput-root": {
          " &.Mui-focused fieldset": {
            borderColor: "#31B665",
          },
          '&:hover fieldset': {
            borderColor: '#31B665', // - Set the Input border when parent has :hover
          },
        }
      }, 
      RoleAndPermissionSearchBarTextfield: {
        "&.MuiTextField-root":{
          width:"75%"
        },
        "@media(max-width:500px)":{
          "&.MuiTextField-root":{
            width:"100%"
          },
        },
        "&.MuiTextField-root fieldset": {
          borderRadius:"25px",
        },
      
        "& .MuiOutlinedInput-root": {
          " &.Mui-focused fieldset": {
            borderColor: "#31B665",
          },
          '&:hover fieldset': {
            borderColor: '#31B665', // - Set the Input border when parent has :hover
          borderRadius:"25px"

          },
        }
      },
      textFeilddesign: {
        fontSize:'16px',
        "& .MuiOutlinedInput-root": {
          fontSize:'15px',
          " &.Mui-focused fieldset": {
            borderColor: "#31B665",
          },
          '&:hover fieldset': {
            borderColor: '#31B665', // - Set the Input border when parent has :hover
          },
        }
      }, 
      userEditProfileDialog: {
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            minWidth: "42%",
            padding:"50px",
            height: "auto",  // Set your width here
            borderRadius: "20px",
            background: "#FFFFFF",
            "@media(max-width:992px)": {
              minWidth: "60%",
              padding:"20px",
              },
            "@media(max-width:600px)": {
            minWidth: "90%",
            padding:"20px",
            }
          },

        },

      },
      UserEditButton:{
        '& .MuiLoadingButton-root':{
            color:'#595959',
            marginTop:"10px",
            fontSize:"15px",
            textTransform:"none",
          },
          '& .MuiLoadingButton-root:hover':{
            color:'#595959',
          },

        '& .MuiLoadingButton-outlined':{
          outlined:"#31B665"
        }
      

      },
      userEdit_loadingBtn: {
        "& .MuiButton-text": {
          fontSize: ".5rem",
        },
        "& .MuiLoadingButton-root": {
          width: "100%",
          height: "50px",
          borderRadius: "5px",
          backgroundColor: "#F7F7F7",
          color: "#707070",
          textTransform: "none",
          border: "1px solid #31B665",
          fontWeight: "700",
          fontSize: "14px"
        },
        "& .MuiButtonBase-root:hover": {
          color: "#31B665",
          backgroundColor: "#FFFFFF",
          border: "1px solid #31B665"
        },
      },
      userEditCancel_loadingBtn: {
        "& .MuiButton-text": {
          fontSize: ".5rem",
        },
        "& .MuiLoadingButton-root": {
          width: "100%",
          height: "50px",
          borderRadius: "5px",
          backgroundColor: "#F7F7F7",
          color: "#979797",
          textTransform: "none",
          border: "1px solid #F7F7F7",
          fontWeight: "700",
          fontSize: "14px"
        },
        "& .MuiButtonBase-root:hover": {
          color: "#979797",
          backgroundColor: "#FFFFFF",
          border: "1px solid #979797"
        },
      },
      promotionalCheckBoxFontSize:{
        '& .MuiFormControlLabel-label': { 
          fontSize: '20px',color:"#000000" ,
          "@media(max-width:600px)":{
          fontSize: '14px',

          }
        }
      },
      muiPromotioCheckBox:{
       
        "&.MuiFormGroup-root":{
          display:'flex',
          gap:'10px',
          flexDirection:'row',
        },
        "& .MuiSvgIcon-root": {
          fill: "#31B665",
          display:"flex",
          fontSize:"25px"
        },
      },
      PromotionalBtn:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        gap:'10px',
        '& .MuiLoadingButton-root':{
          color:'#31B665',
          marginTop:"10px",
          fontSize:"14px",
          width:"40%",
          border:"1px solid #31B665",
          borderRadius:"8px",
          height:"35px",
          textTransform:"none"
        },
        '& .MuiLoadingButton-root:hover':{
          border:"1px solid #31B665",
          color:"#FFFFFF",
          backgroundColor:"#31B665"
        },
        "@media(max-width:600px)":{
          '& .MuiLoadingButton-root':{
            width: "131px",
            height: "30px",
            fontSize:" 7px",
            padding: "9px"


          }
        },
        '& .MuiLoadingButton-outlined':{
          outlined:"#31B665"
        }
      },
      model_content_banner:{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        width:'800px',
        padding:'10px',
        "@media(max-width:992px)":{
          width: "80%",
        },
      },
      modelImagedestop:{
        width: "400px",
        height: "100px",
        borderRadius: "1px",
        "@media(max-width:600px)":{
          width: "90%",
        },
      },
      modelImagemobile:{
        width: "200px",
        height: "100px",
        borderRadius: "1px",
      
      },
      bannerlisttable:{
        height:'610px',
                                "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                                    outline: "none",
                                },
                                "&.MuiDataGrid-root  .MuiDataGrid-columnHeader:focus": {
                                    outline: "none"
                                },
                                "&.MuiDataGrid-root  .MuiDataGrid-cell:focus": {
                                    outline: "none",

                                },
                                "&.MuiDataGrid-root .MuiDataGrid-row:hover": {
                                    backgroundColor: "#FFFFFF"
                                },
                                "& .MuiDataGrid-columnHeaderTitle":{
                                        fontSize:'12px',
                                },
                                '& .MuiDataGrid-cellContent':{
                                    fontSize:'12px',
                                },
                                "& .MuiDataGrid-row":{
                                    margin:'10px 0 0px',
                                    minHeight:'unset !important',
                                    maxHeight:'unset !important',
                                },
                                width: '100%',
                                "@media(max-width:768px)": {
                                    ".MuiDataGrid-toolbarContainer": {
                                        gap: "10px",

                                    }
                                },
                                "@media(max-width:546px)": {
                                    ".MuiDataGrid-toolbarContainer": {
                                        gap: "5px",

                                    }
                                },
                                ".MuiDataGrid-toolbarContainer": {
                                    flexDirection: "block",

                                    backgroundColor: "#31B665",
                                    width: {
                                        xs: "100%",
                                        sm: "100%",
                                        md: "100%",
                                        lg: "100%",
                                        xl: "100%"

                                    },
                                },
                                "&.MuiDataGrid-root .MuiDataGrid-columnSeparator": {
                                    visibility: "hidden"
                                },
                                "&.MuiDataGrid-root .MuiDataGrid-columnHeaderDraggableContainer": {
                                    width: "120px"
                                }
      },
      bannerSelector:{
        
          backgroundColor:'#31B655',
          width:'200px',
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#31B655',
        },
        "& .MuiSelect-select":{
          fontSize:'16px',
          color:'#fff',
          padding: "12px 15x",
          fontWeight:'600',
        },
        '.MuiSvgIcon-root': {
            color: '#fff'
        },
        '&:before': {
            borderBottom: `1px solid #31B655`
        },
        '&:hover': {
            ':before': {
                borderBottom: `1px solid #31B655`
            }
        },
        '& .MuiMenuItem-root': {
            backgroundColor: 'dark.primary'
        },
        '& .MuiMenu-paper': {
            backgroundColor: 'dark.primary'
        },
        '@media(maxWidth: 568px)' : {
            width:'auto',
          },
          "& .MuiSelect-select":{
            fontSize:'12px',
            color:'#fff',
            padding: "8px 15px "
          },
      },
      promotionalListBtnss:{
        '& .MuiLoadingButton-root':{
          color:'#FFFFFF',
          fontSize:"14px",
          width:"26%",
          border:"1px solid #404040",
          backgroundColor:"#404040",
          borderRadius:"8px",
          height:"35px",
          textTransform:"none",
          display: "flex",
          justifyContent: "flex-start"
        },
        '& .MuiLoadingButton-root:hover':{
          border:"1px solid #404040",
          color:"#FFFFFF",
          backgroundColor:"#404040"
        },
        "@media(max-width:600px)":{
          '& .MuiLoadingButton-root':{
            width: "131px",
            height: "30px",
            fontSize:" 7px",
            padding: "9px"


          }
        },
        "@media(max-width:480px)":{
          '& .MuiLoadingButton-root':{
            width: "auto",
            height: "auto",
            fontSize:" 12px",
            padding: "6px 15px"
          }
        },
      },
      sidebarIcon:{
        height : '40px !important', 
        width : '40px !important', 
        display:'flex',
        fontSize:'2.4rem !important',
        alignItems:'center',
        justifyContent:'center',
        '& .MuiIcon-root':{
          height : '40px !important', 
          width : '40px !important', 
          display:'flex',
          
        },
        '@media (max-width: 1536px)': {
          height : '35px !important', 
        width : '35px !important', 
        display:'flex',
        fontSize:'2rem !important',
        }
      },
      StandardTextFieldStyle:{

        '& .MuiInputBase-input':
        { fontSize: '14px',
        [theme.breakpoints.up("sm")]: {
          fontSize: '16px',
        }, },
        '&.Mui-focused fieldset': {
          borderColor: '#31B655',
          border:'none',
        },
    
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'black',
          },
          '&:hover fieldset': {
            borderColor: '31B655',
          },
            '&.Mui-focused fieldset': {
              borderColor: '31B655',
            },
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "#31B665"
        },
        "& input::placeholder": {
          fontSize: "14px",
          [theme.breakpoints.up("sm")]: {
            fontSize: '16px',
          }, 
        },
        " && .MuiInput-root:hover::before": {
            borderColor: "#31B665",
        },
        "& input": {
            "&:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 1000px #FFFFFF inset"
            }
        },
        "& input:focus-width": {
          "&:-webkit-autofill": {
              WebkitBoxShadow: "0 0 0 1000px #FFFFFF inset"
          }
      }
      },
      selectformbox:{
        fontSize:'17px',
        "&.MuiOutlinedInput-root":{

        },
        "& .MuiOutlinedInput-input":{
           fontSize:'16px',
           padding:'10px 15px',
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline":{
           border:'2px solid #31B655',
           borderColor:'#31B655'
        }
      },
      selectrolesoptions:{
         "&.MuiButtonBase-root":{
          fontSize:'14px',
         }
      },
      loginBtnStyle:{
        marginTop:'20px',
        "& .MuiButton-text": {
          color: "#fff",
          fontSize: "16px", 
          fontWeight:'600',
        },
        "& .MuiButton-text:hover": {
          color: "#999",
          fontSize: "16px",
        },
        "& .MuiLoadingButton-root": {
          textTransform: "none",
          width: "100%",
          color:"#31B655",
          backgroundColor:'#fff',
          borderRadius:"5px",
          border:'1px solid #31B655'
        },
        "& .MuiLoadingButton-root:hover": {     
          background:"#E8FFF1",
          textTransform: "none",
          color:"#fff",
          backgroundColor:'#31B655',
        }
      },
      dashboardselect:{
        minWidth:'80px',
        fontSize:'14px !important',
        fontWeight:'600 !important',
        padding:'7px 15px !important',
        backgroundColor:'rgb(249, 249, 249)',
        '&.MuiSelect-root ': {
          backgroundColor:'rgb(249, 249, 249)',
          color: 'text.light'
          },
          '& .MuiSelect-select': {
            padding:'0  25px 0 0 !important',
            backgroundColor:'rgb(249, 249, 249)',
          },
          "&.MuiOutlinedInput-root": {
            " &.Mui-focused fieldset": {
              border: "1px solid #BFBFBF",
            },
      
            '&:hover fieldset': {
              borderColor: '#BFBFBF', 
            },
          },
          "&.MuiInputBase-root": {
            width: "140px",
            height: "38px",
          
          },
          "&.MuiOutlinedInput-input": {
           
          },
          "&.MuiSelect-nativeInput": {
            height: "33px",
           
          }
      },
      categorypopupselect:{
        width:'100%',
        display:'block',
        marginTop:'20px',
        '& .MuiInputBase-input':{
          padding:'0',
          color: ' rgba(60, 60, 67, 0.60)',
          fontFamily: 'Inter',
          fontSize: '17px',
          fontStyle: 'normal',
          fontWeight: '400',
          lineHeight: '22px', 
        },
        '& .MuiOutlinedInput-notchedOutline':{
          border:"none",
          borderBottom:'1px solid black',
          borderRadius:'0',
        },
        "& .MuiSelect-select":{
          textAlign:'left',
        }
      },
      categorypopuptext:{
        width:'100%',
        '& .MuiInputBase-input':{
          padding:'0',
          color: ' rgba(60, 60, 67, 0.60)',
          fontFamily: 'Inter',
          fontSize: '17px',
          fontStyle: 'normal',
          fontWeight: '400',
          lineHeight: '22px', 
        },
        '& .MuiOutlinedInput-notchedOutline':{
           border:'none',
           borderBottom:'1px solid #222',
           borderRadius:'0',
        }
      },
      DataTableBoxStyle:{
       

          width: '100%',
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#F9FAFC',
            color: '#B5B7C0'
          },
          '& .MuiButton-root': {
            color: "#FFFFFF",
            display: "flex",
            width: "200px"
          },
          "& .MuiDataGrid-root": {
            border: 'none',
          },
          "& .MuiDataGrid-columnHeaderTitle":{
              fontSize:'12px',
              fontFamily:' Inter, sans-serif',
          },
          "& .MuiDataGrid-cell .MuiDataGrid-cellContent":{
            fontSize:'12px',
            fontFamily: 'Inter, sans-serif',
            fontWeight:'500',
            color:'black',
          },
          // check
          ".MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within": {
            outline: "none"
          },

          "@media(max-width:767px)": {
            '& .MuiButton-root': {
              display: "contents",
              width: "150px",
              margin: "2px",
              fontSize: "14px"
            },

          },
          "@media(max-width:546px)": {
            '& .MuiButton-root': {
              display: "contents",
              width: "150px",
              fontSize: "9px"
            },

          },
          "@media(min-width:768px)": {
            '& .MuiButton-root': {
              width: "110px",
              margin: "2px",
              fontSize: "14px"
            },

            "&.MuiDataGrid-root .MuiDataGrid-columnHeaderDraggableContainer": {
              width: "120px"
            }
          }
      
      },
      DataTableStyle:{
        minHeight:'300',
        "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
          outline: "none",
        },
        "&.MuiDataGrid-root  .MuiDataGrid-columnHeader:focus": {
          outline: "none"
        },
        "&.MuiDataGrid-root  .MuiDataGrid-cell:focus": {
          outline: "none",

        },
        "&.MuiDataGrid-root .MuiDataGrid-row:hover": {
          backgroundColor: "#FFFFFF"
        },
        "&.MuiDataGrid-root .MuiDataGrid-row.Mui-selected": {
          backgroundColor: '#fff',
        },
        "&.MuiDataGrid-root .MuiDataGrid-row.Mui-selected:hover": {
          backgroundColor: '#fff',
        },
        "& .MuiToolbar-root":{
            "& .MuiTablePagination-selectLabel":{
              fontSize:'14px',
            },
            "& .MuiInputBase-root":{
              fontSize:'14px',
            },
            "& .MuiTablePagination-displayedRows":{
              fontSize:'14px',
            },
            "& .MuiTablePagination-actions":{
              "& .MuiButtonBase-root":{
                "& .MuiSvgIcon-root":{
                  width:'20px',
                  height:'20px',  

                }
              }
            }
        }, 
        width: '100%',
        "@media(max-width:768px)": {
          ".MuiDataGrid-toolbarContainer": {
            gap: "10px",

          }
        },
        "@media(max-width:546px)": {
          ".MuiDataGrid-toolbarContainer": {
            gap: "5px",

          }
        },
        ".MuiDataGrid-toolbarContainer": {
          flexDirection: "block",

          backgroundColor: "#31B665",
          width: {
            xs: "100%",
            sm: "100%",
            md: "100%",
            lg: "100%",
            xl: "100%"

          },
        },
        "&.MuiDataGrid-root .MuiDataGrid-columnSeparator": {
          visibility: "hidden"
        },
        "&.MuiDataGrid-root  .MuiDataGrid-footerContainer p":{
          marginBottom:'0',
        }
  
      },
      popuptextfeild:{
         width:'100%',
         '& .MuiInputBase-input':{
            padding:'7px',
         }
         ,"& .MuiInputBase-root":{
            "&:hover":{
              "& fieldset":{
                borderColor:'#E0E0E0',
              }
            }
         }
      },
      popupselectFeild:{
        width:'100%',
        fontSize:'15px',
        fontWeight:'400',
        "&.MuiInputBase-root":{
           "&:hover":{
            "& fieldset":{
              borderColor:'#E0E0E0'
            }
           }
        },
        '& .MuiSelect-select':{
           padding:'7px 20px',
           fontSize:'15px',
           "&:hover":{
            "& fieldset":{
              border:'none'
            }
           }
        },
        '& .MuiSelect-nativeInput':{
           border:'none',
        }
      },
      addnewstext:{
          // width:'100%',
          "& .MuiInputBase-root":{
            fontSize:' 14px ',
            // fontWeight:' 400 ',
            // lineHeight: '21px ',
            // letterSpacing: '0em ',
            textAlign: 'left ',
            color:'#000 ',
            // padding:'10px 0',
          },
       
          "& .MuiInput-underline":{
             "&::before":{
              // borderBottom:"none",
             },
             "&:hover":{

             },
          },
          "& .MuiFormHelperText-root":{
            fontSize:'12px'
          }
      },
      addnewselect:{
        width:'100%',
        // fontFamily: 'Poppins !important',
        // fontSize: '14px !important',
        // fontWeight: '400 !important',
        // lineHeight: '21px !important',
        // letterSpacing: '0em !important',
        // textAlign: 'left !important',
        color:'#000',

        // "& fieldset":{
        //   border:'none !important'
        // },
      },
      faqtextfeild:{
          width:'100%', 
          fontSize:'14px',
          marginBottom:'20px !important',
          "& .MuiOutlinedInput-root": {
            fontSize:'15px',
            " &.Mui-focused fieldset": {
              borderColor: "#31B665",
            },
            '&:hover fieldset': {
              borderColor: '#31B665', // - Set the Input border when parent has :hover
            },
          },
          "& .MuiOutlinedInput-input":{
                padding:'10px',
          }
      },
      faqselectBox:{
        fontSize:'14px !important',
         "&.Mui-focused":{
              "& .MuiOutlinedInput-notchedOutline":{
                  borderColor:'#31B655 !important'
              }, 
         },
         "& .MuiOutlinedInput-input":{
            padding:'10px'
         },
         '& #my-simple-select': {
          fontSize: '2rem',
       }
      },
      faqtitlelistitem:{
        "&.MuiMenuItem-root":{
          fontSize:'14px',
        },
      }
      ,
      faqautofeild:{
              "&.Mui-focused":{
                  "& .MuiOutlinedInput-notchedOutline":{
                    borderColor:'#31B655 !important'
                }},
                "& .MuiOutlinedInput-root":{
  fontSize:'14px'
                }
      },
      otppopup:{
        "& .MuiDialog-container":{
          "& .MuiPaper-root":{
            "& .MuiDialogTitle-root":{
              fontSize:'18px',
              fontWeight:'600',
              lineHeight:'1.5',
              color:'#31B655',
            },
            "& .MuiDialogContentText-root":{
              fontSize:"14px",
              fontWeight:'400',
              color:'#a7a7a7',
             marginBottom:'20px',
            },
            "& .MuiDialogActions-root":{
                 "& button":{
                  fontSize:'14px',
                  fontWeight:'500',
                  lineHeight:'1.5',
                  color:'#fff',
                  backgroundColor:'#31B655',
                  border:'none',
                  padding:'5px 10px',
                  borderRadius:'5px',
                 }
            }
          }
        }
       
        
      }
  }
))
export default useStyles