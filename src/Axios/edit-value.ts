import axios from 'axios';
import * as Requests from './urls'
import { ICreateValue } from '../lib';

export const editValueAPI = (token:string , data: ICreateValue , id:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.put(Requests.editValueURL(id) , data, 
        {
            headers,
        });
}