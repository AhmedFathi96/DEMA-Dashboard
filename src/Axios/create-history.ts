import axios from 'axios';
import * as Requests from './urls'
import { IHistory } from '../lib';

export const createHistoryAPI = (token:string , data: IHistory) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.post(Requests.createHistoryURL , data , {headers});
}