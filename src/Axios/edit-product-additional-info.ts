import axios from 'axios';
import { IProductAdditionalInfo } from '../lib';
import * as Requests from './urls'

export const editProductItemAdditionalInfoAPI = (token:string , data: IProductAdditionalInfo , id:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.put(Requests.updateProductItemAdditionalInfoURL(id) , data, 
        {
            headers,
        });
}