import React, { useState } from 'react'
import "./page.css"
import { DeleteCamp, ListingUploadCampaigns } from '../Apis';
import { ImCross } from 'react-icons/im';
export default function DeleteCamps({setDelStatus}) {
    const [datepicker, setDatePicker] = useState({
        start_date: null,
        end_date: null
    })
    const [newCampData, setNewCampData] = useState()
    async function fetchData() {
        let newCamp = await ListingUploadCampaigns(datepicker.start_date, datepicker.end_date);
        setNewCampData(newCamp)
    }
    const deletCampaigns = async (name, id) => {
        let del = { "campaign_id": id, "campaign_name": name }
        let data = await DeleteCamp(del)
        if(data){
            fetchData()
        }
    }

    


    return (
        <>
        <div className=' dele px-5 pt-5'>
            <div className='d-flex'>
                <div className="wrap_date ">
                    <span className="me-4 start_span">start</span>
                    <input type="date" name="start_date" value={datepicker.start_date} onChange={e => { setDatePicker({ ...datepicker, [e.target.name]: e.target.value }) }} />
                    <span className="mx-2">to</span>
                    <input type="date" name="end_date" value={datepicker.end_date} onChange={e => { setDatePicker({ ...datepicker, [e.target.name]: e.target.value }) }} />

                </div>
                <button className="ms-2 common_button" onClick={fetchData}>
                    Report
                </button>
            </div>



            <table className='mt-5'>

                <tr>

                    <th></th>
                    <th>Campaign Name</th>

                </tr>
                {

                    newCampData ? newCampData?.data?.data?.map((elem, index) => {
                        return (

                            <>

                                <tr key={"ad" + index}>
                                    <td className='radio_td position-relative'>
                                        <label htmlFor="">
                                            <input type="checkbox" name="ad" onChange={() => { deletCampaigns(elem.campaign_name, elem.campaign_id) }} />
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
                    }) : <h4 className="m-2">Delete Campaign Not Found, Select Date</h4>
                }


            </table>
            
        </div>
        <ImCross className='position-absolute cross_del' onClick={()=>{setDelStatus(false)}}/>
        </>
        
     
    )
}
