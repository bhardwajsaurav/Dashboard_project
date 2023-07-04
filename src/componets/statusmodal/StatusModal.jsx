import React ,{useEffect}from 'react'
import "./statusmodal.css"
import { AiFillCloseCircle } from 'react-icons/ai';
export default function StatusModal({setStatusModal}) {
  useEffect(() => {
    setTimeout(() => {
        removeModal()
    }, 1000);
  },);

  const removeModal = (()=>{
    setStatusModal(false)
  })
  return (
    <div className='st'>
         <div className='title_div position-relative'>
         <AiFillCloseCircle className="text-white mb-2 fs-3" onClick={()=>{setStatusModal(false)}}/>

             <h1>Status Is pendding</h1>
         </div>
    </div>
  )
}
