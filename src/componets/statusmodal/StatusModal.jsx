import React ,{useEffect, useState}from 'react'
import "./statusmodal.css"
import { AiFillCloseCircle } from 'react-icons/ai';
export default function StatusModal({setStatusModal}) {
  const [modalPop,setStatusPop] =useState(true)
  useEffect(() => {
    setTimeout(() => {
        removeModal()
    }, 3000);
  },);

  const removeModal = (()=>{
    setStatusModal(false)
  })
  return (
    <div className='st'>
      {
      modalPop ?  <div className='title_div position-relative'>
      <AiFillCloseCircle className="text-white mb-2 fs-3" onClick={removeModal}/>

          <h3 className='mb-4'>Are you sure to save campaign</h3>

          <button className='m-auto d-block text-dark' style={{"background":"white"}} onClick={()=>{setStatusPop(false)}}>
             Save
          </button>
      </div> : <div className='title_div position-relative'>
         <AiFillCloseCircle className="text-white mb-2 fs-3" onClick={()=>{setStatusModal(false)}}/>
               <h1>Status : Penddig</h1>
         </div>
      }
        


        
    </div>
  )
}
