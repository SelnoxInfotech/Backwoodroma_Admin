import  React,{useState ,useEffect} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import useStyles from '../../Style';
import Cookies from "universal-cookie";
import { RiDeleteBinLine } from "react-icons/ri";
import { ThemeProvider , Box ,createTheme } from "@mui/material";
import { SlSocialDropbox } from "react-icons/sl";
import Deletepopup from '../../Components/Component/Deletepopup'
import axios from 'axios'
const Customer = () => {
    const classes = useStyles()
    const cookies = new Cookies();
    const token_data = cookies.get("Token_access");
    const [deleteoptn , setdeleteoprn] = useState(false)
    const [isdelete , setsisDelete] = useState(false)
    const [reviewid , setreviewid] = useState('')
    const [userdata , setuserdata]= useState([]);
    const [pageSize, setPageSize] = React.useState(10);
    const [loader, setloader] = React.useState(true);

    const columns=[
      
        {
          field: 'username',
          headerName: 'User Name',
          sortable:false,
          minWidth: 80,
          editable: false,
          flex:1,
          headerAlign: "left",
          align: "left",
          renderCell: (params) => {
              const onClick = (e) => {
                e.stopPropagation(); 
              };
              return  <div className='pendingUserProfile'>
                <div className='userImage'>
                  <div className='userImageCircle'>
                    <img src={params.row.image} alt=''   onError={
                 (e) => (e.target.src = "/image/blank_Image.webp")} />
                  </div>
                </div>
                <div>
                  <h4 className='userName'>{params.row.username}</h4>
                </div>
              </div>
          }
        },
      
        {
          field: 'email',
          headerName: 'Email',
          minWidth: 120,
          editable: false,
          sortable:false,
          flex:1,
          headerAlign: "left",
          align: "left",
        },
        {
          field: 'created_at',
          headerName: 'created Date',
          minWidth: 120,
          editable: false,
          sortable:false,
          flex:1,
          headerAlign: "center",
          align: "center",
        },
      
      ];
    const rows = userdata
    const CustomFontTheme = createTheme({
        typography: {
            fontSize: 25,
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
      useEffect(()=>{
        setloader(true)
        axios.get('https://api.cannabaze.com/AdminPanel/Get-AllCustomer/',  {
            headers: {
              Authorization: `Bearer ${token_data}`,
            },
          }).then((response)=>{
            setuserdata(response.data) 
            setloader(false)   
        }).catch(()=>{
          setloader(false)
        })
      },[])
  return (
   
          <div className=' my-4 '>
            <div className='py-4 section_card'>
                <div  className='d-flex justify-content-between align-content-center px-4'> 
                    <h3 className='pagetitle'><SlSocialDropbox color='#31B655' size={25}/> All Customer</h3>
                    {/* <div className='btnsgroup'>
                    <Link to={'/addstaff'}>
                        <button className="topbutton"> Add Staff</button>
                    </Link>
                    </div> */}
                </div>
                <div className='d-flex justify-content-end py-3 align-content-center'>
                
                </div>
                <div className='allusertable'>
                <Box  className={classes.DataTableBoxStyle}
                            >
                                <ThemeProvider theme={CustomFontTheme}>
                                    <DataGrid
                                        rows={rows}
                                        columns={columns}
                                        getRowId={(row) => row.id}
                                        initialState={{
                                        pagination: {
                                            paginationModel: {
                                            pageSize: 10,
                                            },
                                        },
                                        }}
                                        pageSize={pageSize}
                                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                        rowsPerPageOptions={[5, 10, 20]}
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
           
            {
            loader && <div className="loader_container">  <span className="newloader shine"><img src='/image/icon.png' alt='cannabaze logo' title='cannabaze logo' /></span>
            </div>
          }
    </div>
  )
}

export default Customer