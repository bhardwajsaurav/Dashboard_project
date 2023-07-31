import React ,{useEffect, useState}from 'react'
import "./statusmodal.css"
import { AiFillCloseCircle } from 'react-icons/ai';
import { StatusManipulation, SubmitMapped } from '../../Apis';
import { useNavigate } from "react-router-dom";
export default function StatusModal({setStatusModal}) {
  const navigate = useNavigate();
  const [modalPop,setStatusPop] =useState(true)
  const [statusPOp,setStatusPOp] =useState(true)

  


  const SaveMapped = async ()=>{
       let data = await SubmitMapped()
       let data2 = await StatusManipulation()
       console.log(data)
       setStatusPOp(data2?.data?.status)
       setTimeout(() => {
        removeModal()
        navigate("/newcampaign");
    }, 3000);
     
  }

  const removeModal = (()=>{
    setStatusModal(false)
  })
  return (
    <div className='st'>
      {
      modalPop ?  <div className='title_div position-relative'>
      <AiFillCloseCircle className="text-white mb-2 fs-3" onClick={removeModal}/>

          <h3 className='mb-4'>Are you sure to save campaign</h3>

          <button className='m-auto d-block text-dark' style={{"background":"white"}} onClick={()=>{
            setStatusPop(false)
            SaveMapped()
          }} >
             Save
          </button>
      </div> : <div className='title_div position-relative'>
         <AiFillCloseCircle className="text-white mb-2 fs-3" onClick={()=>{setStatusModal(false)}}/>
               <h1>Status : {statusPOp}</h1>
         </div>
      }
        


        
    </div>
  )
}
