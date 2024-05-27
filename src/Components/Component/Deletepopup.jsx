import React from 'react'
import { RxCrossCircled } from "react-icons/rx";
import  ClickAwayListener  from '@mui/base/ClickAwayListener';
import Aos from "aos";
import "aos/dist/aos.css";
Aos.init({
  duration: 1200
});
const Deletepopup = ({setdeleteoprn ,setsisDelete}) => {

  return (
      <div className='deleteconfirmpopup' data-aos={'zoom-in'}>
          <ClickAwayListener onClickAway={()=>{setdeleteoprn(false)}}>
              <div className='deletepopup' >
                  <div className='Iconsdelete'>
                    <span className='dangericon'> <RxCrossCircled/></span>
                  </div>
                  <p >Are You Sure You want to Delete</p>
                  <div className='d-flex gap-4'>
                      <button className='flex-fill popupbtn' onClick={()=>{ setsisDelete(true); setdeleteoprn(false)}}>Delete</button>
                      <button className='flex-fill popupbtn' onClick={()=>{ setdeleteoprn(false)}}>Cancel</button>
                  </div>
              </div>
          </ClickAwayListener>
      </div>
  )
}
export default Deletepopup