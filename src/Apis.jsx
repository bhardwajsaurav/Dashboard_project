

import axios from "axios";

export function getAdserver(start,end) {
    return axios
       
      .get(`https://reportsapi.ekaleido.tech/api/v1/adserverdata?start_date=${start}&end_date=${end}`)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        return error;
      });
  }
  
  
  export function getDbm(start,end) {
    return axios
      .get(`https://reportsapi.ekaleido.tech/api/v1/dbmdata?start_date=${start}&end_date=${end}`)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        return error;
      });
  }
  
  export function getAdLineItems(cam_id,adver_id) {
    return axios
      .get(`https://reportsapi.ekaleido.tech/api/v1/adserverLineitem?campaign_id=${cam_id}&advertiser_id=${adver_id}`)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        return error;
      });
  }
  
  export function getDbmLineItems(cam_id,adver_id) {
    return axios
      .get(`https://reportsapi.ekaleido.tech/api/v1/dbmLineitem?campaign_id=${cam_id}&advertiser_id=${adver_id}`)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        return error;
      });
  }
  export function Mapped(data){
    let payload = data
    return axios
     .post("https://reportsapi.ekaleido.tech/api/v1/mapped",payload)
     .then(function (response) {
        return response;
      })
      .catch(function (error) {
         return error;
      });
  };
  
  
  export function SubmitMapped(){
    return axios
    .get(`https://reportsapi.ekaleido.tech/api/v1/updateData`)
    .then(function (response) {
        return response;
      })
      .catch(function (error) {
         return error;
      });
  };
  

  export function StatusManipulation(){
    return axios
    .get(`https://reportsapi.ekaleido.tech/api/v1/statusManipulation`)
    .then(function (response) {
        return response;
      })
      .catch(function (error) {
         return error;
      });
  };
  
  export function ListingUploadCampaigns(start_date ,end_date){
    return axios
    .get(`https://reportsapi.ekaleido.tech/api/v1/ListCampaignsForUpdate?start_date=${start_date}&end_date=${end_date}`)
    .then(function (response) {
        return response;
      })
      .catch(function (error) {
         return error;
      });
  };
  
  export function NewLineItems(start_date ,end_date,camp_id){
    return axios
    .get(`https://reportsapi.ekaleido.tech/api/v1/campaignsData?start_date=${start_date}&end_date=${end_date}&campaign_id=${camp_id}`)
    .then(function (response) {
        return response;
      })
      .catch(function (error) {
         return error;
      });
  };
  
  
  
  
  export function ShowcampaignTemp(){
    return axios
    .get('https://reportsapi.ekaleido.tech/api/v1/showcampaignTemp')
    .then(function (response) {
        return response;
      })
      .catch(function (error) {
         return error;
      });
  };
  
  
  
  
  export function CampaignRatioChange(){
    return axios
    .post('https://reportsapi.ekaleido.tech/api/CampaignRatioChange')
    .then(function (response) {
        return response;
      })
      .catch(function (error) {
         return error;
      });
  };




  export function UpdateRatio(Data){
    return axios
    .post(`https://reportsapi.ekaleido.tech/api/v1/lineitemRatioUpdate`,Data)
    .then(function (response) {
        return response;
      })
      .catch(function (error) {
         return error;
      });
  };


  export function Preview(){
    return axios
    .get(`https://reportsapi.ekaleido.tech/api/v1/preview`)
    .then(function (response) {
        return response;
      })
      .catch(function (error) {
         return error;
      });
  };
  
  

 