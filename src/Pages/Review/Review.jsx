import React, { useState, useEffect,useContext } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Cookies from "universal-cookie";
import { ThemeProvider, Box, createTheme } from "@mui/material";
import { SlSocialDropbox } from "react-icons/sl";
import Axios from 'axios'
import { GoStarFill } from "react-icons/go";
import { MdOutlineEmail } from "react-icons/md";
import { BsTelephone } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { useLocation } from 'react-router-dom';
import Deletepopup from '../../Components/Component/Deletepopup';
import Successfullypopup from '../../Components/Component/Successfullypopup';
import useStyles from '../../Style';
import { useNavigate } from 'react-router-dom';
import Createcontext from '../../Hooks/Context/Context';
const Review = () => {
  const classes = useStyles()
  const location = useLocation();
  const [recentorder, setRecentorder] = useState([])
  const { state } = useContext(Createcontext);
  const cookies = new Cookies();
  const token_data = cookies.get("Token_access");
  const [pageSize, setPageSize] = React.useState(10)
  const [deleteoptn, setdeleteoprn] = useState(false)
  const [isdelete, setsisDelete] = useState(false)
  const [sucsesopen, setsucsesopen] = useState(false)
  const [reviewid, setreviewid] = useState({})
  const navigate = useNavigate()
  const [loader, setloader] = React.useState(true);

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }


  useEffect(() => {
    if (isdelete) {
      Axios.post('https://api.cannabaze.com/AdminPanel/DeleteReviews/', reviewid, {

        headers: {
          'Authorization': `Bearer ${token_data}`
        }
      }).then((res) => {
        setsisDelete(false)
        Axios.post('https://api.cannabaze.com/AdminPanel/ReviewsByStore/',
          { "SelectTime": "Year", "StartDate": "2023-02-01", "EndDate": "2024-02-02", "StoreId": location.state.item.id }, {
          headers: {
            'Authorization': `Bearer ${token_data}`
          }
        }).then((res) => {
          let a = res?.data?.map((item, index) => {
            if ("ProductName" in item) {
              return { ...item, mainID: index, reviewtype: { "productId": item?.id } }
            } else {
              return { ...item, mainID: index, reviewtype: { "StoreId": item?.id } }
            }
          })
          setRecentorder(a)
          setsucsesopen(true)
          setTimeout(() => {
            setsucsesopen(false)
          }, "3000");
        })
      })
    }
  }, [isdelete])

  useEffect(() => {
    setloader(true)
    Axios.post('https://api.cannabaze.com/AdminPanel/AllReviews/',
      { "SelectTime": "Year", "StartDate": "2023-02-01", "EndDate": "2024-02-01" }, {
      headers: {
        'Authorization': `Bearer ${token_data}`
      }
    }).then((res) => {
      setloader(false)
      setRecentorder(res.data)
    }).catch((error)=>{
      setloader(false)
  })
  }, [])

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
  function getRandomColor() {
    const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  const columns = [
    {
      sortable: true,
      field: 'lineNo',
      headerName: 'S No.',
      flex: 0,
      editable: false,
      renderCell: (params) =>
        params.api.getRowIndexRelativeToVisibleRows(params.row.id) + 1,
    },
    {
      field: 'VendorName',
      headerName: 'Name',
      minWidth: 150,
      editable: false,
      sortable: false,
      headerAlign: 'left',
      flex: 1,
      renderCell: (params) => {
        return <div className='pendingUserProfile' onClick={() => {
          navigate(`/userprofile/${params.row.user}`, {
            state: params.row
          })
        }}>
          <div className='userImage'>
            <div className="imageCircle" >
              <div className='userImageCircle'>

                <img src={params.row.userImage}   onError={(e) => {
                    e.target.style.display = 'none'; 
                    const parentContainer = e.target.parentNode;
                    const errorText = document.createElement('p');
                    errorText.textContent =  params.row.username.slice(0,1);
                    errorText.style.backgroundColor = getRandomColor(); 
                    errorText.style.height = '100%'; 
                    errorText.style.display = 'flex'; 
                    errorText.style.justifyContent = 'center'; 
                    errorText.style.alignItems = 'center';
                    parentContainer.appendChild(errorText);
                  }}
                />
              </div>
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
      headerName: 'E-mail',
      minWidth: 230,
      editable: false,
      headerAlign: 'center',
      sortable: false,
      flex: 1,
      renderCell: (params) => {
        return <ul className='pendingvendercontent'>
          {params?.row?.Email && <li className='content_item'> <span className='contactIcon'><MdOutlineEmail color='#6B6F7A' /></span>{params.row.Email}</li>}
          {params?.row?.MobileNo && <li className='content_item'> <span className='contactIcon'><BsTelephone color='#6B6F7A' /></span>{params.row.MobileNo}</li>}
        </ul>
      }
    },
    {
      field: 'rating',
      headerName: 'Rating',
      type: 'number',
      minWidth: 150,
      editable: false,
      sortable: false,
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      renderCell: (params) => {
        return <span>{
          Array(params.row.rating).fill().map(() => {
            return <GoStarFill size={18} color='rgba(0, 172, 79, 1)' />
          })}{
            Array(5 - params.row.rating).fill().map(() => {
              return <GoStarFill size={18} color='rgba(0, 172, 79, 0.41)' />

            })}
        </span>
      }
    },
    {
      field: 'comment',
      headerName: 'Reviews',
      flex: 1,
      editable: false,
      sortable: false,
      minWidth: 120,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'created_at',
      headerName: 'Date',
      type: 'number',
      minWidth: 120,
      editable: false,
      sortable: false,
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      renderCell: (params) => {
        return `${new Date(params.row.created_at).getDate()}/${new Date(params.row.created_at).getMonth() + 1}/${new Date(params.row.created_at).getFullYear()}`
      }
    },
    {
      field: 'StoreName',
      headerName: 'Store Name',
      type: 'number',
      minWidth: 120,
      editable: false,
      sortable: false,
      headerAlign: 'center',
      align: 'center',
      flex: 1,

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
          {state.Roles.DeleteReview  && <RiDeleteBin6Line onClick={() => { setreviewid(params.row.reviewtype); setdeleteoprn(true) }} color='#31B655' size={24} />}
          <IoIosInformationCircleOutline color='#31B655' size={24} />
        </span>
      }
    },
  ];
  const rows = recentorder
  return (
    <div className=' my-4 '>
      <div className='py-4 section_card'>
        <div className='d-flex justify-content-between align-content-center px-4'>
          <h3 className='pagetitle'><SlSocialDropbox color='#31B655' size={25} />Reviews</h3>
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
      {
            loader && <div className="loader_container">  <span className="newloader shine"><img src='/image/icon.png' alt='cannabaze logo' title='cannabaze logo' /></span>
            </div>
          }
    </div>
  )
}
export default Review