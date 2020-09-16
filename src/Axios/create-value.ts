import axios from 'axios';
import * as Requests from './urls'
import { ICreateValue } from '../lib';

export const createValueAPI = (token:string , data: ICreateValue) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.post(Requests.createValueURL , data , {headers});
}