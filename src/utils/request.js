import { BASE_URL } from "../config";
import axios from "axios";

export const postRequest = async (url, body) =>{
    const response = await axios({
        method: 'post',
        url: url,
        baseURL: `${ BASE_URL }/api`,
        data: body,
        validateStatus: function (status) {
          return status >= 200;
        },
      });
    console.log(`POST REQUEST WITH URL ${url} result: \n${JSON.stringify(response.data,null,2)}`);
    return response.data;
}

export const getRequest = async (url) =>{
    const response = await axios({
        method: 'get',
        url: url,
        baseURL: `${ BASE_URL }/api`,
        validateStatus: function (status) {
          return status >= 200;
        },
      });
    
    return response.data;
}