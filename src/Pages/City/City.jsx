import React, { useContext } from 'react'
import Cookies from 'universal-cookie';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import CityPopUp from "./Citypopup"
import axios from "axios";
import Box from '@mui/material/Box';
import { AiFillEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Select from '@mui/material/Select';
import { BsThreeDotsVertical } from 'react-icons/bs';
import CityEdit from './CityEdit';
import CityDelete from "./CityDelete"
import Createcontext from "../../Hooks/Context/Context"
import { useSnackbar } from 'notistack';
import Tooltip from '@mui/material/Tooltip';
import useStyles from '../../Style';
import {SectionCard} from '../../molecules/SectionCard/Index'
export default function City() {
    const classes = useStyles()
    const { enqueueSnackbar } = useSnackbar();
    const { state, dispatch } = useContext(Createcontext)
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
        axios("https://api.cannabaze.com/AdminPanel/Get-Cities/", {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }

        }).then(response => {
            setTotal(response.data)

        })
    }, [token_data, state])

    const Submit = (params) => {

        const config = {
            headers: { Authorization: `Bearer ${token_data}` }
        };

        const data = {

            "CityName": params.row.CityName,
            "States_id": params.row.States_Name,
            "Status": params.row.Status === "Active" ? "Hide" : "Active"
        }
        axios.post(
            `https://api.cannabaze.com/AdminPanel/update-Cities/${params.row.id}`,
            data,
            config
        ).then(() => {
            dispatch({ type: 'api', api: true })
            enqueueSnackbar('City Status success !', { variant: 'success' });
        })
    };

    const columns = [
        { field: 'CityName', headerName: 'City', maxWidth: 150, minWidth: 110, flex: 1, editable: true,sortable:false, headerClassName: 'super-app-theme--header' },
        { field: 'state_name', headerName: 'States',  maxWidth: 150, minWidth: 90, flex: 1, editable: true,sortable:false, headerClassName: 'super-app-theme--header' },
        {
            field: 'Status', headerName: 'Status',  maxWidth: 150, minWidth: 90, flex: 1,editable: false, width: 300,sortable:false, headerClassName: 'super-app-theme--header',
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
        {
            field: 'Edit', headerName: 'Edit', maxWidth: 150, minWidth: 80, flex: 1,sortable:false, type: 'button', editable: true, headerClassName: 'super-app-theme--header', headerAlign: 'left',align:"left",
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
                            '& . MuiDataGrid-root .MuiDataGrid-cell:focus': {
                                outline: "solid #0f1010 1px"
                            }
                        }} >
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
                            IconComponent={BsThreeDotsVertical} labelId="demo-simple-select-error-label">
                             <CityEdit data={params.row} city={totel}  ></CityEdit>
                          <CityDelete data={params.row}></CityDelete>
                        </Select>
                    </Box>
                </>

            )
        },


    ];

    const rows = totel
    return (
            <SectionCard>
                    <div className='col-12 d-flex justify-content-between align-item-center'>
                         <h2 className='pagetitle'> City</h2>
                         <span> <h2> <CityPopUp></CityPopUp></h2></span>
                    </div>

                    <div className='col-12' >
                        <Box className={classes.DataTableBoxStyle}>


                            <ThemeProvider theme={CustomFontTheme}>
                                <div style={{ height: 400, width: '100%', }}>
                            
                                    <DataGrid  rows={rows} columns={columns} 
                                     disableColumnMenu
                                     disableColumnFilter
                                     disableColumnSelector
                                     disableSelectionOnClick 
                                     className={classes.DataTableStyle}
                                    />
                                </div>
                            </ThemeProvider>

                        </Box>
                    </div>
            </SectionCard>
    )
}