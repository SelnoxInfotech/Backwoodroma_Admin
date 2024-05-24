import React from 'react'
import ClickAwayListener from '@mui/base/ClickAwayListener';
import {useNavigate} from 'react-router-dom'
import { RxCrossCircled } from "react-icons/rx";

const Unsuccesspopup = ({setsucsesopen ,link='' , popupset=''}) => {
    let navigate=useNavigate()
   
    function closefun(){
        setsucsesopen(false)
       
        if(link !== ''){
            // navigate(link)
        }else if(popupset !== ''){
            popupset(false)  
        }
    }
    setTimeout(()=>{
        closefun()
    },4000)

  return (
    
                <div className='deleteconfirmpopup'>
                <ClickAwayListener onClickAway={()=>{closefun()}}>
                    <div className='deletepopup'>
                        {/* <span className='closebtn'>X</span> */}
                        <div className='Iconsdelete'>
                            <span className='dangericon'> <RxCrossCircled/></span>
                        </div>
                        <p >Something went wrong, Please try Again</p>
                        <div className='d-flex gap-4'>
                            <button className='w-100 flex-fill popupbtn' onClick={()=>{closefun()}}>Try Again</button>
                           
                        </div>
                    </div>
            </ClickAwayListener>

                </div>
  )
}

export default Unsuccesspopup