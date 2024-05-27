import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import axios from "axios";
import Cookies from 'universal-cookie';
import NewsEdit from "./EditNews"
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FiEye } from "react-icons/fi";
import Createcontext from "../../Hooks/Context/Context"
import DeleteNews from "./DeleteNews"
import useStyles from '../../Style';
import { SlSocialDropbox } from "react-icons/sl";
import {SectionCard} from '../../molecules/SectionCard/Index'
import {useNavigate ,Link} from 'react-router-dom'
export default function News() {
    const { state } = useContext(Createcontext)
    const classes = useStyles()
    const navigate = useNavigate()
    const cookies = new Cookies();
    const token_data = cookies.get('Token_access')
    const [pageSize, setPageSize] = React.useState(10)
    function modifystr(str) {
        str = str.replace(/[^a-zA-Z0-9/ ]/g, "-");
        str = str.trim().replaceAll(' ', "-");
        let a = 0;
        while (a < 1) {
            if (str.includes("--")) {
                str = str.replaceAll("--", "-")
            } else if (str.includes("//")) {
                str = str.replaceAll("//", "/")
            } else if (str.includes("//")) {
                str = str.replaceAll("-/", "/")
            } else if (str.includes("//")) {
                str = str.replaceAll("/-", "/")
            } else {
                a++
            }
        }
    
        return str.toLowerCase()
    }
    const [totel, setTotal] = React.useState([])
    React.useEffect(() => {
        axios("https://api.cannabaze.com/AdminPanel/Get-News/", {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }

        }).then(response => {
            setTotal(response.data)


        })
    }, [state.api])

    const columns = [
       
        { field: 'Title', headerName: 'Post Title', editable: false, headerClassName: 'super-app-theme--header',  minWidth: 150,sortable:false, flex: 1},
        {
            field: 'created', headerName: 'Publish Date', editable: false, minWidth: 80, flex: 1,sortable:false, headerClassName: 'super-app-theme--header',
            renderCell: (params) => params.row.created.slice(0, 10)
        },
        { field: 'Status', headerName: 'Views', editable: false,  minWidth: 80, flex: 1,sortable:false, headerClassName: 'super-app-theme--header' ,  renderCell: (params) => (
            <span>
               <a target='blank' href={`https://www.weedx.io/${ params.row.category_name === "BLOGS" ? "blogs":'cannabis-news'}/${modifystr(params.row.Title)}/${params.row.id}`}> <FiEye color='#31B655' size={22} /></a>
            </span>
        )},
        {
            field: 'Edit', headerName: 'Edit', editable: false, minWidth: 80, flex: 1,sortable:false, headerClassName: 'super-app-theme--header',
            renderCell: (params) => {
                return (<>
                       { (state.Roles.EditBlogs || state.Roles.DeleteBlogs ) &&
                    <Box   sx={{
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
                       
                            {state.Roles.EditBlogs &&<NewsEdit data={params?.row}></NewsEdit>}
                           {state.Roles.DeleteBlogs && <DeleteNews data={params?.row}></DeleteNews>}
                     
                    </Box>
                    }
                </>)

            }
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
       
                <SectionCard>
                        <div className='d-flex justify-content-between align-items-center w-100 mb-3'>
                            <h2 className='pagetitle'> <SlSocialDropbox color='#31B655' size={25}/> Latest News
                            </h2>
                           {state?.Roles?.AddBlogs &&   <button className="topbutton" onClick={()=>{navigate('/addnews')}}> + Add News </button>}
                        </div>
                        <div className='col-12' >
                            <Box className={classes.DataTableBoxStyle} >
                                <ThemeProvider theme={CustomFontTheme}>
                                 
                                        <DataGrid rows={rows} columns={columns} 
                                            disableColumnMenu
                                            disableColumnFilter
                                            disableColumnSelector
                                            className={classes.DataTableStyle}
                                            pageSize={pageSize}
                                            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                            rowsPerPageOptions={[ 10, 20]}
                                            pagination
                                            autoHeight
                                            disableSelectionOnClick 
                                        />
                                   
                                </ThemeProvider>
                            </Box>
                        </div>
                </SectionCard>
         
    );
}