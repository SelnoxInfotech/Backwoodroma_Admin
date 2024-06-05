import React , {useContext} from 'react'
import Cookies from 'universal-cookie';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { ThemeProvider } from "@mui/material/styles";
import { SlSocialDropbox } from "react-icons/sl";
import { createTheme } from "@mui/material/styles";
import Box from '@mui/material/Box';
import axios from "axios";
import { BsThreeDotsVertical } from 'react-icons/bs';
import Select from '@mui/material/Select';
import NewsSubCategoryEdit from "./EditSubCategory"
import Createcontext from "../../../Hooks/Context/Context"
import DeleteSubCategory from "./DeleteSubCategory"
import AddNewsCategory from "./AddSubCategory"
import useStyles from '../../../Style'
import { SectionCard } from '../../../molecules/SectionCard/Index';
export default function NewsSubCategory() {
    const classes = useStyles()
    const { state} = useContext(Createcontext)
  const [loader, setloader] = React.useState(true);
    const cookies = new Cookies();
    const token_data = cookies.get('Token_access')
    const CustomFontTheme = createTheme({
        typography: {
            fontSize: 25
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
    const [pageSize, setPageSize] = React.useState(10)

    const [totel, setTotal] = React.useState([])
    React.useEffect(() => {
        setloader(true)
        axios("https://api.cannabaze.com/AdminPanel/Get-NewsSubCategory", {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }

        }).then(response => {
            setTotal(response.data.data)
            setloader(false)
        }).catch(()=>{
            setloader(false)
        })
    }, [])
    
    const columns = [
        { field: 'name', headerName: 'Name', maxWidth: 150, minWidth: 80, flex: 1,sortable:false, editable: true, headerClassName: 'super-app-theme--header',headerAlign: 'left', align:"", },
        { field: 'category_name', headerName: 'News Category', type: 'text',sortable:false, editable: true, maxWidth: 150, minWidth: 110, flex: 1, headerClassName: 'super-app-theme--header',headerAlign: 'left', align:"left", },
        {
            field: 'Edit', headerName: 'Edit', type: 'button',sortable:false, headerClassName: 'super-app-theme--header', cellClassName: 'Edit',maxWidth: 150, minWidth: 110, flex: 1,headerAlign: 'center', align:"center",
            renderCell: (params) => (
                <>
                    <Box >
                        <Select 
                         sx={{
                            boxShadow: '', '.MuiOutlinedInput-notchedOutline': { border: "0px" },
                            "&.Mui-focused .MuiSelect-icon": { color: "#31B665" },
                            "&:hover": {
                                ".MuiSelect-icon": {
                                    color: "#31B665"
                                }
                            },
                        }}
                        
                        IconComponent={BsThreeDotsVertical} labelId="demo-simple-select-error-label">
                           <NewsSubCategoryEdit data={params.row} ></NewsSubCategoryEdit>
                       <DeleteSubCategory data={params.row}></DeleteSubCategory> 
                        </Select>
                    </Box>
                </>

            )


        }
    ]

    const rows = totel
return (
        <div>
                <SectionCard>

                
            

                        <div className='col-12 p-3 d-flex justify-content-between align-items-center'>
                            <h2 className='pagetitle'> <SlSocialDropbox color='#31B655' size={25}/>   News Sub Category</h2>
                           {state.Roles.AddBlogsSubcategory && <span> <h2> <AddNewsCategory></AddNewsCategory></h2></span>}
                        </div>

                        {/* <div className='col-12' >
                            <Box className={classes.DataTableBoxStyle} >
                                <ThemeProvider theme={CustomFontTheme}>
                                    <div style={{ height: 400, width: '100%', }}>
                                        <DataGrid rows={rows} columns={columns}
                                        disableColumnMenu
                                        disableColumnFilter
                                        disableColumnSelector
                                        className={classes.DataTableStyle}
                                        pageSize={pageSize}
                                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                        rowsPerPageOptions={[ 10, 20]}
                                        pagination
                                        disableSelectionOnClick 
                                        />
                                    </div>
                                </ThemeProvider>
                            </Box>
                        </div> */}
                </SectionCard>
                <div className="col-12">
                    <div className="listtable">
                        <ul>
                        {totel.map((item) => {
                    
                            return (
                            <li>
                                <div className="listitems">
                                <p>{item.name}</p>  
                                <p>{item.category_name}</p>
                                <div className="gap-3 d-flex">
                                     {/* <span >   <x  data={item} />  </span> 
                                     <span onClick={()=>{setdeleteoprn(true) ;Setcategoryid(item.id)}}>
                                        <RiDeleteBin6Line  size={16} />
                                    </span> */}
                                </div>
                                </div>
                            </li>
                            );
                        })}
                        <li></li>
                        </ul>
                    </div>
                </div>
                {loader &&  <div className="loader_container">  <span className="newloader shine"><img src='/image/icon.png' alt='cannabaze logo' title='cannabaze logo' /></span>
          </div>}
        </div>
)
}
