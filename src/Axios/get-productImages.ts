import axios from 'axios';
import * as Requests from './urls'

export const getProductImagesAPI = (token:string, id:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.get(Requests.getProductItemImagesURL(id) , {headers});
}