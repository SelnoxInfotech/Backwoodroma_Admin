import  React,{useState , useEffect,useContext} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import useStyles from '../../Style';
import Cookies from "universal-cookie";
import { ThemeProvider , Box ,createTheme } from "@mui/material";
import { SlSocialDropbox } from "react-icons/sl";

import Axios from 'axios'
import Createcontext from '../../Hooks/Context/Context'
import { IoAlertCircleOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { BsTelephone } from "react-icons/bs";
const Allrecentorder = () => {
        const [recentorder, setRecentorder] = useState([])
        const [error, seterror] = useState(false)
        const cookies = new Cookies();
        const [loader, setloader] = React.useState(true);
        const token_data = cookies.get("Token_access");
        const [pageSize, setPageSize] = React.useState(10)
        const classes = useStyles()
        function noimagefun(ev){
          seterror((error)=>{
            return true
          })
        }
        useEffect(() => {
          setloader(true)
          Axios.get('https://api.cannabaze.com/AdminPanel/AllRecentOrder/', {
            headers: {
              'Authorization': `Bearer ${token_data}`
            }
          }).then((res) => {
            setloader(false)
            setRecentorder(res.data)
          }).catch((error)=>{
            setloader(false)
          })
        }, [token_data])
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
        const columns = [
            {
              field: 'OrderId',
              headerName: 'Order ID',
              minWidth: 150,
              editable: false,
              sortable: false,
              headerAlign: 'left',
              valueGetter: (params) =>
                `#${params.row.OrderId}`,
            },
            {
              field: 'username',
              headerName: 'Name',
              minWidth: 150,
              editable: false,
              sortable: false,
              headerAlign: 'left',
              flex: 1,
              renderCell: (params) => {
                return <div className='pendingUserProfile'>
                  <div className='userImage'>
                    <div className='userImageCircle'>
                  <img src={params.row.UserProfileImage}  onError={noimagefun} alt='' />
                       
                    </div>
                  </div>
                  <div>
                    <h4 className='userName'>{params.row.username}</h4>
        
                  </div>
                </div>
              }
            },
            {
              field: 'Contact',
              headerName: 'Contact',
              minWidth: 230,
              editable: false,
              headerAlign: 'center',
              sortable: false,
              flex: 1,
              renderCell: (params) => {
                return <ul className='pendingvendercontent'>
                  {params?.row?.email && <li className='content_item'> <span className='contactIcon'><MdOutlineEmail color='#6B6F7A' /></span>{params.row.email}</li>}
                  {params?.row?.MobileNo && <li className='content_item'> <span className='contactIcon'><BsTelephone color='#6B6F7A' /></span>{params.row.MobileNo}</li>}
                </ul>
              }
            },
            {
              field: 'SellerName',
              headerName: 'Store Name',
              type: 'number',
              minWidth: 150,
              editable: false,
              sortable: false,
              headerAlign: 'center',
              align: 'center',
              flex: 1,
            },
            {
              field: 'Order_Type',
              headerName: 'Store Type',
              flex: 1,
              editable: false,
              sortable: false,
              minWidth: 120,
              headerAlign: 'center',
              align: 'center',
            },
            {
              field: 'Quantity',
              headerName: 'Quantity',
              type: 'number',
              minWidth: 120,
              editable: false,
              sortable: false,
              headerAlign: 'center',
              align: 'center',
              flex: 1,
              renderCell: (params) => {
                let a = 0
                params?.row?.Product?.forEach((items) => {
                  a += items.Cart_Quantity
                })
                return <span>{a}</span>
              }
            },
            {
              field: 'subtotal',
              headerName: 'Total Amount',
              type: 'number',
              minWidth: 120,
              editable: false,
              sortable: false,
              headerAlign: 'center',
              align: 'center',
              flex: 1,
              valueGetter: (params) =>
                `$ ${params.row.subtotal}`,
            },
            {
              field: 'Order_Status',
              headerName: 'Order Status',
              type: 'number',
              minWidth: 120,
              editable: false,
              sortable: false,
              flex: 1,
              headerAlign: 'center',
              align: 'center',
              renderCell: (params) => {
                return <div className={`${params.row.Order_Status === "Pending" ? 'ResendOrder' : "ResendOrder1 "} padmingbtn `}>
                  <span className={` pandingDot`} > {params.row.Order_Status} </span>
                </div>
        
              }
            },
            {
              field: 'imGE',
              headerName: '',
              type: 'number',
              minWidth: 120,
              editable: false,
              sortable: false,
              flex: 1,
              headerAlign: 'center',
              align: 'center',
              renderCell: (params) => {
                return <IoAlertCircleOutline  color='#31b655' fontSize={23}/>
              }
            },
        ];
        const rows = recentorder

  return (
    <div className=' my-4 '>
      <div className='py-4 section_card'>
          <div  className='d-flex justify-content-between align-content-center px-4'> 
              <h3 className='pagetitle'><SlSocialDropbox color='#31B655' size={25}/>All Recent Order </h3>
              <div className='btnsgroup'>
              {/* <Link to={'/addstaff'}>
                  <button className="topbutton">Top Product</button>
              </Link> */}
              </div>
          </div>
          <div className='d-flex justify-content-end py-3 align-content-center'>
          
          </div>
          <div className='allusertable'>
              <Box className={classes.DataTableBoxStyle} >
                          <ThemeProvider theme={CustomFontTheme}>
                              <DataGrid
                                  rows={rows}
                                  columns={columns}
                                  getRowId={(row) => row.OrderId}
                                  pageSize={pageSize}
                                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                  pageSizeOptions={[ 10, 25, 50]}
                                  pagination
                                  disableRowSelectionOnClick
                                  disableColumnMenu
                                  disableColumnFilter
                                  disableColumnSelector
                                  autoHeight
                                  disableSelectionOnClick 
                                  rowSelection={false}
                                  className={classes.DataTableStyle}
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

export default Allrecentorder