import axios from 'axios';
import * as Requests from './urls'
import { IGroup } from '../lib';

export const createGroupAPI = (token:string , data: IGroup) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.post(Requests.createGroupURL , data , {headers});
}