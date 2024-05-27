import React, { useEffect, useState ,useContext } from 'react'
import Createcontext from "../../Hooks/Context/Context"
import Cookies from 'universal-cookie';
import { DataGrid } from '@mui/x-data-grid';
import Categorypopup from './Categorypopup';
import axios from "axios"
import { RiDeleteBinLine } from "react-icons/ri";
import { useSnackbar } from 'notistack';
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import Box from '@mui/material/Box';
import CategoryEditbox from "./CategoryEdit"
import { SlSocialDropbox } from "react-icons/sl";
import Eelete from "../Category/Delete";
import {  AiOutlineEyeInvisible } from 'react-icons/ai';
import { LuEye } from "react-icons/lu";
import Tooltip from '@mui/material/Tooltip';
import  useStyles  from '../../Style';
import Deletepopup from '../../Components/Component/Deletepopup';
import { SectionCard } from '../../molecules/SectionCard/Index';
export default function Category(props) {
    const classes = useStyles()
    const { state, dispatch } = useContext(Createcontext)
    const [deleteoptn , setdeleteoprn] = useState(false)
    const [isdelete , setsisDelete] = useState(false)
    const { enqueueSnackbar } = useSnackbar();
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
    const [totel, setTotal] = React.useState([])
    const cookies = new Cookies();
    const [pageSize, setPageSize] = React.useState(10)
    const [reviewid , setreviewid] = useState('')
    const token_data = cookies.get('Token_access')
    useEffect(() => {

        axios("https://api.cannabaze.com/AdminPanel/Get-Category/", {
            headers: {
                'Authorization': `Bearer ${token_data}`
            }
        }).then(response => {

            setTotal([...response.data])
        })

    }, [state, token_data])

    function SubmitEditData(params) {
        const form = {

            "name": params.row.name,
            "Status": params.row.Status === "Active" ? "Hide" : "Active"
        }
        axios.post(`https://api.cannabaze.com/AdminPanel/update-Category/${params.row.id}`, form, {

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
    const columns = [
        { field: 'name', headerName: 'Name', editable: false,  minWidth: 150,  headerClassName: 'super-app-theme--header', headerAlign: 'left', sortable:false },
        {
            field: 'categoryImages', headerName: 'Category Images', minWidth: 220,type: 'button', editable: false, sortable:false, headerClassName: 'super-app-theme--header', headerAlign: 'rigth',align:"rigth",
            renderCell: (params) => (
               <div className='categoryTableImg'><img src={params?.row?.categoryImages} alt={"category image"} /></div>
            )
        },
        {
            field: 'Status', headerName: 'Status', type: 'number',minWidth: 150,sortable:false, editable: false, headerClassName: 'super-app-theme--header', headerAlign: 'left', align:"left",
            renderCell: (params) => {
                if (params.formattedValue === "Active") {
                    return (
                        <Tooltip title="Active" enterDelay={300} leaveDelay={200} arrow placement="right-start">
                            <p
                                style={{ color: "#31B665 ", fontSize: 24, cursor: "pointer" }}
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    state.Roles.EditCategory &&  SubmitEditData(params);
                                }}
                            >
                                <LuEye />
                            </p>
                        </Tooltip>
                    )
                }
                return (
                    <Tooltip title="Hide" enterDelay={300} leaveDelay={200} arrow placement="right-start">

                        <p
                            style={{ color: "red ", fontSize: 24, cursor: "pointer" }}
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                state.Roles.EditCategory && SubmitEditData(params);
                            }}
                        ><AiOutlineEyeInvisible /></p>
                    </Tooltip>

                )
            }
        },
        {
            field: 'Edit', headerName: 'Edit',minWidth: 150, type: 'button', editable: false, sortable:false, headerClassName: 'super-app-theme--header', headerAlign: 'rigth',align:"rigth",
            renderCell: (params) => (
                <>
                  { ( state.Roles.EditCategory || state.Roles.DeleteCategory) &&
                      
                    <Box
                        sx={{
                            "&.MuiBox-root":{
                               display:'flex',
                               justifyContent:'center',
                               alignItems:'center',
                               gap:'10px'
                            },
                            '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': {
                                    borderWidth: "1px",
                                    borderColor: 'black',
                                },
                            },
                            '& . MuiDataGrid-root .MuiDataGrid-cell:focus': {
                                outline: "#e0e0e0"
                            }
                        }}
                    >
                        
                          { state.Roles.EditCategory && <CategoryEditbox data={params.row} ></CategoryEditbox>}
                          { state.Roles.DeleteCategory && <RiDeleteBinLine size={22} color='#31B655' onClick={()=>{setdeleteoprn(true) ; setreviewid(params.row.id)}}></RiDeleteBinLine> }
                       

                     
                    </Box>
                  }  
                </>

            )
        },

    ];
    const rows = totel

    useEffect(()=>{
       
        if(Boolean(isdelete)){
      

            axios.delete(`https://api.cannabaze.com/AdminPanel/delete-Category/${reviewid}`, {
            headers: {
                'Authorization': `Bearer ${token_data}`
            }
            }).then(response => {
                axios("https://api.cannabaze.com/AdminPanel/Get-Category/", {
                    headers: {
                        'Authorization': `Bearer ${token_data}`
                    }
                }).then(response => {
                    setreviewid('')
                    setTotal([...response.data])
                    setsisDelete(false)
                })
        
            })
        }
    },[isdelete])
    return (
        <SectionCard>
            
                <div className='col-12 p-0 Add_Category d-flex justify-content-between align-items-center px-4'>
                    <h2 className='d-flex align-items-center pagetitle'> <SlSocialDropbox color='#31B655' size={25}/>Category</h2>
                    { state.Roles.AddCategory && <span>{<Categorypopup></Categorypopup>}</span>}
                </div>
                <div className='col-12 p-0'>
                    <Box className={classes.DataTableBoxStyle}>
                        <ThemeProvider theme={CustomFontTheme}>
                            <div style={{ width: '100%' }}>
                               <DataGrid    rows={rows}
                                            columns={columns} 
                                            pageSize={pageSize}
                                            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                            rowsPerPageOptions={[ 10, 20]}
                                            pagination
                                            disableColumnMenu
                                            disableColumnFilter
                                            disableColumnSelector
                                            disableSelectionOnClick 
                                            className={classes.DataTableStyle}
                                            autoHeight
                                />
                            </div>
                        </ThemeProvider>
                    </Box>
                </div>
                {   deleteoptn &&  <Deletepopup setdeleteoprn={setdeleteoprn} setsisDelete={setsisDelete} />}
        </SectionCard>
    )
}
