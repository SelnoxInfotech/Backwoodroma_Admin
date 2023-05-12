import React ,{useContext} from 'react'
import Createcontext from "../../Hooks/Context/Context"
import Cookies from 'universal-cookie';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import axios from "axios";
import Taxpop from "./Taxpopup";
import Box from '@mui/material/Box';
import { AiFillEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TaxEdit from "./TaxEdit"
import TexDelete from './TaxDelete';
import { useSnackbar } from 'notistack';
import Tooltip from '@mui/material/Tooltip';

export default function Tax() {
    const { enqueueSnackbar } = useSnackbar();
    const { state ,dispatch} = useContext(Createcontext)
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
        axios("http://backend.sweede.net/AdminPanel/Get-Tax/", {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }

        }).then(response => {
            setTotal([...response.data])
           

        })
    }, [token_data,state])


    const Submit = (params) => {
        
        const config = {
            headers: { Authorization: `Bearer ${token_data}` }
        };

        const data = {
            "id": params.row.id,
            "tax_value" : params.row.tax_value,
            "tax_type": params.row.tax_type,
            "Status": params.row.Status === "Active" ? "Hide" : "Active"
        }
        axios.post(
            `http://backend.sweede.net/AdminPanel/update-Tax/${params.row.id}`,
            data,
            config
        ).then(() => {
            dispatch({ type: 'api', api: true })
            enqueueSnackbar('City Status success !', { variant: 'success' });
        })
    };


    const columns = [
        { field: 'tax_type', headerName: 'Name',maxWidth: 150, minWidth: 80, flex: 1, editable: false, headerClassName: 'super-app-theme--header' },
        { field: 'tax_value', headerName: 'Tax',maxWidth: 150, minWidth: 80, flex: 1, editable: false, headerClassName: 'super-app-theme--header' },
        { field: 'Status', headerName: 'Status', type: 'text', editable: false,maxWidth: 150, minWidth: 80, flex: 1, headerClassName: 'super-app-theme--header',
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
        { field: 'Edit', headerName: 'Edit',maxWidth: 150, minWidth: 70, flex: 1, type: 'button', editable: false, headerClassName: 'super-app-theme--header',headerAlign: 'center',align:"center",
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
                   
                }}
                 >
                    <Select   sx={{
                        boxShadow: '', '.MuiOutlinedInput-notchedOutline': { border: "0px" },
                        "&.Mui-focused .MuiSelect-icon": { color: "#31B665" },
                        "&:hover": {
                            ".MuiSelect-icon": {
                                color: "#31B665"
                            }
                        },
                    }} IconComponent={BsThreeDotsVertical} labelId="demo-simple-select-error-label">
                        <TaxEdit data={params.row}></TaxEdit>
                  <TexDelete data={params.row}></TexDelete>
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
                <div className='col-10 tax_main_row'>

                    <div className='col-12 Add_Category mt-2'>
                        <div className="col"> <h2> Tax
                        </h2></div>
                        <div className="col cat_but" >  <span className='btn cat_pop_btn'> <h2> <Taxpop></Taxpop> </h2></span></div>
                    </div>

                    <div className='col-12' >
                    <Box sx={{
                            height: 400,
                            width: '100%',
                            overflowX:"hidden",
                             // check
                             ".MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within":{
                                outline:"none"
                              },
                            '& .MuiDataGrid-columnHeaders': {
                                backgroundColor: '#E1FFED',
                            },
                            '& .MuiButton-root': {
                                color: '#FFFFFF',
                                display: "flex",
                            },
                            "@media(max-width:436px)": {
                                '& .MuiButton-root': {
                                    display: "contents",
                                    width: "150px",
                                    fontSize: "9px"
                                },

                            },
                          
                           
                        }}>

                        <ThemeProvider theme={CustomFontTheme}>
                            <div style={{ height: 400, width: '100%', }}>
                                <DataGrid rows={rows} columns={columns} components={{ Toolbar: GridToolbar }} checkboxSelection
                                  sx={{
                                    "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                                        outline: "none",
                                      
                                    },
                                    ".MuiDataGrid-toolbarContainer":{
                                       backgroundColor:"#31B665"     
                                    },
                                    "@media(max-width:436px)": {
                                        ".MuiDataGrid-toolbarContainer": {
                                            gap: "5px",

                                        }
                                    },
                                  
                                    "&.MuiDataGrid-root  .MuiDataGrid-columnHeader:focus": {
                                        outline: "none"
                                    },
                                    "&.MuiDataGrid-root .MuiDataGrid-columnSeparator": {
                                        visibility: "hidden"
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
                </div>




            </div>

        </div>


    )
}
