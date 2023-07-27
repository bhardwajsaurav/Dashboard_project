
import { AiFillCloseCircle } from 'react-icons/ai';
import { getAdLineItems, getDbmLineItems } from "../../Apis"
import "./modal.css"
import { useEffect, useState } from 'react';



const Modal = ({ setClose, lineItems, mapObj, setMapObj, mapObj2, setMapObj2 }) => {


    
    const [lineitems, setIineitems] = useState([])


    
    const [allGet, setAllGet] = useState(false)
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
         if(allGet[e.target.name]){
            obj[e.target.name] = false
           let filter = mapObj?.filter((elem)=>{
                return elem !== e.target.name
                               
            })
            setMapObj(filter) 
         }
         else{
            obj[e.target.name] = true
            mapObj.push( e.target.name)
            setMapObj(mapObj) 
         }
        setAllGet(prev=>({...prev,...obj}))
        
    }

    // console.log(mapObj)
   

    


    const getAllHandle = (e) => {
        if(e.target.checked ===true){
            lineitems?.map((el,index)=>{
                let obj = {}
                if(el?.lineitem_id){
                    obj[el?.lineitem_id] = true
                    setAllGet(prev=>({...prev,...obj}))
                    mapObj.push(el?.lineitem_id)
                    setMapObj(mapObj)
                   
                }   

                else{
                    obj[el?.line_item_id] = true
                    setAllGet(prev=>({...prev,...obj}))
                    mapObj2.push(el?.line_item_id)
                    setMapObj2(mapObj)
                    
                }
               
               
               
            })
        }

        else{
            // setAllGet([])
            let filter = lineitems?.filter((elem,index)=>{
               
                    if(mapObj[index] !== elem.lineitem_id){
                        setMapObj(mapObj[index])
                    }  
            
                    
            })
            // console.log(filter,"----")
           
        }
       
    }

    console.log(mapObj)
    

    





    

  


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
        
                                            <input type="checkbox" name={el?.lineitem_id}  checked={allGet && allGet[el.lineitem_id] === true ? true :false} value={el?.lineitem_id} onChange={(e) => { DataHandle(e,index) }} />
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
                                            <input type="checkbox"  name={el?.line_item_id}  checked={allGet && allGet[el?.line_item_id] === true ? true :""}  value={el?.line_item_id}  onChange={(e) => { DataHandle(e,index) }} />

                                            


                                            <span className='checkmark'></span>
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