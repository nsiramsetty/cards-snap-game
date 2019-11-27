import {URL_CONFIG} from "../_config/URLConfig";
import axios from 'axios';

export default class ApiService {

  doApiRequest(handle, body, pathVar = "", ignoreLoadingBar = false) {
    if (ignoreLoadingBar) {
      document.getElementById("appBody").className = "no-loader";
    } else {
      document.getElementById("appBody").className = "";
    }
    return new Promise((resolve, reject) => {
      let axiosRequest = {
        method: URL_CONFIG[handle].method,
        url: URL_CONFIG[handle].url + pathVar,
        responseType: 'json',
        data: body,
      };
      axios(axiosRequest).then(function (response) {
        if (response.data) {
          resolve(response.data);
        } else {
          resolve({});
        }
      }).catch(function (err) {
        if (err.response && err.response.data) {
          reject(err.response.data);
        } else {
          reject({});
        }
      });
    })
  }
}
