import { React} from 'react';
import { ImCancelCircle } from 'react-icons/im';

const Modal = ({mappedstatus,setMappedStatus})=>{
       

    const updateMapped = ()=>{
         
        setMappedStatus(false)
        window.location.reload();
    }
     return(
         <>
         
                <div className='modal'>
                   <div className='inner_modal'>
                         <h2>{mappedstatus}</h2>
                         <ImCancelCircle onClick={updateMapped}/>
                   </div>
                </div>            

         </>
     )
     
}


export default Modal;