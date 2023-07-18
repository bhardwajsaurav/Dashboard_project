
import { AiFillCloseCircle } from 'react-icons/ai';
import { getAdLineItems, getDbmLineItems } from "../../Apis"
import "./modal.css"
import { useEffect, useState } from 'react';



const Modal = ({ setClose, lineItems,mapObj ,setMapObj}) => {
    console.log(lineItems && lineItems.flag)
    const [lineitems, setIineitems] = useState([])
   

    // const [lineitemHolder, setLineItemHolder] = useState([])
    // const [lineitemHolderdbm, setLineItemHolderDbm] = useState([])

    useEffect(() => {
        (async () => {
            if (lineItems && lineItems.flag === "ad") {
                let linedata = await getAdLineItems(lineItems && lineItems.camp_id, lineItems && lineItems.ad_id);
                setIineitems(linedata && linedata['data']);
            }
            else {
                let linedataDbm = await getDbmLineItems(lineItems && lineItems.camp_id, lineItems && lineItems.ad_id);
                setIineitems(linedataDbm["data"] && linedataDbm.data["line_items"]); 
            }
        })();
    }, [lineItems]);

    console.log(mapObj,"mapObj===")
    const DataHandle = (id)=>{
      
        mapObj.push(id)
        setMapObj(mapObj)
    }



    return (

        <>

            <div className="main_modal d-flex justify-content-center align-items-center" >

                <div className="modal_cus">
                    <AiFillCloseCircle className="text-white mb-2 fs-3" style={{ float: "right" }} onClick={() => { setClose(false)
              
                    } } />
                    <table className='tb_div'>
                        <tr>
                            <th className='radio_td'>
                                <input type="checkbox" name="" 
                                     />
                                <span className='radio'></span>
                            </th>
                            <th>Line Items</th>

                        </tr>
            
                        {lineitems && lineitems.map((el) => {

                            return (<>
                                <tr >
                                    <td className='radio_td relative'>

                                        <input type="checkbox"   value={el?.lineitem_id } onChange={()=>{DataHandle(el?.lineitem_id)}} />



                                        <span className='radio'></span>
                                    </td>
                                    <td>
                                        {el.lineitem_name ?el.lineitem_name :el.line_item  }
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