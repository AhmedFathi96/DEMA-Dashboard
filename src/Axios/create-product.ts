import axios from 'axios';
import * as Requests from './urls'
import { ICreateProduct } from '../lib';

export const createProductItemAPI = (token:string , data: ICreateProduct) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.post(Requests.createProductItemURL , data , {headers});
}