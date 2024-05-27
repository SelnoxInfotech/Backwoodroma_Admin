import React, { useContext } from 'react'
import Createcontext from "../../Hooks/Context/Context"
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { ThemeProvider } from "@mui/material/styles";
import { SlSocialDropbox } from "react-icons/sl";
import { createTheme } from "@mui/material/styles";
import axios from "axios";
import Cookies from 'universal-cookie';
import Brandpopup from './Brandpopup';
import { AiFillEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import BrandEdit from "./BrandEdit"
import BrandDelete from "./BrandDelete"
import Tooltip from '@mui/material/Tooltip';
import  useStyles  from '../../Style.jsx';
import {SectionCard} from '../../molecules/SectionCard/Index'
export default function Brand() {
    const cookies = new Cookies();
    const { state, dispatch } = useContext(Createcontext)
    const token_data = cookies.get('Token_access')
    const [totel, setTotal] = React.useState([])
    const [pageSize, setPageSize] = React.useState(5)
   const classes = useStyles()

    React.useEffect(() => {
        axios("https://api.cannabaze.com/AdminPanel/Get-Brand/", {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }

        }).then(response => {
            setTotal(response.data)

        })



    }, [token_data, state])



    const Submit = (params) => {
        if(state.Roles.EditBrand ){const formdata = new FormData();
        formdata.append('Brand_description', params.row.Brand_description);
        formdata.append('Link', params.row.Link);
        formdata.append("Status", params.row.Status === "Active" ? "Hide" : "Active");
        formdata.append('name', params.row.name);


        const config = {
            headers: { Authorization: `Bearer ${token_data}` }
        };
        axios.post(
            `https://api.cannabaze.com/AdminPanel/update-Brand/${params.row.id}`,
            formdata,
            config
        ).then(() => {


            dispatch({ type: 'api', api: true })
        })}
    };



    const columns = [
     
        { field: 'name', headerName: 'Brand Name', editable: false, headerClassName: 'super-app-theme--header', minWidth: 80, flex: 1,sortable:false, },
        {
            field: 'Brand_Logo', headerName: 'Logo', editable: false, headerClassName: 'super-app-theme--header', minWidth: 80, flex: 1,sortable:false,
            renderCell: (params) => <img src={params?.row?.Brand_Logo} alt="flavoursImage" width="60" height="40" />,
        },
        {
            field: 'Status', headerName: 'Status', editable: false, minWidth: 80, flex: 1, headerClassName: 'super-app-theme--header',sortable:false,
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
            field: 'Edit', headerName: 'Action', type: 'button', minWidth: 80, flex: 1, editable: false, headerClassName: 'super-app-theme--header',sortable:false,
            renderCell: (params) => (

                <>
                    { 
                        (state.Roles.EditBrand ||  state.Roles.DeleteBrand ) && 
                        <Box
                            sx={{
                                display:'flex',
                                gap:'10px',
                                '& .MuiOutlinedInput-root': {                   
                                    '&.Mui-focused fieldset': {
                                      
                                    },
                                },
                                '& . MuiDataGrid-root .MuiDataGrid-cell:focus': {
                                   
                                }
                            }}
                        >
                                { state.Roles.EditBrand  && <BrandEdit data={params.row} ></BrandEdit>}
                                { state.Roles.DeleteBrand && <BrandDelete data={params.row} ></BrandDelete> }
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
        <SectionCard >
            <div className='col-12 mb-3 d-flex justify-content-between align-content-center '>
                <h2 className='pagetitle '> <SlSocialDropbox color='#31B655' size={25}/>  Brand  </h2>
                { state.Roles.AddBrand  && <span> <h2> <Brandpopup></Brandpopup> </h2></span>}
            </div>
            <div className='col-12 '>

                <Box  className={classes.DataTableBoxStyle}>
                    <ThemeProvider theme={CustomFontTheme}>
                        <div style={{  width: '100%', }}>
                           <DataGrid
                                rows={rows}
                                columns={columns}
                                autoHeight
                                pageSize={pageSize}
                                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                rowsPerPageOptions={[5, 10, 20]}
                                pagination
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
    );
}