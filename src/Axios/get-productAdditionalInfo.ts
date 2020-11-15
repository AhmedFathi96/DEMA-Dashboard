import axios from 'axios';
import * as Requests from './urls'

export const getProductAdditionalInfoAPI = (token:string , id:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.get(Requests.getProductItemAdditionalInfoURL(id) , {headers});
}