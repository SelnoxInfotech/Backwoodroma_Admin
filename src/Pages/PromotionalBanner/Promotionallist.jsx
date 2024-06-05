
import React ,{useState ,useContext} from "react"
import Box from "@mui/material/Box"
import { FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { IoEyeSharp } from "react-icons/io5";
import Dialog from '@mui/material/Dialog';
import useStyles from "../../Style"
import { DataGrid  } from '@mui/x-data-grid';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Bannerupdatemodel from "./Bannerupdatemodel"
import Cookies from 'universal-cookie';
import Successfullypopup from '../../Components/Component/Successfullypopup'
import Unsuccesspopup from '../../Components/Component/Unsuccesspopup'
import Deletepopup from '../../Components/Component/Deletepopup'
import Createcontext from '../../Hooks/Context/Context'
const Promotionallist = ({Setloader}) => {
    const classes = useStyles()
    const Swal = require('sweetalert2')
    const { state } = useContext(Createcontext);
    const [pageSize, setPageSize] = React.useState(10)
    const cookies = new Cookies();
    const token_data = cookies.get('Token_access')
    const [bannertype , Setbannertype] = useState("Promotional Banner")
    const [openupdate, setOpenupdate] = React.useState(false);
    const PromotionListRef = React.useRef(null)
    const [SelectId, SetSelectedId] = React.useState()
    const [sucsesopen , setsucsesopen] = useState(false)
    const [unsucsesopen , setunsucsesopen] = useState(false)
    const [deleteoptn , setdeleteoprn] = useState(false)
    const [isdelete , setsisDelete] = useState(false)
    const [deleteid , setdeleteid] = useState('')
    const config = {
        headers: { Authorization: `Bearer ${token_data}` }
    };
    const [datatable, Setdatatable] = React.useState([])
    const [editdata, Seteditdata] = React.useState([])
        React.useEffect(() => {

         
            axios.get('https://api.cannabaze.com/AdminPanel/Get-PromotionalBanners/' , config ).then((response) => {
               let a = response.data.map((item,index)=>{return{...item , sno:index+1}})
                Setdatatable(a);
            });
        }, []);
        function handelstatus( data){
            let sts = data.status === "Active"? "Hide":"Active"
            Setloader(true)
            axios.post(`https://api.cannabaze.com/AdminPanel/update-PromotionalBanners/${data.id}` ,{
                "status" : sts
            } ,config).then((res)=>{
                axios.get('https://api.cannabaze.com/AdminPanel/Get-PromotionalBanners/' , config ).then((response) => {
                Setdatatable(response.data);
                Setloader(false)
            });
            }).catch((error)=>{
                Setloader(false)
                console.trace(error)
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Something went wrong!",
                
                });
            })
        }
        function editdat(data){
            Seteditdata(data)
            setOpenupdate(true)
        }


        const columns= [
            { field: 'sno', headerName: 'S No.', width: 90  },
            {
            field: 'Title',
            headerName: 'Title',
            minWidth: 80,
            editable: false,sortable:false,
            flex: 1,
            },
            {
            field: 'Country',
            headerName: 'Country',sortable:false,
            minWidth: 80,
            editable: false,
            flex: 1,
            },
            {
            field: 'State',
            headerName: 'State',sortable:false,
            type: 'number',
            minWidth: 80,
            editable: false,
            flex: 1,
            headerAlign: 'left',
            align: 'left',
            },
            {
                field: 'Banner',
                headerName: 'Desktop Banner',
                flex: 1,
                sortable: false,
                minWidth: 200,
                renderCell: (params) => {
                    const onClick = (e) => {
                        e.stopPropagation(); 
                    }            
                    return (
                       
                        <span>
                             <img src={params.row.Banner} alt="" style={{ width: "180px", height: "80px", borderRadius: "1px" }} />                                     
                        </span>
                         
                    )
                }
            },
            {
                    field: 'mobile',
                    headerName: 'Mobile Banner',
                    flex: 1,
                    sortable: false,
                    minWidth: 150,
                    renderCell: (params) => {
                        const onClick = (e) => {
                            e.stopPropagation(); 
                        }            
                        return (
                           <span>
                             <img src={params.row.mobile} alt="" style={{ width: "140px", height: "80px", borderRadius: "1px" }} />                                     
                           </span>
                        )
                    }
            },
            {
            field: 'Status',
            headerName: 'Status',
            flex: 1,
            sortable: false,
            minWidth: 80,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => {
                const onClick = (e) => {
                    e.stopPropagation(); 
                }            
                return (
                    <span className="cursor-pointer" onClick={()=>{handelstatus(params.row)}}>
                    
                    {params.row.status === "Active" ? <IoEyeSharp  size={25} color="#31B655" className="cursor-pointer"/> : <FaEyeSlash className="cursor-pointer"  size={25} color="#31B655"/>}
                    </span>
                )
            }
            },
            {
                field: 'edit',
                headerName: 'Edit',
                editable: false,
                sortable: false,
                maxWidth: 100,
                headerAlign: 'center',
                align: 'center',
                flex: 1,
                renderCell: (params) => {
                    const onClick = (e) => {
                        state.Roles.EditBanners    &&  e.stopPropagation(); 
                    }            
                    return (
                        <>
                          {   (state.Roles.EditBanners || state.Roles.DeleteBanners  )   &&
                              <Box
                              sx={{
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
                              }}
                          >
                                {   state.Roles.EditBanners    &&  <FaEdit  color='31B665' onClick={()=>{editdat(params.row)}} size={22}/>   }
                                {   state.Roles.DeleteBanners    && <RiDeleteBin6Line color='31B665'  onClick={(e)=>{ setdeleteoprn(true) ; setdeleteid(params.row.id)}} size={22}/> }
                                
                            
</Box>
                            
                          }
                        </>
                    )
                }

            },
        ];
        const rows =datatable
        React.useEffect(() => {
            const handleClickOutsidePromotionList = (event) => {
                if (PromotionListRef.current && !PromotionListRef.current.contains(event.target)) {
                    if (SelectId) {
                        SetSelectedId((SelectId) => !SelectId)
                    }
                }
            };
            document.addEventListener('click', handleClickOutsidePromotionList, true);
            return () => {
                document.removeEventListener('click', handleClickOutsidePromotionList, true);
            };
        }, [SelectId]);
       
        const getRowSpacing = React.useCallback((params) => {
            return {
              top: params.isFirstVisible ? 0 : 5,
              bottom: params.isLastVisible ? 0 : 5,
            };
          }, []);
       

       React.useEffect(()=>{
        if(isdelete){
            axios.delete(`https://api.cannabaze.com/AdminPanel/delete-PromotionalBanners/${deleteid}`, config).then((res)=>{
                setsucsesopen(true)          
            axios.get('https://api.cannabaze.com/AdminPanel/Get-PromotionalBanners/' , config ).then((response) => {
                Setdatatable(response.data);
                Setloader(false)
            });
        }).catch((error)=>{
            setunsucsesopen(true)
        })
    
        }
       },[isdelete])

      
  return (
    <div>

            <Box className={classes.DataTableBoxStyle} >
                <DataGrid
                    rows={rows}
                    columns={columns}
                    getRowSpacing={getRowSpacing}
                    disableColumnMenu
                    disableColumnFilter
                    disableColumnSelector
                    disableSelectionOnClick
                    autoHeight
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[ 10, 20]}
                    pagination
                    className={classes.DataTableStyle}
                    loading={!Boolean(datatable)}
                />
            </Box>
           
           
            <Bannerupdatemodel openupdate={openupdate} bannertype={bannertype} setOpenupdate={setOpenupdate} Setloader={Setloader} data={editdata}/>
            <Dialog   open={sucsesopen}  keepMounted   onClose={()=>{}}  aria-describedby="alert-dialog-slide-description" >
               {   sucsesopen && <Successfullypopup  setsucsesopen={setsucsesopen} />}
            </Dialog>
            <Dialog   open={unsucsesopen}  keepMounted  onClose={()=>{}}  aria-describedby="alert-dialog-slide-description" >
               {   unsucsesopen && <Unsuccesspopup setsucsesopen={setunsucsesopen} />}
            </Dialog>
            <Dialog   open={deleteoptn}   keepMounted  onClose={()=>{}}  aria-describedby="alert-dialog-slide-description" >
               {   deleteoptn &&  <Deletepopup setdeleteoprn={setdeleteoprn} setsisDelete={setsisDelete} />}
            </Dialog>
    </div>
   
  )
}

export default Promotionallist