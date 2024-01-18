import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import axios from "axios";
import Cookies from 'universal-cookie';
import Storepopup from "./Storepopup"
import { BsThreeDotsVertical } from 'react-icons/bs';
import Select from '@mui/material/Select';
import StoreEdit from './StoreEdit';
import StoreView from "./StoreView"
import StoreDelete from "./StoreDelete"
import { AiFillEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Createcontext from '../../Hooks/Context/Context';
import { useSnackbar } from 'notistack';
import Tooltip from '@mui/material/Tooltip';
export default function Store() {
    const { enqueueSnackbar } = useSnackbar();
    const { state, dispatch } = useContext(Createcontext)
    const cookies = new Cookies();
    const token_data = cookies.get('Token_access')
    const [totel, setTotal] = React.useState([])
    const [pageSize, setPageSize] = React.useState(5)
    React.useEffect(() => {
        axios("https://api.cannabaze.com/AdminPanel/Get-Stores/", {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }

        }).then(response => {
            setTotal(response.data)

        })
    }, [token_data, state])


    const Submit = (params) => {
      if(state.Roles.EditStore){  const formdata = new FormData();
        formdata.append('Store_Name', params.row.Store_Name);
        formdata.append('Store_Type', params.row.Store_Type);
        formdata.append('LicenceNo', params.row.LicenceNo);
        formdata.append('Store_Address', params.row.Store_Address);
        formdata.append('Stores_Website', params.row.Stores_Website);
        formdata.append('Stores_MobileNo', params.row.Stores_MobileNo);
        formdata.append('Status', params.row.Status === "Active" ? "Hide" : "Active");
        formdata.append('city_id', params.row.city_id)


        const cookies = new Cookies();
        const token_data = cookies.get('Token_access')

        const config = {
            headers: { Authorization: `Bearer ${token_data}` }
        };


        axios.post(
            `https://api.cannabaze.com/AdminPanel/update-Stores/${params.row.id}`,
            formdata,
            config
        ).then(() => {
            dispatch({ type: 'api', api: true })
            enqueueSnackbar('Edit Store Status  success !', { variant: 'success' });
        })}
    };

    const columns = [
        
        { field: 'Store_Name', headerName: 'Name', editable: false, minWidth: 60, flex: 1, sortable:false,headerClassName: 'super-app-theme--header' },
        { field: 'Store_Type', headerName: 'Store Type', editable: false, minWidth: 60, flex: 1,sortable:false, headerClassName: 'super-app-theme--header' },
        { field: 'Stores_MobileNo', headerName: 'MobileNo', editable: false, minWidth: 60, flex: 1,sortable:false, headerClassName: 'super-app-theme--header' },
        {
            field: 'Status', headerName: 'Status', editable: false, minWidth: 60, flex: 1,sortable:false, headerClassName: 'super-app-theme--header',

            renderCell: (params) => {

                if (params.formattedValue === "Active") {
                    return (
                        <Tooltip title="Active" enterDelay={300} leaveDelay={200} arrow placement="right-start">

                            <p
                                style={{ color: "#31B665 ", fontSize: 25, cursor: "pointer" }}
                                variant="contained"
                                color="primary"
                                onClick={() =>Submit(params)}
                            ><AiFillEye /> </p>
                        </Tooltip>

                    )
                }
                return (
                    <Tooltip title="Hide" enterDelay={300} leaveDelay={200} arrow placement="right-start">

                        <p
                            style={{ color: "red ", fontSize: 25, cursor: "pointer" }}
                            variant="contained"
                            color="primary"
                            onClick={() =>Submit(params)  }
                        ><AiOutlineEyeInvisible /></p>
                    </Tooltip>

                )
            }
        },
        {
            field: 'Edit', headerName: 'Edit', editable: false, minWidth: 80, flex: 1,sortable:false, headerClassName: 'super-app-theme--header',
            renderCell: (params) => (
                <>
                {( state.Roles.EditStore ||  state.Roles.DeleteStore || state.Roles.ViewStore) &&
                    <Box >
                        <Select
                            sx={{
                                boxShadow: '', '.MuiOutlinedInput-notchedOutline': { border: "0px" },
                                "&.Mui-focused .MuiSelect-icon": { color: "#31B665" },
                                "&:hover": {
                                    ".MuiSelect-icon": {
                                        color: "#31B665"
                                    }
                                },
                            }}
                            IconComponent={BsThreeDotsVertical} labelId="demo-simple-select-error-label"   >
                                        {   state.Roles.EditStore && <StoreEdit data={params.row}></StoreEdit> }
                                        {   state.Roles.DeleteStore && <StoreDelete data={params.row} ></StoreDelete> }
                                        {   state.Roles.ViewStore && <StoreView></StoreView> }
                        </Select>
                    </Box>
                }
                </> 

            )
        },

    ];

    const rows = totel;
    const CustomFontTheme = createTheme({
        typography: {
            fontSize: 25,
            colors: "#31B665"
        },
        components: {
            MuiContainer: {
                styleOverrides: {
                    root: {

                        fontSize: 24
                    }
                }
            }
        }
    });
    return (
        <div className='row'>
        

                <div className='col-12 Add_Category margin_top m-2 mt-5 mb-5'>
                    <div className="col"> <h2>Store  <span className='total_count'>{`(${totel.length})`}</span>
                    </h2></div>
                     { state.Roles.AddStore &&
                       <div className="col  popup_A" > <span> <h2><Storepopup></Storepopup> </h2></span></div>
                     }

                </div>


                <Box sx={{
                    height: 400,
                    width: '100%',
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: '#E1FFED',
                    },
                    ".MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within": {
                        outline: "none"
                    },
                    '& .MuiButton-root': {
                        color: '#FFFFFF',
                        display: "flex",
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

                }}>

                    <div className='col-12' >
                        <Box>
                            <ThemeProvider theme={CustomFontTheme}>
                                <div style={{ width: '100%', }}>
                                    <DataGrid autoHeight rows={rows} editable={false}  columns={columns}  checkboxSelection
                                    pageSize={pageSize}
                                    disableColumnMenu
                                    disableColumnFilter
                                    disableColumnSelector
                                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                    rowsPerPageOptions={[5, 10, 20]}
                                    pagination
                                        sx={{
                                            ".MuiDataGrid-toolbarContainer": {
                                                backgroundColor: "#31B665"
                                            },
                                            "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                                                outline: "none ",
                                            },
                                            "@media(max-width:768px)": {
                                                ".MuiDataGrid-toolbarContainer": {
                                                    gap: "10px",

                                                }
                                            },
                                            "&.MuiDataGrid-root .MuiDataGrid-columnSeparator": {
                                                visibility: "hidden"
                                            },
                                            "@media(max-width:546px)": {
                                                ".MuiDataGrid-toolbarContainer": {
                                                    gap: "5px",

                                                }
                                            },
                                            "&.MuiDataGrid-root .MuiDataGrid-row:hover": {
                                                backgroundColor: "#FFFFFF"
                                            },
                                        }}

                                    />
                                </div>
                            </ThemeProvider>
                        </Box>
                    </div>

                </Box>
        </div>
    );
}