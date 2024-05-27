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
import Select from '@mui/material/Select';
import TaxEdit from "./TaxEdit"
import TexDelete from './TaxDelete';
import { useSnackbar } from 'notistack';
import Tooltip from '@mui/material/Tooltip';
import useStyles from '../../Style';
import { SectionCard } from '../../molecules/SectionCard/Index';

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
    const classes = useStyles()
    const cookies = new Cookies();
    const token_data = cookies.get('Token_access')
    const [totel, setTotal] = React.useState([])
    const [pageSize, setPageSize] = React.useState(5)
    React.useEffect(() => {
        axios("https://api.cannabaze.com/AdminPanel/Get-Tax/", {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }

        }).then(response => {
            setTotal([...response.data])
          
        }).catch((res)=>{
           
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
            `https://api.cannabaze.com/AdminPanel/update-Tax/${params.row.id}`,
            data,
            config
        ).then(() => {
            dispatch({ type: 'api', api: true })
            enqueueSnackbar('City Status success !', { variant: 'success' });
        })
    };
    const columns = [
        { field: 'tax_type', headerName: 'Name', minWidth: 80, flex: 1,sortable:false, editable: false, headerClassName: 'super-app-theme--header' },
        { field: 'tax_value', headerName: 'Tax', minWidth: 80, flex: 1,sortable:false, editable: false, headerClassName: 'super-app-theme--header' },
        { field: 'Status', headerName: 'Status', type: 'text',sortable:false, editable: false, minWidth: 80, flex: 1, headerClassName: 'super-app-theme--header',
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
        { field: 'Edit', headerName: 'Edit', minWidth: 70,sortable:false, flex: 1, type: 'button', editable: false, headerClassName: 'super-app-theme--header',headerAlign: 'center',align:"center",
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
      
            <SectionCard>
              
                    <div className='col-12  mb-3'>
                        <h2 className='pagetitle'> Tax </h2>
                         <h2> <Taxpop></Taxpop> </h2>
                    </div>

                    <div className='col-12' >
                        <Box className={classes.DataTableBoxStyle}
                        >

                        <ThemeProvider theme={CustomFontTheme}>
                          
                                <DataGrid rows={rows} columns={columns}  
                                pageSize={pageSize}
                                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                rowsPerPageOptions={[5, 10, 20]}
                                pagination
                                disableColumnMenu
                                disableColumnFilter
                                disableColumnSelector
                                className={classes.DataTableStyle}
                                autoHeight
                                disableSelectionOnClick 
                                />
                 
                        </ThemeProvider>
                        </Box>
                    </div>
                </SectionCard>


    )
}
