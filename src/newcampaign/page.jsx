import React, { useState } from 'react'
import { IoIosArrowForward } from 'react-icons/io';

import "./page.css"
import { ListingUploadCampaigns, NewLineItems } from '../Apis';

export default function NewCamp() {
    const [next, setNext] = useState(0)
    const [checkHandle, setCheckHandle] = useState()
    const [dataNewL, setDataNewL] = useState(0)
    const [newCampData, setNewCampData] = useState()
    const [lineNew,setLineNew]  =useState()
    const [datepicker, setDatePicker] = useState({
        start_date: null,
        end_date: null
    })

    async function fetchData() {
        let newCamp = await ListingUploadCampaigns(datepicker.start_date, datepicker.end_date);
        setNewCampData(newCamp)
    }


    const getLineNew =  async ()=>{
        
        let newCamp = await NewLineItems(datepicker.start_date, datepicker.end_date,parseInt(lineNew));
        console.log(newCamp)
        setDataNewL(newCamp)
    }


    console.log(lineNew)




    return (
        <section className="camp px-4 mb-3 position-relative">
            <div className="">
                <div className="wrap">
                    <div className="date d-flex justify-content-end  gap-2 ">
                        <button className="ms-2 common_button" >
                            Date
                        </button>
                        <div className="wrap_date">
                            <span className="me-4 start_span">start</span>
                            <input type="date" name="start_date" value={datepicker.start_date} onChange={e => { setDatePicker({ ...datepicker, [e.target.name]: e.target.value }) }} />
                            <span className="mx-2">to</span>
                            <input type="date" name="end_date" value={datepicker.end_date} onChange={e => { setDatePicker({ ...datepicker, [e.target.name]: e.target.value }) }} />
                        </div>

                        <button className=" common_button" onClick={fetchData}>
                            Report
                        </button>

                    </div>



                    {
                        next === 0 ? <div className='tables'>

                            <div className='py-2 px-5 common_bg d-inline-block mt-5'>
                                <p className='mb-0 text-white'>New Campaign Name</p>
                            </div>
                            <table className='mt-5'>
                                <tr>
                                    
                                    <th></th>
                                   <th>Campaign Name</th>
                                    
                                </tr>
                                {

                                    newCampData  ? newCampData?.data?.data?.map((elem, index) => {
                                        return (

                                            <>

                                                <tr key={"ad" + index}>
                                                    <td className='radio_td position-relative'>
                                                        <label htmlFor="">
                                                            <input type="checkbox" name="ad" checked={elem.campaign_id  === lineNew} onChange={()=>{setLineNew(elem.campaign_id)}}/>
                                                            <span className='checkmark'></span>
                                                        </label>
                                                    </td>
                                                    <td >

                                                        {
                                                            elem.campaign_name
                                                        }
                                                    </td>
                                                   



                                                </tr>
                                            </>
                                        )
                                    }) : newCampData === undefined ? <h4 className="m-2">Please Select Campaingn Date</h4> : <h4 className="m-2">data not found</h4>
                                }


                            </table>

                            <div className="text-end mt-5">
                                {/* <button className="common_button me-3" >
                                    Back  <IoIosArrowForward />
                                </button> */}
                                 {
                                   lineNew &&  <button className="common_button" onClick={() => { setNext(1) 
                                    getLineNew()
                                    
                                    }} >
                                        Next  <IoIosArrowForward />
                                    </button>
                                }
                            </div>
                        </div> : <div className='tables'>

                            <div className='py-2 px-5 common_bg d-inline-block mt-5'>
                                <p className='mb-0 text-white'>New Campaign Name</p>
                            </div>
                            <div className='wrap_tables'>
                            <table className='mt-5 '>
                                <tr>

                                    <th></th>
                                    <th>Advertiser Name</th>
                                    <th>Campaign Name</th>
                                    <th>Conversions</th>
                                    <th>Impressions</th>
                                    <th>Interactive Impressions</th>
                                    <th>Total Interaction Time</th>
                                    <th>Total Media Cost</th>
                                </tr>

                                {

dataNewL? dataNewL?.data?.data[lineNew]?.map((elem, index) => {

    return (

        <>

            <tr key={elem}>
                <td className='radio_td'>
                    <label htmlFor="">
                        <input type="checkbox" name="ad" onChange={()=>{setLineNew(elem.campaign_id)}}/>
                        <span className='radio'></span>
                    </label>
                </td>
                <td >

                    {
                        elem.advertiser_name
                    }
                </td>

                <td>
                {elem.campaign_name}
                </td>

                <td>
                    {elem.conversions}
                </td>
                <td>
                    {elem.impressions}
                </td>
                <td>{elem.interactive_impressions}</td>
                <td>{elem.total_interaction_time}</td>
                <td>{elem.total_media_cost}</td>


            </tr>
        </>
    )
}) : dataNewL === undefined ? <h4 className="m-2">Please Select Campaingn Date</h4> : <h4 className="m-2">data not found</h4>
}
                              
                              
                            </table>
                            </div>
                           

                            <div className='my-5'>
                                <div className='row gap-4'>
                                    <div className='col-md-5'>

                                        <div className='row align-items-center'>
                                            <div className='col-md-4'>
                                                <div className='engage_div p-2 text-white common_bg text-center font-weight-bold mb-2'>
                                                    Click to <br />  Engagement <br />
                                                    Engagement Ratio
                                                </div>
                                            </div>

                                            <div className='col-md-8'>
                                                <div className='input_Div'>
                                                    <div className='d-flex gap-2 mb-4'>
                                                        <input type="text" />
                                                        <input type="text" />
                                                    </div>

                                                    <div className='d-flex gap-2 mb-4'>
                                                        <input type="text" />
                                                        <input type="text" />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        <div className='row align-items-center'>
                                            <div className='col-md-4'>
                                                <div className='engage_div engage_div p-2 text-white common_bg text-center font-weight-bold mb-2'>
                                                    Cost Per <br />  Engagement <br />

                                                </div>
                                            </div>

                                            <div className='col-md-8'>
                                                <div className='input_Div'>
                                                    <div className='d-flex gap-2 mb-4'>
                                                        <input type="text" />
                                                        <input type="text" />
                                                    </div>


                                                </div>

                                            </div>
                                        </div>

                                        <div className='row align-items-center'>
                                            <div className='col-md-4'>
                                                <div className='engage_div engage_div p-2 text-white common_bg text-center font-weight-bold mb-2'>
                                                    Cost Per <br />  Time <br />

                                                </div>
                                            </div>

                                            <div className='col-md-8'>
                                                <div className='input_Div'>


                                                    <div className='d-flex gap-2 mb-4'>
                                                        <input type="text" />
                                                        <input type="text" />
                                                    </div>



                                                </div>
                                            </div>

                                        </div>






                                        {/*
                                   */}
                                    </div>

                                    <div className='col-md-3'>
                                        <div className='button_last_saving'>
                                            <div className='mb-3'>
                                                <input type="checkbox" className='me-3' />
                                                <span>Apply to All</span>
                                            </div>
                                            <div>
                                                <button className='common_bg text-white mb-3'>
                                                    Last Saved
                                                </button>
                                            </div>
                                            <div>
                                                <button className='common_bg text-white'>
                                                    Saved
                                                </button>
                                            </div>



                                        </div>

                                    </div>


                                    {/**/}
                                </div>
                            </div>

                            <div className="text-end mt-5">
                                <button className="common_button me-3" onClick={() => { setNext(0) }}>
                                    Back  <IoIosArrowForward />
                                </button>
                                <button className="common_button" >
                                    save  <IoIosArrowForward />
                                </button>
                            </div>
                        </div>
                    }






                </div>
            </div>





        </section>
    )
}
