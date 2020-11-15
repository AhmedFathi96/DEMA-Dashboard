import axios from 'axios';
import * as Requests from './urls'

export const getProductsAPI = (token:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.get(Requests.getProductsItemURL , {headers});
}