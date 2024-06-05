import React, { useState, useEffect,useContext } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Cookies from "universal-cookie";
import { ThemeProvider, Box, createTheme } from "@mui/material";
import { SlSocialDropbox } from "react-icons/sl";
import Axios from 'axios'
import { FaExternalLinkAlt } from "react-icons/fa";
import Createcontext from '../../../Hooks/Context/Context'
import { RiDeleteBin6Line } from "react-icons/ri";
import { useLocation } from 'react-router-dom'
import Deletepopup from '../../../Components/Component/Deletepopup'
import Successfullypopup from '../../../Components/Component/Successfullypopup'
import useStyles from '../../../Style';
import { useNavigate , Link } from 'react-router-dom'
const BlogComment = () => {
    const location = useLocation();
    const [recentorder, setRecentorder] = useState([])
    const { state } = useContext(Createcontext);
    const cookies = new Cookies();
    const token_data = cookies.get("Token_access");
    const [pageSize, setPageSize] = React.useState(10)
    const [deleteoptn, setdeleteoprn] = useState(false)
    const [isdelete, setsisDelete] = useState(false)
    const [loader, setloader] = React.useState(true);
    const [sucsesopen, setsucsesopen] = useState(false)
    const [reviewid, setreviewid] = useState({})
    const navigate = useNavigate()
    const classes= useStyles()
    const CustomFontTheme = createTheme({
        typography: {
          fontSize: 25
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
    const columns = [
    
        {
          field: 'username',
          headerName: 'User Name',
          minWidth: 150,
          editable: false,
          sortable: false,
          headerAlign: 'left',
          flex: 1,
        },
        {
          field: 'email',
          headerName: 'E-mail',
          minWidth: 150,
          editable: false,
          headerAlign: 'left',
          sortable: false,
          flex: 1,
         
        },
        {
          field: 'BlogTitle',
          headerName: 'Blog Title',
          type: 'number',
          minWidth: 200,
          editable: false,
          sortable: false,
          headerAlign: 'center',
          align: 'center',
          flex: 1,
        
        },
        {
          field: 'comment',
          headerName: 'comment',
          flex: 1,
          editable: false,
          sortable: false,
          minWidth: 180,
          headerAlign: 'left',
          align: 'left',
        },
        {
          field: 'created_at',
          headerName: 'Date',
          type: 'number',
          minWidth: 120,
          editable: false,
          sortable: false,
          headerAlign: 'left',
          align: 'left',
          flex: 1,
          renderCell:(params)=>{
            return  <span>{ 
                ("0" + (new Date(params.row.created_at)).getDate()).slice(-2)
                + "-" +   ("0" + ( (new Date(params.row.created_at)).getMonth()+1)).slice(-2)  + "-" +  (new Date(params.row.created_at)).getFullYear()  }</span>
          }
        },
        {
          field: 'Action',
          headerName: 'Action',
          type: 'number',
          minWidth: 120,
          editable: false,
          sortable: false,
          headerAlign: 'center',
          align: 'center',
          flex: 1,
          renderCell: (params) => {
            return <span className='d-flex gap-3'>
               { state.Roles.DeleteComments && <RiDeleteBin6Line onClick={() => { setreviewid(params.row.reviewtype); setdeleteoprn(true) }} color='#31B655' size={24} />}
              <Link to={`https://www.weedx.io/blogs/${modifystr(params.row.BlogTitle)}/${params.row.Blog}`} target="_blank" > <FaExternalLinkAlt color='#31B655' size={18} /></Link> 
            </span>
          }
        },
      ];
      const rows = recentorder

      useEffect(()=>{
        setloader(true)
        Axios.get('https://api.cannabaze.com/AdminPanel/Get-AllUserBlogComments/',{
            headers: {
                'Authorization': `Bearer ${token_data}`
            }
        }).then((res)=>{
            setRecentorder(res.data)
            setloader(false)
        }).catch((error)=>{
          setloader(false)
        })
      },[])
  return (
    
    <div className=' my-4 '>
    <div className='py-4 section_card'>
      <div className='d-flex justify-content-between align-content-center px-4'>
        <h3 className='pagetitle'><SlSocialDropbox color='#31B655' size={25} />Blog comment</h3>
        <div className='btnsgroup'>

        </div>
      </div>
      <div className='d-flex justify-content-end py-3 align-content-center'>

      </div>
      <div className='allusertable'>
        <Box className={classes.DataTableBoxStyle}>
          <ThemeProvider theme={CustomFontTheme}>
            <DataGrid
              rows={rows}
              columns={columns}
              getRowId={(rows) => rows.id}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              pageSizeOptions={[10, 25, 50]}
              pagination
              disableRowSelectionOnClick
              disableColumnMenu
              disableColumnFilter
              disableColumnSelector
              autoHeight
              rowSelection={false}
              className={classes.DataTableStyle}
              disableSelectionOnClick 
            />
          </ThemeProvider>
        </Box>
      </div>
    </div>
    {deleteoptn && <Deletepopup setdeleteoprn={setdeleteoprn} setsisDelete={setsisDelete} />}
    {sucsesopen && <Successfullypopup setsucsesopen={setsucsesopen} />}
    {loader &&  <div className="loader_container">  <span className="newloader shine"><img src='/image/icon.png' alt='cannabaze logo' title='cannabaze logo' /></span>
          </div>}
    </div>
  )
}

export default BlogComment