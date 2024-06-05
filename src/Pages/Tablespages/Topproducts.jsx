import  React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import useStyles from '../../Style';
import { ThemeProvider , Box ,createTheme } from "@mui/material";
import { SlSocialDropbox } from "react-icons/sl";
import {useLocation} from 'react-router-dom'
const Topproducts = () => {
    const [loader, setloader] = React.useState(true);
    const location = useLocation()
    const classes= useStyles()
    const columns = [
   
      { field: 'ProductImage', headerName: 'Product Image', minWidth: 120, 
            renderCell:(params)=>{
                return <span className='image_circle_tsp'><img src={params.row.Image}/></span> 
            }
      },
      {
        field: 'ProductName',
        headerName: 'Product Name',
        minWidth: 120,
        editable: false,
        sortable:false,
        flex:1,
        headerAlign: "left",
        align: "left",
      },
      {
        field: 'category',
        headerName: 'Category',
        minWidth: 120,
        editable: false,
        sortable:false,
        flex:1,
        headerAlign: "center",
        align: "center",
      },
      {
        field: 'ProductPrice',
        headerName: 'Price',
        minWidth: 120,
        editable: false,
        sortable:false,
        flex:1,
        headerAlign: "center",
        align: "center",
        valueFormatter: ({ value }) => `$${value}` 
      },
      {
        field: 'ProductSalesCount',
        headerName: 'Sale Unit',
        sortable:false,
        minWidth: 80,
        editable: false,
        flex:1,
        headerAlign: "center",
        align: "center",
        valueFormatter: ({ value }) => `${value}` 
      },
      {
          field: 'Price',
          headerName: 'Total Sale Price',
          sortable:false,
          minWidth: 80,
          editable: false,
          flex:1,
          headerAlign: "center",
          align: "center",
          valueFormatter: ({ value }) => `$${value}` 
      },
      {
        field: 'StoreName',
        headerName: 'Store Name',
        sortable:false,
        minWidth: 80,
        editable: false,
        flex:1,
        headerAlign: "center",
        align: "center",
    },
    {
        field: 'Stock',
        headerName: 'Status',
        sortable:false,
        minWidth: 80,
        editable: false,
        flex:1,
        headerAlign: "center",
        align: "center",
        renderCell: (params) => {
            if (params.row.Stock === "IN Stock" ) {
              return <span className='statusactive'>In Stock</span>
            }else{
              return <span className='statusinactive'>Out Of stock</span>
            }
        },
    },
  
    ];
    const rows = location?.state
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
                    <h3 className='pagetitle'><SlSocialDropbox color='#31B655' size={25}/> Top Selling Product </h3>
                    <div className='btnsgroup'>
                    {/* <Link to={'/addstaff'}>
                        <button className="topbutton">Top Product</button>
                    </Link> */}
                    </div>
                </div>
                <div className='d-flex justify-content-end py-3 align-content-center'>
                
                </div>
                <div className='allusertable'>
                    <Box  className={classes.DataTableBoxStyle} >
                                <ThemeProvider theme={CustomFontTheme}>
                                    <DataGrid
                                        rows={rows}
                                        columns={columns}
                                        getRowId={(row) => row.Product_id}
                                        initialState={{
                                        pagination: {
                                            paginationModel: {
                                            pageSize: 10,
                                            },
                                        },
                                        }}
                                        pageSizeOptions={[ 10, 25, 50]}
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
            false && <div className="loader_container">  <span className="newloader shine"><img src='/image/icon.png' alt='cannabaze logo' title='cannabaze logo' /></span>
            </div>
          }
    </div>
  )
}

export default Topproducts