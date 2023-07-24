
import { AiFillCloseCircle } from 'react-icons/ai';
import { getAdLineItems, getDbmLineItems } from "../../Apis"
import "./modal.css"
import { useEffect, useState } from 'react';



const Modal = ({ setClose, lineItems, mapObj, setMapObj, mapObj2, setMapObj2 }) => {


    
    const [lineitems, setIineitems] = useState([])

    useEffect(()=>{
        console.log("")
       },[lineitems])
    
    // const [allGet, setAllGet] = useState([])
    // const [allGetStatus, setAllGetStatus] = useState(false)
    // const [lineitemHolderdbm, setLineItemHolderDbm] = useState([])

    useEffect(() => {
        (async () => {
            if (lineItems && lineItems.flag === "ad") {
                let linedata = await getAdLineItems(lineItems && lineItems.camp_id, lineItems && lineItems.ad_id);
                setIineitems(linedata && linedata['data']);
                // lineitems?.map((elem) => {
                //     return( elem['check'] = "") 
                // })
            }
            else {
                let linedataDbm = await getDbmLineItems(lineItems && lineItems.camp_id, lineItems && lineItems.ad_id);
                //  console.log(linedataDbm)
                setIineitems(linedataDbm && linedataDbm['data']?.line_items);

            }
        })();
    }, [lineItems]);

   
    const DataHandle = (e,index) => {
        if(e.target.checked === false)
        {      
                return(lineitems[index]['check'] = false)                     
        }
        else
        {
                return(lineitems[index]['check'] = false)                     
        }
    }



    const getAllHandle = (e) => {
        if(e.target.checked) 
        {
            lineitems?.map((elem)=>{  
               
                return(elem['check'] = true)                     
       })
        } 
        else{
            lineitems?.map((elem)=>{  
                return( elem['check'] = false)         
            })
        }
      
    }

    console.log(lineitems[0]?.check)





    

  


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
                                            {/* <p>{el?.check}</p> */}
                                            <input type="checkbox" checked={el?.check} value={el?.lineitem_id} onChange={(e) => { DataHandle(e,index) }} />
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