import axios from 'axios';
import * as Requests from './urls'
import { IProduct } from "../lib/index";

export const editProductAPI = (token:string , data: IProduct , id:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.put(Requests.updateProductItemURL(id) , data, 
        {
            headers,
        });
}