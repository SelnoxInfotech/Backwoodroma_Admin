import React,{useState , useEffect} from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { AiFillEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import { BsTrashFill } from 'react-icons/bs';
import { DataGrid } from '@mui/x-data-grid';
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { useSnackbar } from 'notistack';
import Createcontext from "../../Hooks/Context/Context"
import Successfullypopup from '../../Components/Component/Successfullypopup'
import Unsuccesspopup from '../../Components/Component/Unsuccesspopup'
import Deletepopup from '../../Components/Component/Deletepopup'
import { LuEye } from "react-icons/lu";
import { SlSocialDropbox } from "react-icons/sl";
import useStyles from '../../Style';
import {Link} from 'react-router-dom'
import { SectionCard } from '../../molecules/SectionCard/Index';
const CustomFontTheme = createTheme({
    typography: {
        fontSize: 25
    },
    components: {
        MuiContainer: {
            styleOverrides: {
                root: {
                    fontSize: 24,

                }
            }
        },
    },

});
const Vendorlist = () => {
    const [totel, setTotal] = React.useState([])
    const cookies = new Cookies();
    const classes = useStyles()
    const token_data = cookies.get('Token_access')
    const [pageSize, setPageSize] = React.useState(10)
    const { state, dispatch } = React.useContext(Createcontext)
    const [loader, setloader] = React.useState(true);
    const [sucsesopen , setsucsesopen] = useState(false)
    const [unsucsesopen , setunsucsesopen] = useState(false)
    const [deleteoptn , setdeleteoprn] = useState(false)
    const [isdelete , setsisDelete] = useState(false)
    const [deleteid , setdeleteid] = useState('')
    const { enqueueSnackbar } = useSnackbar();
    useEffect(()=>{
        if(Boolean(isdelete)){
        
      
          axios.delete(`https://api.cannabaze.com/AdminPanel/Delete-User/${deleteid}`, {
    
              headers: {
                  'Authorization': `Bearer ${token_data}`
              }
          }).then(response => {
            axios("https://api.cannabaze.com/AdminPanel/Get-AllVendor/", {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }
            }).then(response => {
                let newdata = response.data.data.map((item,index)=>{
                
                    var mydate = new Date(item.RegisterDate);
                    var month = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"][mydate.getMonth()];
                    var str =  mydate.getDate()+ ' ' + month + ' ' + mydate.getFullYear();
                
                    return {
                        id: index,
                        registerDate:str,
                        ...item
                    }
                })
            
                setTotal(newdata)
            })
          })
        }
    },[isdelete])
     React.useEffect(() => {
        setloader(true)
        axios("https://api.cannabaze.com/AdminPanel/Get-AllVendor/", {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }
        }).then(response => {
           
            let newdata = response.data.data.map((item,index)=>{
               
                var mydate = new Date(item.RegisterDate);
                var month = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"][mydate.getMonth()];
                var str =  mydate.getDate()+ ' ' + month + ' ' + mydate.getFullYear();
             
                return {
                    Sno: index+1,
                    registerDate:str,
                    ...item
                }
            })
            setloader(false)
            setTotal(newdata)
        }).catch((error)=>{
            setloader(false)
        })

    }, [state, token_data])

    const columns = [
     
        {
            field: 'Name',
            headerName: 'Name',
             minWidth: 120, flex: 1,sortable:false,
            "@media(max-width:540px)": {
                maxWidth: 90, minWidth: 40, flex: 1,

            },
            editable: false,
        },
        {
            field: 'email',
            headerName: 'Email/Phone',
             minWidth: 120, flex: 1,sortable:false,
            editable: false,
        },
        {
            field: 'StoreType',
            headerName: 'Store Type', minWidth: 120, flex: 1,sortable:false,
            editable: false,
        },
        {
            field: 'StoreName',
            headerName: 'Store Name',
            type: 'number', minWidth: 120, flex: 1,sortable:false,
            editable: false,
            headerAlign: 'left', align: "left",
        },
        {
            field: 'registerDate',
            headerName: 'Register Date',

            sortable: false, minWidth: 120, flex: 1,

        },
        {
            field: 'Status',
            headerName: 'Status',
            editable: false,
            sortable: false, minWidth: 120, flex: 1, headerAlign: 'center', align: "center",
            renderCell: (params) => {
                if (params.formattedValue === "Active") {
                    return (
                        <Tooltip title="Active" enterDelay={300} leaveDelay={200} arrow placement="right-start">
                            <p
                                style={{ color: "#31B665 ", fontSize: 25, cursor: "pointer" }}
                                variant="contained"
                                color="primary"
                            
                                onClick={() => {
                                     state.Roles.EditVendor &&
                                     SubmitEditData(params)
                                }}
                            >
                                <AiFillEye />
                            </p>
                        </Tooltip>
                    )
                }
                return (
                    <Tooltip title="Hide" enterDelay={300} leaveDelay={200} arrow placement="right-start">

                        <p
                            style={{ color: "red ", fontSize: 25, cursor: "pointer" }}
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                state.Roles.EditVendor &&
                                SubmitEditData(params);
                            }}
                        ><AiOutlineEyeInvisible /></p>
                    </Tooltip>

                )
            }

        },
        {
            field: 'Edit',
            headerName: 'Action',
            editable: false,
            sortable: false, minWidth: 120, flex: 1,
            headerAlign: 'center', align: "center",
            renderCell: (params) => {
                return (
                <React.Fragment>
                    {    state.Roles.DeleteVendor    &&
                        <Box
                        sx={{
                            "& .MuiOutlinedInput-root": {
                              "&.Mui-focused fieldset": {
                                borderWidth: "1px",
                                borderColor: "black",
                              },
                            },
                            "& . MuiDataGrid-root .MuiDataGrid-cell:focus": {
                              outline: "solid #0f1010 1px",
                            },
                          }}
                        >
                               {/* <UserDelete data={params.row}></UserDelete> */}
                               <BsTrashFill onClick={()=>{setdeleteoprn(true) ; setdeleteid(params.row.id)}}   size={18}
                    color={'#31B655'}/> 
                        </Box>
                    }
                </React.Fragment>
                )
            }

        },
        {
            field: 'View',
            headerName: 'View',
            editable: false,
            sortable: false, minWidth: 120, flex: 1,
            headerAlign: 'center', align: "center",
            renderCell: (params) => {
                return (
                  <Link to={'/Vendor'} state={params.row}><span className='view_icon'><LuEye /></span></Link>
                )
            }

        },

    ];
     const rows = totel
     function SubmitEditData(params) {
        const form = {
            "status": params.formattedValue === "Active" ? "Hide" : "Active"
        }
        axios.post(`https://api.cannabaze.com/AdminPanel/UpdateProfileForVendor/${params.id}`, form, {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }

        }).then(response => {
            if (response) {
                dispatch({ type: 'api', api: true })
                enqueueSnackbar('Edit Category Status success  !', { variant: 'success' });

            }
        }).catch(
            function (error) {
                return Promise.reject(error)
            }
        )
    }
  return (
    <>
    <SectionCard>
         <div className='col-12  mb-3'>
           <h2 className='pagetitle'> <SlSocialDropbox color='#31B655' size={25}/>  Vendor List</h2>
         </div>
        <div className='row'>
                            <Box
                               className={classes.DataTableBoxStyle}
                            >
                                <ThemeProvider theme={CustomFontTheme}>
                                     <div className='w-100'>
                                    <DataGrid
                                            rows={rows}
                                            columns={columns}
                                            getRowId={(row) => row.Sno}
                                            initialState={{
                                            pagination: {
                                                paginationModel: {
                                                pageSize: 10,
                                                },
                                            },
                                            }}
                                            pageSize={pageSize}
                                            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                            rowsPerPageOptions={[5, 10, 20]}
                                            pagination
                                            disableRowSelectionOnClick
                                            disableColumnMenu
                                            disableColumnFilter
                                            disableColumnSelector
                                            autoHeight
                                           
                                            rowSelection={false}
                                            className={classes.DataTableStyle}
                                            disableSelectionOnClick 
                                    />
                                    </div>
                                </ThemeProvider>
                            </Box>
        </div>
        {   sucsesopen && <Successfullypopup  setsucsesopen={setsucsesopen} link={'/Roles'}/>}
     {   unsucsesopen && <Unsuccesspopup setsucsesopen={setunsucsesopen} link={'/Roles'}/>}
     {   deleteoptn &&  <Deletepopup setdeleteoprn={setdeleteoprn} setsisDelete={setsisDelete} />}
    </SectionCard>
     {
        loader && <div className="loader_container">  <span className="newloader shine"><img src='/image/icon.png' alt='cannabaze logo' title='cannabaze logo' /></span>
        </div>
      }
      </>
  )
}

export default Vendorlist