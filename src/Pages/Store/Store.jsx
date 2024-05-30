import React, { useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import axios from "axios";
import { SlSocialDropbox } from "react-icons/sl";
import Cookies from 'universal-cookie';
// import Storepopup from "./Storepopup"
import StoreEdit from './StoreEdit';
import StoreView from "./StoreView"
import StoreDelete from "./StoreDelete"
import { AiFillEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Createcontext from '../../Hooks/Context/Context';
import { useSnackbar } from 'notistack';
import Tooltip from '@mui/material/Tooltip';
import useStyles from '../../Style';
import { Link, useNavigate } from 'react-router-dom';
import { SectionCard } from '../../molecules/SectionCard/Index';
export default function Store() {
    const { enqueueSnackbar } = useSnackbar();
    const classes = useStyles()
    const { state, dispatch } = useContext(Createcontext)
    const cookies = new Cookies();
    const token_data = cookies.get('Token_access')
    const [totel, setTotal] = React.useState([])
    const [pageSize, setPageSize] = React.useState(10)
    const Navigate = useNavigate()
    
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
      if(state.Roles.EditStore){  
        const formdata = new FormData();
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
            field: 'Edit', headerName: 'Edit', editable: false, minWidth: 80, maxWidth:'100px',  flex: 1,sortable:false, headerClassName: 'super-app-theme--header',
            renderCell: (params) => (
                <>
                {( state.Roles.EditStore ||  state.Roles.DeleteStore || state.Roles.ViewStore) &&
                    <Box  sx={{
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
                    }} >
                       
                                        {state.Roles.EditStore && <StoreEdit data={params.row}></StoreEdit> }
                                        { state.Roles.DeleteStore && <StoreDelete data={params.row} ></StoreDelete> }
                                        {   state.Roles.ViewStore && <StoreView></StoreView> }
                     
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
    useEffect(()=>{
        window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    },[])
    return (
        <SectionCard>
            <div className='row'>
                    <div className='col-12  mb-3 d-flex justify-content-between'>
                        <h2>  <SlSocialDropbox color='#31B655' size={25}/> Store  <span className='total_count'>{`(${totel?.length})`}</span> </h2>
                        { state.Roles.AddStore &&  <button className='topbutton' onClick={()=>{Navigate("/addstore")}}>Store Add</button>  }
                    </div>
                    <Box className={classes.DataTableBoxStyle} >
                        <div className='col-12' >
                            <Box>
                                <ThemeProvider theme={CustomFontTheme}>
                                    <div style={{ width: '100%', }}>
                                        <DataGrid autoHeight rows={rows} editable={false}  columns={columns}  
                                        pageSize={pageSize}
                                        disableColumnMenu
                                        disableColumnFilter
                                        disableColumnSelector
                                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                        rowsPerPageOptions={[5, 10, 20]}
                                        pagination
                                        className={classes.DataTableStyle}
                                        disableSelectionOnClick 
                                        />
                                    </div>
                                </ThemeProvider>
                            </Box>
                        </div>

                    </Box>
            </div>
        </SectionCard>
    );
}