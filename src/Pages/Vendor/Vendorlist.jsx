import React from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { AiFillEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { useSnackbar } from 'notistack';
import UserDelete from './DeleteVendor'
import { BsThreeDotsVertical } from 'react-icons/bs';
import Createcontext from "../../Hooks/Context/Context"
import {Select , MenuItem} from '@mui/material';
import { LuEye } from "react-icons/lu";

import {Link} from 'react-router-dom'
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
    const token_data = cookies.get('Token_access')
    const [pageSize, setPageSize] = React.useState(5)
    const { state, dispatch } = React.useContext(Createcontext)
    const { enqueueSnackbar } = useSnackbar();
     React.useEffect(() => {

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
            headerName: 'Edit',
            editable: false,
            sortable: false, minWidth: 120, flex: 1,
            headerAlign: 'center', align: "center",
            renderCell: (params) => {
                return (
                <React.Fragment>
                    {    state.Roles.DeleteVendor    &&
                        <Box
                            sx={{
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
                            <Select sx={{
                                boxShadow: '', '.MuiOutlinedInput-notchedOutline': { border: "0px" },
                                "&.Mui-focused .MuiSelect-icon": { color: "#31B665" },
                                "&:hover": {
                                    ".MuiSelect-icon": {
                                        color: "#31B665"
                                    }
                                },
                            }} IconComponent={BsThreeDotsVertical} labelId="">
                            <UserDelete data={params.row}></UserDelete>
                            
                            </Select>
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
                  <Link to={'/Vendor'}><span className='view_icon'><LuEye /></span></Link>
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
    <div className='row'>
<Box
                            sx={{
                                width: '100%',
                                
                                '& .MuiDataGrid-columnHeaders': {
                                    backgroundColor: '#E1FFED',
                                },
                                '& .MuiButton-root': {
                                    color: "#FFFFFF",
                                    display: "flex",
                                    width: "200px"
                                },
                                // check
                                ".MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within": {
                                    outline: "none"
                                },

                            }}
                        >
                            <ThemeProvider theme={CustomFontTheme}>

                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    autoHeight
                                    initialState={{
                                        pagination: {
                                            paginationModel: {
                                                pageSize: 5,
                                            },
                                        },
                                    }}
                                    getRowId={(row) =>
                                       row?.id
                                    }
                                    pageSize={pageSize}
                                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                    rowsPerPageOptions={[5, 10, 20]}
                                    pagination
                                    disableRowSelectionOnClick
                                    disableColumnMenu
                                    disableColumnFilter
                                    disableColumnSelector
                                    sx={{
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
                                        "&.MuiDataGrid-root .MuiDataGrid-columnSeparator": {
                                            visibility: "hidden"
                                        },
                                        " &.MuiDataGrid-root .MuiDataGrid-cellContent": {
                                            fontSize: "14px"
                                        }

                                    }}
                                />
                            </ThemeProvider>
                        </Box>
    </div>
  )
}

export default Vendorlist