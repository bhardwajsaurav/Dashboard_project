import { React, useState} from 'react';
import './App.css';
import {ShowcampaignTemp} from './Apis'




const UploadedCampaigns = ()=>{

    const [datepicker, setDatePicker] = useState({
        start_date: null,
        end_date: null
    })
    const [listingcampaigns,setListingCampaigns]  = useState()
    const listingCampaigns =  async ()=>{    
       let uploadCampaigns =  await ShowcampaignTemp();
       setListingCampaigns(uploadCampaigns)
       console.log(listingcampaigns)
    }
      return(
         <>

             <section className='listing_campaigns'> 
                <div className='box_container'>
                    <div className='datepick'>
                        <input type="date"  name="start_date" value={datepicker.start_date} onChange={e => { setDatePicker({ ...datepicker, [e.target.name]: e.target.value }) }}/>
                        <input type="date"  name="end_date" value={datepicker.end_date} onChange={e => { setDatePicker({ ...datepicker, [e.target.name]: e.target.value }) }}/>

                        <button onClick={listingCampaigns}>Submit</button>
                    </div>
                    <table className='m-t'>
                        <tr>
                            <th>Account Name</th>
                        </tr>
                        {
                            listingcampaigns &&   listingcampaigns.data.length !== 0 ? listingcampaigns.data.data.map((elem,index)=>{

                                return(
                                         <tr>
                                            <td>
                                                 {
                                                    elem.new_campaign
                                                 }
                                            </td>
                                        </tr>
                                )

                            }) : <h2>not found data</h2>
                        }
                       
                    </table>
                </div>     
             </section>

         </>
      )
     
} 


export default UploadedCampaigns;
