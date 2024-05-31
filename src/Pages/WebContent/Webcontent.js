import React,{useEffect, useState} from 'react';
import { SectionCard } from '../../molecules/SectionCard/Index';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import Cookies from 'universal-cookie';
import useStyles from '../../Style';
import { FaEdit } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Deletepopup from '../../Components/Component/Deletepopup';
import Successfullypopup from '../../Components/Component/Successfullypopup';
import { RiDeleteBin6Line } from "react-icons/ri";
const Webcontent = () => {
    const cookies = new Cookies();
    const token_data = cookies.get('Token_access')
    const Navigate = useNavigate()
    const classes = useStyles()
    const [totel, setTotal] = useState([])
    const [pageSize, setPageSize] = useState(10)
    const [deleteId, setdeleteId] = useState('')
    const [deleteoptn , setdeleteoprn] = useState(false)
    const [isdelete , setsisDelete] = useState(false)

    const columns = [

        { field: 'Title', headerName: 'Title', editable: false, minWidth: 60, flex: 1, sortable: false, headerClassName: 'super-app-theme--header' },
        { field: 'Content', headerName: 'Web Content', editable: false, minWidth: 60, flex: 1, sortable: false, headerClassName: 'super-app-theme--header' },
        { field: 'Type', headerName: 'Type', editable: false, minWidth: 60, flex: 1, sortable: false, headerClassName: 'super-app-theme--header' },
        { field: 'Country', headerName: 'Country', editable: false, minWidth: 60, flex: 1, sortable: false, headerClassName: 'super-app-theme--header' },
        { field: 'State', headerName: 'State', editable: false, minWidth: 60, flex: 1, sortable: false, headerClassName: 'super-app-theme--header' },
        { field: 'City', headerName: 'City', editable: false, minWidth: 60, flex: 1, sortable: false, headerClassName: 'super-app-theme--header' },
        {
            field: 'Edit', headerName: 'Edit', editable: false, minWidth: 80, maxWidth: '100px', flex: 1, sortable: false, headerClassName: 'super-app-theme--header',
            renderCell: (params) => (
                <>
                    {/* {( state.Roles.EditStore ||  state.Roles.DeleteStore || state.Roles.ViewStore) && */}
                    <Box sx={{
                        "&.MuiBox-root": {
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '10px'
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
                        <Link to={"/EditwebContent"} state={params.row}>  <FaEdit></FaEdit></Link>
                        <RiDeleteBin6Line onClick={() =>{ setdeleteoprn(true); setdeleteId(params.row.id)}}></RiDeleteBin6Line>
                        {/* <Link  to={"/EditwebContent"} state={params.row}>  <RiDeleteBin6Line></RiDeleteBin6Line></Link> */}
                        {/* <EditwebContent></EditwebContent> */}

                        {/* {state.Roles.EditStore && <StoreEdit data={params.row}></StoreEdit> }
                        { state.Roles.DeleteStore && <StoreDelete data={params.row} ></StoreDelete> }
                        {   state.Roles.ViewStore && <StoreView></StoreView> } */}

                    </Box>
                    {/* } */}
                </>

            )
        },

    ];
useEffect(()=>{
   
    if(isdelete){
        Delete(deleteId)
    }
},[isdelete])
    const rows = totel || [];
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
    React.useEffect(() => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }, [])
    React.useEffect(() => {
        axios("https://api.cannabaze.com/AdminPanel/Get-Webpagedescription/", {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }

        }).then(response => {
            setTotal(response.data)

        })
    }, [token_data])

    async function Delete(id) {
       
       
        axios.delete(`https://api.cannabaze.com/AdminPanel/Delete-Webpagedescription/${id}`, {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }
        }).then((response) => {
            setdeleteoprn('')
           setsisDelete(false)
            if (response.status === 200) {
                axios("https://api.cannabaze.com/AdminPanel/Get-Webpagedescription/", {

                    headers: {
                        'Authorization': `Bearer ${token_data}`
                    }
                }).then(response => {
                    setTotal(response.data)
                })
            }
        })
    }

    return (
        <div>
            <SectionCard>
                <div className='row'>
                    <div className='col-12  mb-3 d-flex justify-content-between'>

                        <button className='topbutton' onClick={() => { Navigate("/AddWebContent") }}> Add Web Content</button>
                    </div>
                    <Box className={classes.DataTableBoxStyle} >
                        <div className='col-12' >
                            <Box>
                                <ThemeProvider theme={CustomFontTheme}>
                                    <div style={{ width: '100%', }}>
                                        <DataGrid autoHeight rows={rows} editable={false} columns={columns}
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
            {   deleteoptn &&  <Deletepopup setdeleteoprn={setdeleteoprn} setsisDelete={setsisDelete} />}

        </div>
    );
};

export default Webcontent;