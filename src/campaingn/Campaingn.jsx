


import { React, useState } from "react";
import { Link } from "react-router-dom";
import "./campaingn.css"
import { IoIosArrowForward } from 'react-icons/io';
import { Mapped, getAdserver, getDbm } from "../Apis"
import Modal from "../componets/modal/Modal";
import StatusModal from "../componets/statusmodal/StatusModal";
import DeleteCamps from "../deleteCamp/page";
import { AiFillDelete } from "react-icons/ai";

const Campaingn = () => {
    const [datepicker, setDatePicker] = useState({
        start_date: null,
        end_date: null
    })
    const [close, setClose] = useState()
    const [checkHandle, setCheckHandle] = useState()
    const [lineItems, setLineItems] = useState()
    const [next, setNext] = useState(0)
    const [adserverdata, setAdserverData] = useState()
    const [dbm, setDbm] = useState()
    const [statusModal, setStatusModal] = useState()
    const [mapObj, setMapObj] = useState([])
    const [mapObj2, setMapObj2] = useState([])
    const [CampaignName, setCampaignName] = useState({name:""})
    const [delstatus,setDelStatus]  =useState()

    async function fetchData() {
        let advertiser = await getAdserver(datepicker.start_date, datepicker.end_date);
        let dbm = await getDbm(datepicker.start_date, datepicker.end_date);
        // console.log(dbm)
        // if(advertiser !== undefined)
        setAdserverData(advertiser)
        setDbm(dbm)
    }

    const inputHandlerModal = (e, ad_id, camp_id, flag) => {
        setCheckHandle(camp_id)
            setLineItems({
                ad_id: ad_id,
                camp_id: camp_id,
                flag: flag,
            })
            setClose(true)
    }

    const SaveMapped = async ()=>{
        const payLoad =
        {"dbm":mapObj2, "adserver":mapObj, "new_campaign":CampaignName.name,"start_date":datepicker.start_date,"end_date":datepicker.end_date}
       const data =  await Mapped(payLoad)
       setStatusModal(true) 
       
        
    }

    


  

    
    return (
        <>

            <section className="camp px-4 mb-3 position-relative">
                <div className="">
                    <div className="wrap">
                        <div className="date d-flex justify-content-end gap-2  ">
                        <button className="ms-2 common_button" >
                            Date
                        </button>
                            <div className="wrap_date">
                                <span className="me-4 start_span">start</span>
                                <input type="date" name="start_date" value={datepicker.start_date} onChange={e => { setDatePicker({ ...datepicker, [e.target.name]: e.target.value }) }} />
                                <span className="mx-2">to</span>
                                <input type="date" name="end_date" value={datepicker.end_date} onChange={e => { setDatePicker({ ...datepicker, [e.target.name]: e.target.value }) }} />
                            </div>

                            <button className="ms-2 common_button" onClick={fetchData}>
                                Report
                            </button>
                          
                            <AiFillDelete className="ms-2 common_button common_bg text-white p-3" style={{width:"50px",height:"50px" ,borderRadius:"70%"}} onClick={()=>{setDelStatus(true)}}/>

                        </div>

                        {
                            next === 0 ?
                                <div className="server_table mt-5">
                                    <button className="common_button mb-5">Server 1</button>
                                 
                    <Link to="/newcampaign"> <button className="common_button ms-2">New Campaingn</button></Link>  
              

                                    <div className="main_table">
                                        <table>
                                            <tr>
                                                <th></th>
                                                <th>Name Advertiser</th>
                                                <th>Campaigns</th>

                                            </tr>
                                            {

                                                adserverdata && adserverdata?.data?.length > 0  ? adserverdata['data'][0].campaigns.map((elem, index) => {
                                                    return (

                                                        <>

                                                            <tr key={"ad" + index}>
                                                                <td className='radio_td position-relative'>
                                                                <label htmlFor="" className="relative">
                                                                            <input type="checkbox" name="ad"  checked={elem?.campaign_id === checkHandle} onChange={(e) => { inputHandlerModal(e, adserverdata.data[0].advertiser_id, elem.campaign_id, "ad") }}/>
                                                                            <span className='checkmark'></span>
                                                                        </label>
                                                                </td>
                                                                <td >

                                                                    {
                                                                        adserverdata.data[0].advertiser
                                                                    }
                                                                </td>
                                                                <td >

                                                                    {elem.campaign_name}
                                                                </td>

                                                            </tr>
                                                        </>
                                                    )
                                                }) : adserverdata ===  undefined ? <h4 className="m-2">Please Select Campaingn Date</h4> :<h4 className="m-2">data not found</h4>
                                            }

                                        </table>
                                    </div>
                                    <div className="text-end mt-5">
                                        <button className="common_button" onClick={() => { setNext(1) }}>
                                            Next  <IoIosArrowForward />
                                        </button>
                                    </div>


                                </div> : next === 1 ?
                                    <div className="server_table mt-5 ">
                                        <button className="common_button mb-5">Server 2</button>

                                        <div className="main_table">
                                            <table>
                                                <tr>
                                                    <th></th>
                                                    <th>Name Advertiser</th>
                                                    <th>Campaigns</th>
                                                </tr>
                                                {

                                                    dbm &&  dbm['data']?.length > 0 ? dbm['data'][0]?.campaigns.map((elem, index) => {
                                                        return (

                                                            <>
                                                                           
                                                                <tr key={"ad" + index}>
                                                                    <td className='radio_td position-relative'>
                                                                        <label htmlFor="">
                                                                            <input type="checkBox" checked={elem?.campaign_id === checkHandle} name="dbm" onClick={(e) => { inputHandlerModal(e, dbm.data[0].advertiser_id, elem.campaign_id, "dbm") }}/>
                                                                            <span className='checkmark'></span>
                                                                        </label>
                                                                    </td>
                                                                    <td >

                                                                        {
                                                                            adserverdata.data[0].advertiser
                                                                        }
                                                                    </td>
                                                                    <td >

                                                                        {elem.campaign_name}
                                                                    </td>

                                                                </tr>
                                                            </>
                                                        )
                                                    }) : dbm===  undefined ? <h4 className="m-2">Please Select Campaingn Date</h4> :<h4 className="m-2">data not found</h4>
                                                }
                                            </table>
                                        </div>
                                        <div className="text-end mt-5">
                                            <button className="common_button me-3" onClick={() => { setNext(0) }}>
                                                Back  <IoIosArrowForward />
                                            </button>
                                            <button className="common_button" onClick={() => { setNext(3) }}>
                                                Next  <IoIosArrowForward />
                                            </button>
                                        </div>


                                    </div> : <div className="new_campaingns mt-5 ">
                                        <div className="d-flex">
                                            <button className="common_button px-4 py-1 me-3">New Campaingn Name</button>

                                            <input type="text"  name="name"  className="ps-3" onChange={(e)=>{setCampaignName({...CampaignName,[e.target.name]:e.target.value})}}/>
                                        </div>




                                        <div className="text-end mt-5">
                                            <button className="common_button me-3" onClick={() => { setNext(1) }}>
                                                Back  <IoIosArrowForward />
                                            </button>
                                            <button className="common_button" onClick={SaveMapped}>
                                                Save  <IoIosArrowForward />
                                            </button>
                                        </div>
                                    </div>

                        }


                    </div>
                </div>
                   {
                    close &&  <Modal   setClose={setClose} lineItems={lineItems}  mapObj={mapObj} setMapObj={setMapObj} mapObj2={mapObj2} setMapObj2={setMapObj2} />
                   }
                   
                    {
                        statusModal && <StatusModal setStatusModal={setStatusModal}/>
                    }
                    
                 


            </section>
              
            {
                delstatus &&
                <DeleteCamps setDelStatus={setDelStatus}/>
            }       
            
        </>
    )

}




export default Campaingn;