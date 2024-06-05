import { SlSocialDropbox } from "react-icons/sl";
import React ,{useState ,useContext} from "react"
import Box from "@mui/material/Box"
import axios from "axios";
import useStyles from "../../Style"
import {SectionCard} from "../../molecules/SectionCard/Index"
import { useNavigate } from "react-router-dom"
import Bannerupdatemodel from "./Bannerupdatemodel"
import Cookies from 'universal-cookie';
import Createcontext from '../../Hooks/Context/Context'
import Promotionallist from "./Promotionallist";
import Offeredlist from "./Offeredlist";
const PromotionalBannerList = () => {
    const navigate=useNavigate()
    const { state } = useContext(Createcontext);
    const cookies = new Cookies();
    const token_data = cookies.get('Token_access')
    const [bannertype , Setbannertype] = useState("Promotional Banner")
    const [openupdate, setOpenupdate] = React.useState(false);
    const classes = useStyles()
    const PromotionListRef = React.useRef(null)
    const [SelectId, SetSelectedId] = React.useState()
    const [loader, Setloader] = React.useState(false)
    const config = {
        headers: { Authorization: `Bearer ${token_data}` }
    };
    const [detailstype, setdetailstype] = React.useState('Promotional')
    const [datatable, Setdatatable] = React.useState([])

    const [editdata, Seteditdata] = React.useState([])
    const [getdataurl,Setgetdataurl] = React.useState('https://api.cannabaze.com/AdminPanel/Get-PromotionalBanners/')
        React.useEffect(() => {

            if( detailstype !== 'Promotional'){
                Setgetdataurl(()=>"https://api.cannabaze.com/AdminPanel/Get-PromotionalBanners/")
            }else{
                Setgetdataurl(()=>'https://api.cannabaze.com/AdminPanel/Get-HomePageBanner/')
            }
            axios.get(getdataurl , config ).then((response) => {
               let a = response.data.map((item,index)=>{return{...item , sno:index+1}})
              
                Setdatatable(a);
              
            });
        }, [openupdate ,detailstype ]);
       
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
       
     
    return (
        <div>
           
                       <div className="col-sm-4 col-6 py-5">
                           
                          

                           <div className='gap-4 d-flex'>
                                <button className='topbutton' onClick={()=>{setdetailstype("Promotional")}} style={{backgroundColor:!(detailstype === "Promotional") ? '#fff' : "#31B655", color:detailstype === "Promotional" ? '#fff' : "#31B655"}}>Promotional Banner</button>
                                <button className='topbutton' onClick={()=>{setdetailstype('Offer')}} style={{backgroundColor:!(detailstype==="Offer") ? '#fff' : "#31B655", color:detailstype==="Offer" ? '#fff' : "#31B655"}}>Offer Banner</button>

                           </div>
                       </div>
                        <SectionCard className="row section_card  ">
                            <div className="d-flex justify-content-between align-items-center mb-3" >
                                <h2 className='d-flex align-items-center pagetitle'> <SlSocialDropbox color='#31B655' size={25}/>{detailstype==='Promotional' ? "Promotional Banner" : "Offer Banner"}</h2>
                            
                                {   state.Roles.AddBanners    &&
                                <div className="col-sm-5  col-6">
                                    <Box className={` promotionalAddBannerListBtnCol  ${classes.promotionalListBtnss}`}>
                                        <button className="topbutton" onClick={()=>navigate("/PromotionalBanner" , { state: { detailstype } })}>+ Add Banner</button>
                                    </Box>
                                </div>}
                            </div>


                          
                           {detailstype==='Promotional' ? <Promotionallist Setloader={Setloader}/>: <Offeredlist Setloader={Setloader}/>}

                        </SectionCard>
                         {loader &&  <div className="loader_container">  <span className="newloader shine"><img src='/image/icon.png' alt='cannabaze logo' title='cannabaze logo' /></span>
                        </div>}
                        <Bannerupdatemodel openupdate={openupdate} bannertype={bannertype} setOpenupdate={setOpenupdate} Setloader={Setloader} data={editdata}/>
        </div>
    )
}
export default PromotionalBannerList