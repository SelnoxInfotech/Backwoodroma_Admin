import React, { useEffect, useState, useContext } from 'react'
import { ThemeProvider } from "@mui/material/styles";
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { createTheme } from "@mui/material/styles";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Successfullypopup from '../../Components/Component/Successfullypopup'
import Unsuccesspopup from '../../Components/Component/Successfullypopup'
import { FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Createcontext from '../../Hooks/Context/Context'
import { SlSocialDropbox } from "react-icons/sl";
import Cookies from 'universal-cookie';
import axios from 'axios';
import useStyles from '../../Style';
import Deletepopup from '../../Components/Component/Deletepopup'
import { Headerbutton } from '../../molecules/Button/index'
import { SectionCard } from '../../molecules/SectionCard/Index';
const Rolelist = () => {
    let navigate = useNavigate();
    const [pageSize, setPageSize] = useState(5);
    const [sucsesopen, setsucsesopen] = useState(false)
    const [unsucsesopen, setunsucsesopen] = useState(false)
    const [deleteoptn, setdeleteoprn] = useState(false)
    const [isdelete, setsisDelete] = useState(false)
    const [iddelete, setisdDelete] = useState('')
    const [RoleData, SetRoleData] = useState([]);
    const classes = useStyles()
    const { state } = useContext(Createcontext)
    const cookies = new Cookies();
    const token_data = cookies.get('Token_access')

    const CustomFontTheme = createTheme({
        typography: {
            fontSize: 24
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

    function calculateTImefromDate(value) {
        let diffTime = Math.abs(new Date().valueOf() - new Date(value).valueOf());
        let months = Math.trunc(diffTime / (24 * 60 * 60 * 1000) / 30);
        let days = diffTime / (24 * 60 * 60 * 1000);
        let hours = (days % 1) * 24;
        let minutes = (hours % 1) * 60;
        let secs = (minutes % 1) * 60;
        [days, hours, minutes, secs] = [Math.floor(days), Math.floor(hours), Math.floor(minutes), Math.floor(secs)]

        if (months !== 0) {
            return months + " Month ago"
        } else if (days !== 0) {
            return days + " days ago"
        }
        else if (hours !== 0) {
            return hours + " hours ago"
        }
        else if (minutes !== 0) {
            return minutes + " minutes ago"
        }
        else {
            return secs + " secs ago"
        }

    }
    useEffect(() => {
        if (isdelete) {
            axios.delete(`https://api.cannabaze.com/AdminPanel/Delete-RolesAndPermission/${iddelete}`,{
                headers: {
                    'Authorization': `Bearer ${token_data}`
                }
            }).then((res)=>{
                setisdDelete('')
                setsisDelete(false)
                axios.get('https://api.cannabaze.com/AdminPanel/Get-RolesAndPermission/',{
                    headers: {
                        'Authorization': `Bearer ${token_data}`
                    }
                }).then((res)=>{
                    SetRoleData(res?.data)
                })
            }).catch((error)=>{
                setisdDelete('')
                setsisDelete(false)
            })
        }

    }, [isdelete])

    useEffect(() => {
        axios.get('https://api.cannabaze.com/AdminPanel/Get-RolesAndPermission/', {
            headers: {
                'Authorization': `Bearer ${token_data}`
            }
        }).then((res) => {
            let a = res?.data.map((item, index) => { return { ...item, sno: (index + 1) } })
            SetRoleData(a)
        })


    }, [])


    const columns = [
        {
            field: 'sno',
            headerName: 'S No.',
            filterable: false,
            minWidth: 110,
        },
        { field: 'RoleTitle', headerName: 'Name', editable: false, minWidth: 110, flex: 1, headerClassName: 'super-app-theme--header', headerAlign: 'left', align: 'left', sortable: false },
        {
            field: 'created_at', headerName: 'Created', type: 'number', sortable: false, editable: true, flex: 1, headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center',

            renderCell: (params) => {
                return <span>{calculateTImefromDate(params.row.created_at)}</span>
            }
        },
        {
            field: 'Edit', headerName: 'Edit', type: 'button', editable: false, sortable: false, flex: 1, headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center',

            renderCell: (params) => {
                return state?.Roles?.DeleteRoles ? <span onClick={() => navigate('/updateroles', { state: { ...params.row, type: 'edit' } })}><FaEdit size={22} color='#31B655' /></span> : null
            }
        },
        {
            field: 'Delete', headerName: 'Delete', editable: false, sortable: false, flex: 1, headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center',
            renderCell: (params) => {
               
                return <span onClick={() => { setdeleteoprn(true); setisdDelete(() => params.row.id) }} ><MdOutlineDeleteOutline size={22} color='red' />
                </span>
            }
        },

    ];
    const rows = RoleData
    //  const Token_access = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM2NTcwOTQ1LCJpYXQiOjE3MDUwMzQ5NDUsImp0aSI6IjkzMTFlYTFkYTViNjRlOTk4NGY2YjUxN2M2MzI5NGM4IiwidXNlcl9pZCI6MX0.dZlMMBW7B93MWh1xSRklg1c7FRL7tKQttM0J9RjZKq0'
    return (
        <React.Fragment>
            <SectionCard>
                <div className='row'>
                    <div className=' col mb-3   d-flex align-items-center justify-content-between '>
                        <h2 className='pagetitle'> <SlSocialDropbox color='#31B655' size={25}/> Roles </h2>
                        {/* <button className='customiconbtn' onClick={()=>navigate('/addrole' , {state:{ type:'add'}})} >Add Roles</button> */}
                        <Headerbutton onClick={() => navigate('/addrole', { state: { type: 'add' } })}>Add Roles</Headerbutton>
                    </div>
                    <div className='col-12'>
                        <Box className={classes.DataTableBoxStyle}  >
                            <ThemeProvider theme={CustomFontTheme}>
                                <div style={{ width: '100%' }}>
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
                                </div>
                            </ThemeProvider>
                        </Box>
                    </div>
                </div>


            </SectionCard>
            {sucsesopen && <Successfullypopup setsucsesopen={setsucsesopen} link={'/Roles'} />}
            {unsucsesopen && <Unsuccesspopup setsucsesopen={setunsucsesopen} link={'/Roles'} />}
            {deleteoptn && <Deletepopup setdeleteoprn={setdeleteoprn} setsisDelete={setsisDelete} />}
        </React.Fragment>
    )
}
export default Rolelist