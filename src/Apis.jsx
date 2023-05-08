import axios from "axios";




export function getAdserver(start,end) {
  return axios
    .get(`http://3.6.100.227:9999/api/v1/adserverdata?start_date=${start}&end_date=${end}`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
}


export function getDbm(start,end) {
  return axios
    .get(`http://3.6.100.227:9999/api/v1/dbmdata?start_date=${start}&end_date=${end}`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
}

export function getAdLineItems(cam_id,adver_id) {
  return axios
    .get(`http://3.6.100.227:9999/api/v1/adserverLineitem?campaign_id=${cam_id}&advertiser_id=${adver_id}`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
}

export function getDbmLineItems(cam_id,adver_id) {
  return axios
    .get(`http://3.6.100.227:9999/api/v1/dbmLineitem?campaign_id=${cam_id}&advertiser_id=${adver_id}`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
}
export function Mapped(data){
  console.log("json data",data)
  let payload = {"dbm":["19206452606","18891361809","18896655248"], "adserver":[], "new_campaign":"test campaign 55","start_date":"2023-04-01","end_date":"2023-04-25"}
  // axios({
  //   method: "post",
  //   url: ",
  //   payload: data,
  // })
  axios.post("http://3.6.100.227:9999/api/v1/mapped",payload)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
       return error;
    });
};