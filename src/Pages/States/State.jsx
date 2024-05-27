import React, { useContext } from 'react'
import Cookies from 'universal-cookie';
import Createcontext from "../../Hooks/Context/Context"
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import StatePopUp from "./Statespopup"
import axios from "axios";
import Box from '@mui/material/Box';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { AiFillEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Select from '@mui/material/Select';
import StateEdit from "./StateEdit"
import StateDelete from './StatesDelete';
import Tooltip from '@mui/material/Tooltip';
import useStyles from '../../Style';
import {SectionCard} from '../../molecules/SectionCard/Index'

export default function State() {
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
    const [totel, setTotal] = React.useState([])
    const classes = useStyles()
    const cookies = new Cookies();
    const token_data = cookies.get('Token_access')
    React.useEffect(() => {
        axios("https://api.cannabaze.com/AdminPanel/Get-States/", {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }

        }).then(response => {
            setTotal([...response.data])

        })
    }, [state, token_data])
    function SubmitEditData(params) {
        const form = {
            "id": params.row.id,
            "Country_id": params.row.Country_id,
            "StateName": params.row.StateName,
            " country_name": params.row.CountryName,
            "Status": params.row.Status === "Active" ? "Hide" : "Active"
        }
        axios.post(`https://api.cannabaze.com/AdminPanel/update-States/${params.row.id}`, form, {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }

        }).then(response => {
            if (response) {
                dispatch({ type: 'api', api: true })


            }
        }).catch(
            function (error) {
                return Promise.reject(error)
            }
        )
    }
    const columns = [
        { field: 'StateName',sortable:false, headerName: 'States',maxWidth: 150, minWidth: 90, flex: 1, editable: false, headerClassName: 'super-app-theme--header' },
        { field: 'country_name',sortable:false, headerName: 'Country', maxWidth: 150, minWidth: 90, flex: 1,editable: false, headerClassName: 'super-app-theme--header' },
        {
            field: 'Status', headerName: 'Status',sortable:false,maxWidth: 150, minWidth: 90, flex: 1, editable: false, width: 300, headerClassName: 'super-app-theme--header',
            renderCell: (params) => {

                if (params.formattedValue === "Active") {
                    return (
                        <Tooltip title="Active" enterDelay={300} leaveDelay={200} arrow placement="right-start">

                        <p
                            style={{ color: "#31B665 ", fontSize: 25, cursor: "pointer" }}
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                SubmitEditData(params);
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
                            SubmitEditData(params);
                        }}
                    ><AiOutlineEyeInvisible /></p>
                    </Tooltip>

                )
            }
        },
        {
            field: 'Edit', headerName: 'Edit',maxWidth: 150,sortable:false, minWidth: 80, flex: 1, editable: false, headerClassName: 'super-app-theme--header',headerAlign: 'center', align:"center",
            renderCell: (params) => (
                <>
                    <Box
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': {
                                    borderWidth: "1px",
                                    borderColor: 'red',
                                },
                            },
                            '& . MuiDataGrid-root .MuiDataGrid-cell:focus': {
                                outline: "solid #0f1010 1px"
                            }
                        }}
                    >
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
                            <StateEdit data={params.row} ></StateEdit>
                            <StateDelete data={params.row} ></StateDelete>
                        </Select>
                    </Box>
                </>

            )
        },
    ];
    const rows = totel
    return (
                <SectionCard>
                    <div className='col-12  mb-3 d-flex justify-content-between align-items-center'>
                          <h2 className='pagetitle'> States </h2>
                          <span > <h2><StatePopUp></StatePopUp></h2></span>
                    </div>
                    <div className='col-12' >
                        <Box
                          className={classes.DataTableBoxStyle}
                        >

                            <ThemeProvider theme={CustomFontTheme}>
                                <div style={{ height: 400, width: '100%', }}>
                                    <DataGrid
                                            rows={rows} 
                                            columns={columns}   
                                            disableColumnMenu
                                            disableColumnFilter
                                            disableColumnSelector
                                            className={classes.DataTableStyle}
                                            disableSelectionOnClick 
                                    />
                                </div>
                            </ThemeProvider>
                        </Box>
                    </div>
                </SectionCard>
    )
}