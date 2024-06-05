import  React,{useState ,useEffect} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import useStyles from '../../Style';
import Cookies from "universal-cookie";
import { RiDeleteBinLine } from "react-icons/ri";
import { ThemeProvider , Box ,createTheme } from "@mui/material";
import { SlSocialDropbox } from "react-icons/sl";
import Deletepopup from '../../Components/Component/Deletepopup'
import Editstaff from './Editstaff';
import axios from 'axios'
import "./Stall.css"
const Allstall = () => {
    const classes= useStyles()
    const cookies = new Cookies();
    const token_data = cookies.get("Token_access");
    const [deleteoptn , setdeleteoprn] = useState(false)
    const [isdelete , setsisDelete] = useState(false)
    const [loader, setloader] = React.useState(true);
    const [reviewid , setreviewid] = useState('')
    const [userdata , setuserdata]= useState([]);
    const [pageSize, setPageSize] = React.useState(10);
    useEffect(()=>{
      if(isdelete){
          axios.delete(`https://api.cannabaze.com/AdminPanel/Delete-User/${reviewid}`, {
          headers: {
              'Authorization': `Bearer ${token_data}`
          }
          }).then(response => {
            setsisDelete(false)
            axios.get('https://api.cannabaze.com/AdminPanel/AllStaff/',{
              headers: {
                Authorization: `Bearer ${token_data}`,
              },
            }).then((res)=>{
              setuserdata(res.data)
            })
      
          })
      }
  },[isdelete])

                            
    const columns = [
      { field: 'sno', headerName: 'S No.', filterable: false,
    
       width: 90 },
      {
        field: 'Roles',
        headerName: 'Roles',
        sortable:false,
        minWidth: 80,
        editable: false,
        flex:1,
        headerAlign: "left",
        align: "left",
        renderCell: (params) => {
            const onClick = (e) => {
              e.stopPropagation(); // don't select this row after clicking
            };
            return <span>{params.row.Roles.join()}</span>
        }
      },
      {
        field: 'Name',
        headerName: 'Name',
        minWidth: 120,
        editable: false,
        sortable:false,
        flex:1,
        headerAlign: "center",
        align: "center",
      },
      {
        field: 'Email',
        headerName: 'Email',
        minWidth: 120,
        editable: false,
        sortable:false,
        flex:1,
        headerAlign: "center",
        align: "center",
      },
      {
        field: 'MobileNo',
        headerName: 'Phone Number',
        minWidth: 120,
        editable: false,
        sortable:false,
        flex:1,
        headerAlign: "center",
        align: "center",
      },
      {
          field: 'Status',
          headerName: 'Status',
          sortable:false,
          minWidth: 80,
          editable: false,
          flex:1,
          headerAlign: "center",
          align: "center",
      },
      {
        field: 'Edit', headerName: 'Action', type: 'button', minWidth: 80, flex: 1, editable: false, headerClassName: 'super-app-theme--header',sortable:false,
        renderCell: (params) => (   
                    
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
                           {/* <Deletstaff data={params.row} ></Deletstaff> */}
                           <RiDeleteBinLine color='#31B655' size={22} onClick={()=>{setdeleteoprn(true) ; setreviewid(params.row.ID)}}></RiDeleteBinLine>
                           <Editstaff data={params.row} setuserdata={setuserdata} ></Editstaff> 
                    </Box>
        )
    },
    ];
    React.useEffect(()=>{
      setloader(true)
      axios.get('https://api.cannabaze.com/AdminPanel/AllStaff/',{
            headers: {
              Authorization: `Bearer ${token_data}`,
            },
      }).then((res)=>{
        let a = res.data.map((data , index)=>{
          return {...data , sno:index+1}
        })
        setuserdata(a)
        setloader(false)
      }).catch((error)=>[
        setloader(false)
      ])
    },[token_data])
    const rows = userdata
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

  return (
    <div className=' my-4 '>
            <div className='py-4 section_card'>
                <div  className='d-flex justify-content-between align-content-center px-4'> 
                    <h3 className='pagetitle'><SlSocialDropbox color='#31B655' size={25}/> Staff Details</h3>
                    <div className='btnsgroup'>
                    <Link to={'/addstaff'}>
                        <button className="topbutton"> Add Staff</button>
                    </Link>
                    </div>
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
                                        getRowId={(row) => row.ID}
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
            {   deleteoptn &&  <Deletepopup setdeleteoprn={setdeleteoprn} setsisDelete={setsisDelete}  />}
            {
            loader && <div className="loader_container">  <span className="newloader shine"><img src='/image/icon.png' alt='cannabaze logo' title='cannabaze logo' /></span>
            </div>
          }
    </div>
  )
}

export default Allstall