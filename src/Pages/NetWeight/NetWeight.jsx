import React ,{useContext}from 'react'
import Createcontext from "../../Hooks/Context/Context"
import Cookies from 'universal-cookie';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import NetWegihtPopUp from "./NetWeightpopup"
import axios from "axios";
import Box from '@mui/material/Box';
import { AiFillEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import NetwegihtEdit from "./NetWeightEdit"
import NetWetDelete from "./NetWeightDelete"
import { useSnackbar } from 'notistack';
import Tooltip from '@mui/material/Tooltip';
import useState from '../../Style'
export default function State() {
    const classes = useState()
    const { enqueueSnackbar } = useSnackbar()
    const { state , dispatch} = useContext(Createcontext)
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
    const cookies = new Cookies();
    const token_data = cookies.get('Token_access')
    const [totel, setTotal] = React.useState([])
    React.useEffect(() => {
        axios("https://api.cannabaze.com/AdminPanel/Get-NetWeight/", {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }

        }).then(response => {
            setTotal(response.data)

        })
    }, [token_data,state])


    const Submit = (params) => {


        const config = {
            headers: { Authorization: `Bearer ${token_data}` }
        };

        const data = {
            
            "Weight_type" : params.row.Weight_type.toUpperCase(),
            "Weight_Price": params.row.Weight_Price,
            "Status": params.row.Status ==="Active"  ? "Hide" : "Active"
        }
        axios.post(
            `https://api.cannabaze.com/AdminPanel/update-NetWeight/${params.row.id}`,
            data,
            config
        ).then(() => {
            dispatch({ type: 'api', api: true })
            enqueueSnackbar('Edit Net Weight success !', { variant: 'success' });
        })
    };


    const columns = [
        { field: 'Weight_type', headerName: 'Weight type',maxWidth: 150,minWidth: 80, flex: 1,  editable: true, sortable:false, headerClassName: 'super-app-theme--header' },
        { field: 'Weight_Price', headerName: 'Weight Price',maxWidth: 150,minWidth: 80, flex: 1, editable: true, sortable:false, headerClassName: 'super-app-theme--header' },
        { field: 'Status', headerName: 'Status', type: 'text',maxWidth: 150, minWidth: 80, flex: 1,editable: true, sortable:false, headerClassName: 'super-app-theme--header',
        renderCell: (params) => {

            if (params.formattedValue === "Active") {
                return (
                    <Tooltip title="Active" enterDelay={300} leaveDelay={200} arrow placement="right-start">

                    <p
                        style={{ color: "#31B665 ", fontSize: 25, cursor: "pointer" }}
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            Submit(params);
                        }}
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
                    onClick={() => {
                        Submit(params);
                    }}
                ><AiOutlineEyeInvisible /></p>
                </Tooltip>

            )
        }
     },
        { field: 'Edit', headerName: 'Edit',maxWidth: 150,minWidth: 80, flex: 1, type: 'button', sortable:false, editable: true, headerClassName: 'super-app-theme--header',
        renderCell: (params) => (
            <>
                <Box 
                 sx={{
                    '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                            borderWidth: "1px",
                            borderColor: 'black',
                        },
                    },
                   '& . MuiDataGrid-root .MuiDataGrid-cell:focus' : {
                        outline: "solid #0f1010 1px"
                    }
                }}
                 >
                    <Select  sx={{   boxShadow: '', '.MuiOutlinedInput-notchedOutline': { border: "0px" },
                        "&.Mui-focused .MuiSelect-icon": { color: "#31B665" },
                        "&:hover": {
                            ".MuiSelect-icon": {
                                color: "#31B665"
                            }
                        },}} IconComponent={BsThreeDotsVertical} labelId="demo-simple-select-error-label">
                         <NetwegihtEdit data={params.row}></NetwegihtEdit>
                         <NetWetDelete data={params.row}></NetWetDelete> 
                    </Select>
                </Box>
            </>

        )
     },


    ];

    const rows = totel
    return (
        <div className='container-fluid'>
            <div className='row'>

               
                <div className='col-10 netWeight_main_col m-2'>

                    <div className='col-12 Add_Category'>
                        <div className="col"> <h2> NetWeight
                        </h2></div>
                        <div className="col " >  <span> <h2> <NetWegihtPopUp></NetWegihtPopUp></h2></span></div>
                    </div>

                    <div className='col-12' >
                        <Box  className={classes.DataTableBoxStyle} >

                            <ThemeProvider theme={CustomFontTheme}>
                                <div style={{ height: 400, width: '100%', }}>
                                    <DataGrid rows={rows} columns={columns} 
                                         
                                        disableColumnMenu
                                        disableColumnFilter
                                        disableColumnSelector 
                                        disableSelectionOnClick 
                                        className={classes.DataTableStyle}
                                        pageSize={pageSize}
                                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                        rowsPerPageOptions={[ 10, 20]}
                                        pagination
                                    />
                                </div>
                            </ThemeProvider>
                        </Box>
                    </div>
                </div>




            </div>

        </div>


    )
}
