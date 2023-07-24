
import { AiFillCloseCircle } from 'react-icons/ai';
import { getAdLineItems, getDbmLineItems } from "../../Apis"
import "./modal.css"
import { useEffect, useState } from 'react';



const Modal = ({ setClose, lineItems, mapObj, setMapObj, mapObj2, setMapObj2 }) => {


    
    const [lineitems, setIineitems] = useState([])


    
    const [allGet, setAllGet] = useState()
    // const [allGetStatus, setAllGetStatus] = useState(false)
    // const [lineitemHolderdbm, setLineItemHolderDbm] = useState([])
   

    useEffect(() => {
        (async () => {
            if (lineItems && lineItems.flag === "ad") {
                let linedata = await getAdLineItems(lineItems && lineItems.camp_id, lineItems && lineItems.ad_id);
                setIineitems(linedata && linedata['data']);
                
            }
            else {
                let linedataDbm = await getDbmLineItems(lineItems && lineItems.camp_id, lineItems && lineItems.ad_id);
                //  console.log(linedataDbm)
                setIineitems(linedataDbm && linedataDbm['data']?.line_items);

            }
           
        })();
    }, [lineItems]);

   
    const DataHandle = (e,index) => {
        let obj = {}
        obj[e.target.name] = false
        setAllGet(prev=>({...prev,...obj}))
        console.log(allGet)
    }



    const getAllHandle = (e) => {
        if(e.target.checked ===true){
            lineitems?.map((el,index)=>{
                let obj = {}
                obj[el?.lineitem_id] = true
                setAllGet(prev=>({...prev,...obj}))
            })
        }

        else{
            setAllGet([])
        }
        

     
       
    }


    

    





    

  


    return (

        <>

            <div className="main_modal d-flex justify-content-center align-items-center" >

                <div className="modal_cus">
                    <AiFillCloseCircle className="text-white mb-2 fs-3" style={{ float: "right" }} onClick={() => {
                        setClose(false)

                    }} />
                    <table className='tb_div'>
                        <tr>
                            <th className='radio_td position-relative'>
                                <input type="checkbox" name="" onClick={(e)=>{getAllHandle(e)}} />
                                <span className='checkmark'></span>
                            </th>
                            <th>Line Items</th>

                        </tr>

                        {lineItems.flag === "ad" ? lineitems && lineitems.map((el,index) => {

                            return (<>
                                <tr >
                                    
                                    <td className='radio_td position-relative'>
                                        <label htmlFor="">
        
                                            <input type="checkbox" name={el?.lineitem_id}  checked={allGet && allGet[el.lineitem_id] === true ? true :""} value={el?.lineitem_id} onChange={(e) => { DataHandle(e,index) }} />
                                            <span className='checkmark'></span>
                                        </label>


                                    </td>
                                    <td>
                                        {el.lineitem_name ? el.lineitem_name : el.line_item}
                                    </td>
                                </tr>
                            </>)

                        }) : lineitems && lineitems.map((el,index) => {

                            return (<>
                                <tr >
                                    <td className='radio_td position-relative'>
                                        <label htmlFor="">
                                            <input type="checkbox"   value={el?.lineitem_id}  onChange={(e) => { DataHandle(e,index) }} />



                                            <span className='radio'></span>
                                        </label>

                                    </td>
                                    <td>
                                        {el.lineitem_name ? el.lineitem_name : el.line_item}
                                    </td>
                                </tr>
                            </>)

                        })}
                    </table>
                </div>
            </div>




        </>
    )

}


export default Modal;