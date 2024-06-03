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
    const columns=[
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
                             {/* <Editstaff data={params.row} setuserdata={setuserdata} ></Editstaff>  */}
                      </Box>
          )
      },
      ];
    const rows = []
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
  return (
    <div>
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
           
    </div>
    </div>
  )
}

export default Customer