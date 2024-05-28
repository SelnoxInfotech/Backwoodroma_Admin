import React from 'react'
import {ClickAwayListener} from '@mui/base/ClickAwayListener';
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import {useNavigate} from 'react-router-dom'

const Successfullypopup = ({setsucsesopen ,link='' , popupset=''}) => {
    let navigate=useNavigate()
   
    function closefun(){
        setsucsesopen(false)
     
        if(link !== ''){
            navigate(link)
        }else if(popupset !== ''){
            popupset(false)  
        }
    }
    setTimeout(()=>{
        closefun()
    },4000)

  return (
    <div>
       
   
        <div className='sucsconfirmpopup'>
        <ClickAwayListener onClickAway={()=>{  closefun()  }}>
            <div className='sucspopup'>
                {/* <span className='closebtn'>X</span> */}
                <div className='Iconssucs'>
                    <span className='dangericon'> <IoCheckmarkCircleOutline /></span>
                </div>
                <p >successfully your Changes has been saved</p>
                <div className='d-flex gap-4'>
                    {/* <button className='flex-fill popupbtn'>sucs</button> */}
                    <button className='flex-fill popupbtn' onClick={()=>{closefun(false)}}>Done</button>
                </div>
            </div>
    </ClickAwayListener>

        </div>

    </div>
  )
}

export default Successfullypopup