import axios from 'axios';
import * as Requests from './urls'
import { IHistory } from '../lib';

export const editHistoryAPI = (token:string , data: IHistory , id:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.put(Requests.editHistoryURL(id) , data, 
        {
            headers,
        });
}