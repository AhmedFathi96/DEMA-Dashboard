import axios from 'axios';
import * as Requests from './urls'
import { IProductAdditionalInfo } from '../lib';

export const createProductAdditionalInfoAPI = (token:string , data: IProductAdditionalInfo) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.post(Requests.createProductItemAdditionalInfoURL , data , {headers});
}