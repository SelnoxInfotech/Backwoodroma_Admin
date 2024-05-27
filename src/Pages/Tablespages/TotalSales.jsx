import React, { useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import useStyles from '../../Style';
import { ThemeProvider , Box ,createTheme } from "@mui/material";
import { SlSocialDropbox } from "react-icons/sl";
import Axios from 'axios';
import Cookies from 'universal-cookie';
import {Counterbox} from '../../molecules/Counterbox/Index'
import { FaArrowTrendDown , FaArrowTrendUp  } from "react-icons/fa6";

const TotalSales = () => {
    const [dataapi , setapidata]= React.useState([]);
    const classes= useStyles();
    const cookies = new Cookies();
    const token_data = cookies.get('Token_access');
    const [topdata, settopdata]= React.useState({});
    const [pageSize, setPageSize] = React.useState(10);
    const columns = [
      {
        field: 'StoreName',
        headerName: 'Store Name',
        minWidth: 120,
        editable: false,
        sortable:false,
        flex:1,
        headerAlign: "left",
        align: "left",
      },
      {
        field: 'Pickup',
        headerName: 'Store',
        minWidth: 120,
        editable: false,
        sortable:false,
        flex:1,
        headerAlign: "center",
        align: "center",
        valueFormatter: ({ value }) => `$${value}` 
      },
      {
        field: 'delivery',
        headerName: 'Delivery',
        minWidth: 120,
        editable: false,
        sortable:false,
        flex:1,
        headerAlign: "center",
        align: "center",
        valueFormatter: ({ value }) => `$${value}` 
      },
      {
        field: 'curbsidepickup',
        headerName: 'curbside pickup',
        sortable:false,
        minWidth: 80,
        editable: false,
        flex:1,
        headerAlign: "center",
        align: "center",
        valueFormatter: ({ value }) => `$ ${value} ` 
      },
     
     
    {
        field: 'Total',
        headerName: 'Total Sales',
        sortable:false,
        minWidth: 80,
        editable: false,
        flex:1,
        headerAlign: "center",
        align: "center",
        renderCell: (params) => {  
              return `$ ${params.row.curbsidepickup + params.row.delivery + params.row.Pickup }`
        },
    },
  
    ];
    const rows = dataapi
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
    useEffect(()=>{
        Axios.post('https://api.cannabaze.com/AdminPanel/TotalSalesPage/',
        {"SelectTime":"ThisYear","StartDate":"2024-01-01","EndDate":"2024-02-06","LastStartDate":"2023-12-01","EndStartDate":"2023-12-31"},
        {
      headers: {
        'Authorization': `Bearer ${token_data}`
        } }).then((res)=>{
        let a = res.data.map((item , index)=>{
              return {
                ...item, id : index+1
              }
        })
        
        let lastdata = a.pop()
        settopdata(lastdata)
          setapidata(a)
        })


    },[])
     
  return (
    <div className=' my-4 '>
        <div className='py-4 section_card'>
            <div  className='d-flex gap-4 align-content-center px-4'> 
                <h2 className='pagetitle'><SlSocialDropbox color='#31B655' size={25}/> Total Sales </h2>
                <div>
             
                <Counterbox bgcolor={topdata.Growth ? 'rgba(81, 176, 157, 0.15)' : 'rgb(255 0 0 / 15%)' }  padding="3px 5px" color={topdata.Growth ? 'rgba(0, 172, 79, 1)' : 'rgb(255 0 0 / 90%)'} size='24px' height='1.2' fontweight='700' >
                {!topdata.Growth ? <FaArrowTrendDown /> : <FaArrowTrendUp /> }   {topdata.TotalSales}
                </Counterbox>
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
                                    getRowId={(row) => row.id}
                                    pageSize={pageSize}
                                            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                            rowsPerPageOptions={[ 10, 20]}
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
    </div>
  )
}

export default TotalSales