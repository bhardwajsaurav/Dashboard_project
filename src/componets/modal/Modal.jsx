
import { AiFillCloseCircle } from 'react-icons/ai';
import { getAdLineItems, getDbmLineItems } from "../../Apis"
import "./modal.css"
import { useEffect, useState } from 'react';



const Modal = ({ setClose, lineItems }) => {
    console.log(lineItems && lineItems.flag)
    const [lineitems, setIineitems] = useState([])
    const [mapObj, setMapObj] = useState([])

    // const [lineitemHolder, setLineItemHolder] = useState([])
    // const [lineitemHolderdbm, setLineItemHolderDbm] = useState([])

    useEffect(() => {
        (async () => {
            if (lineItems && lineItems.flag === "ad") {
                let linedata = await getAdLineItems(lineItems && lineItems.camp_id, lineItems && lineItems.ad_id);
                setIineitems(linedata && linedata['data']);
                         console.log( lineItems.camp_id,lineItems.ad_id,"0")
                setMapObj( linedata?.data?.map((item) => item?.lineitem_id))
            }
            else {
                console.log( lineItems.camp_id,lineItems.ad_id,"0")
                let linedataDbm = await getDbmLineItems(lineItems && lineItems.camp_id, lineItems && lineItems.ad_id);
                // console.log(linedataDbm)
                setIineitems(linedataDbm["data"] && linedataDbm.data["line_items"]);
                console.log( lineitems)
            }


        })();
    }, [lineItems]);


// console.log(mapObj,"mapObj===")


    return (

        <>

            <div className="main_modal d-flex justify-content-center align-items-center" >

                <div className="modal_cus">
                    <AiFillCloseCircle className="text-white mb-2 fs-3" style={{ float: "right" }} onClick={() => { setClose(false)
              
                    } } />
                    <table className='tb_div'>
                        <tr>
                            <th className='radio_td'>
                                <input type="checkbox" name="" checked={mapObj.length===0} onClick={(e) => {
                                    if(e.target.checked){
                                        setMapObj([])
                                    } else{
                                        setMapObj( lineitems?.map((item) => item?.lineitem_id))

                                    ;} console.log(e.target.checked,"abc")} 
                                    } />
                                <span className='radio'></span>
                            </th>
                            <th>Line Items</th>

                        </tr>
            
                        {lineitems && lineitems.map((el) => {

                            return (<>
                                <tr >
                                    <td className='radio_td'>

                                        <input type="checkbox" name="" checked={!mapObj.includes(el?.lineitem_id)} value={el?.lineitem_id } onClick={(e) => {
                                            setMapObj((prev) => 
                                                !(e.target.checked)? [...prev, e.target.value] : prev.filter(id => id !== e.target.value)
                                            );
                                          
                                        }} />



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