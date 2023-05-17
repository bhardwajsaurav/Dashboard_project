import { React, useState, useEffect } from 'react';
import './App.css';
import { getAdLineItems, getDbmLineItems, getDbm, getAdserver ,Mapped} from './Apis'
import UploadedCampaigns from "./UploadedCampaigns"
import  Modal from "./Modal"
function App() {
 
  
  const [loader, setLoader] = useState(0)
  const [activetab, setActivetab] = useState(0)
  const [datepicker, setDatePicker] = useState({
    start_date: null,
    end_date: null
  })

  const [lineitemHolderAd, setLineItemHolderAd] = useState([])
  const [lineitemHolderDbm, setLineItemHolderDbm] = useState([])
  const [adserverdata, setAdserverData] = useState(false)
  const [dbm, setDbm] = useState(false)
  const [filename,setFileName] = useState()
  const [modalCamp,setModalCamp] = useState()
  const [mappedstatus, setMappedStatus] = useState(false)



  useEffect(() => {
      console.log("loading")
  }, [loader])

  
  const lineitemTrigerAd = (event,el)=>{
    if(event.target.checked){
      let linead = lineitemHolderAd
      linead.push(el.LineItems_id)
      setLineItemHolderAd(linead)
    }
    else{
      lineitemHolderAd.filter((item,index)=>{
        return (el.LineItems_id === item ? lineitemHolderAd.splice(index, 1):null)
      })
    }  
  } 

  const lineitemTrigerDbm= (event,el)=>{
    if(event.target.checked){
      let linedbm = lineitemHolderDbm
      linedbm.push(el.LineItems_id)
      setLineItemHolderDbm(linedbm)
    }
    else{
      lineitemHolderDbm.filter((item,index)=>{
        return (el.LineItems_id === item ? lineitemHolderDbm.splice(index, 1): null)
        
      })
    }  

   
  } 
  
  




  const mappedFun = async ()=>{
    let mapped_data ={"dbm":lineitemHolderDbm, "adserver":lineitemHolderAd, "new_campaign":filename,"start_date":datepicker.start_date,"end_date":datepicker.end_date}
    let mapped = await Mapped(mapped_data); 
    setMappedStatus(mapped.data.summary)
  }
  async function fetchData() {
    let advertiser = await getAdserver(datepicker.start_date, datepicker.end_date);
    let dbm = await getDbm(datepicker.start_date, datepicker.end_date);
    setAdserverData(advertiser)
    setDbm(dbm)
  }

  const lineItemsad = async (adver_id, campaign_id, index) => {
    setLoader(true)
    let lineitems = await getAdLineItems(campaign_id, adver_id);

    let a = adserverdata
    
    a.data &&  a.data[0].campaigns.filter((key)=>{
      return (key.lineItem  && delete key.lineItem)
    })



    let listHolder = []
    if (lineitems && lineitems.data.length !== 0) {
      
       listHolder = lineitems.data.map((elem) => {

         return({LineItems:elem.lineitem_name,LineItems_id:elem.lineitem_id})

      })
      a['data'][0].campaigns[index].lineItem = listHolder
      setAdserverData(a)
      setLoader(false)

    }
   
  }
  

  const lineItemsdbm = async (adver_id, campaign_id, index) => {
    
    setLoader(true)
    let lineitems = await getDbmLineItems(campaign_id, adver_id);
   
    let a = dbm
   
     a.data && a.data[0].campaigns.filter((key)=>{
      return (key.lineItem  && delete key.lineItem)
    })

    let listHolder = []

    if (lineitems && lineitems.data.length !== 0) {
      console.log(lineitems.data)
       listHolder = lineitems.data.line_items.map((elem) => {
         return({LineItems:elem.line_item,LineItems_id:elem.line_item_id})
      })

      a['data'][0].campaigns[index].lineItem = listHolder
      setDbm(a)
      setLoader(false)

    }
  }

  return (
    <>
      <section className='main_tab'>
        <div className='box_container'>
          <div className='input_field'>
            <input type="date" name="start_date" placeholder='ENTER START DATE' value={datepicker.start_date} onChange={e => { setDatePicker({ ...datepicker, [e.target.name]: e.target.value }) }} />
            <input type="date" name="end_date" placeholder='ENTER END DATE' value={datepicker.end_date} onChange={e => { setDatePicker({ ...datepicker, [e.target.name]: e.target.value }) }} />
            <button onClick={() => { fetchData() }}>Submit</button>
            <button onClick={()=>{setModalCamp(true)}}>New Campaigns</button>
          </div>

          <div className='tabs'>
            <div className='tabs_button'>
              <button className={`m-r ${activetab === 0 ? 'activeTab' : null}`} onClick={() => { setActivetab(0) }}>SERVER I</button>
              <button className={` ${activetab === 1 ? 'activeTab' : null} `} onClick={() => { setActivetab(1) }}>SERVER II</button>
            </div>

            <h2 className='m-b m-t text-center'> {activetab === 0 ? "ADVERTISER DATA" : "DBM DATA"}</h2>
            
          

            {
              adserverdata &&
              <>
                  <input type="text" value={filename} placeholder='Enter Campaing name ' onChange={(e)=>{setFileName(e.target.value)}} style={{width:"200px"}}/>
                <button  onClick={mappedFun}>
                    Submit
                </button>
              </>
             
            }
            {
              activetab === 0 ?
                <div className='data-table1'>
                  <table>
                    <tr>
                      <th>Account Name</th>
                      <th>Campaing Name</th>
                      <th>LineItems</th>
                    </tr>

                    {
              
                      adserverdata && adserverdata['data'] ? adserverdata['data'][0].campaigns.map((elem, index) => {
                        return (
                          <>
                            <tr key={"ad" + index}>
                              <td >

                                {
                                  adserverdata.data[0].advertiser
                                }
                              </td>
                              <td >
                                <input type="radio" name="ad" onChange={() => { lineItemsad(adserverdata.data[0].advertiser_id, elem.campaign_id, index) }} />
                                {  elem.campaign_name}
                              </td>
                              <td >
                               
                                 
                                { elem.lineItem &&  elem.lineItem.length > 0 && elem.lineItem.map((el)=>{
                                    
                                    return( <>
                                      <div>
                                      <input type='checkbox' onChange={(event)=>{lineitemTrigerAd(event,el)}}/>
                                          {el.LineItems}
                                          
                                      </div>
                                    </>)
                                })}
                              </td>
                            </tr>
                          </>
                        )
                      }) : <h2>data not found</h2>
                    }

                  </table>
                </div> :
                <div className='data-table2'>
                  <table>
                    <tr>
                      <th>Account Name</th>
                      <th>Campaing Name </th>
                      <th>LineItems</th>
                    </tr>
                    {
                      dbm && dbm['data'] ? dbm['data'][0].campaigns.map((elem, index) => {
                        return (
                          <>
                            <tr key={index}>
                              <td>

                                {
                                  adserverdata.data[0].advertiser
                                }
                              </td>
                              <td>
                                <input type="radio" name="dbm" onChange={() => { lineItemsdbm(dbm.data[0].advertiser_id, elem.campaign_id, index) }} />
                                {  elem.campaign_name}
                              </td>
                              <td>
                              { elem.lineItem &&  elem.lineItem.length > 0 && elem.lineItem.map((el)=>{
                                   
                                   return( <>
                                      <div>
                                      <input type='checkbox' onChange={(event)=>{lineitemTrigerDbm(event,el)}}/>
                                          {el.LineItems}
                                          
                                      </div>
                                    </>)
                                })}
                              </td>
                            </tr>
                          </>
                        )
                      }) : <h2>data not found</h2>
                    }
                  </table>
                </div>
            }
          </div>

         
        </div>

      </section>
      { modalCamp &&
        <UploadedCampaigns/>
      }

      {
           mappedstatus && <Modal  mappedstatus = {mappedstatus} setMappedStatus={setMappedStatus}/>
      }
     
      
    </>

  );
}

export default App;


