import axios from 'axios';
import * as Requests from './urls'
import { IGroup } from '../lib';

export const editGroupAPI = (token:string , data: IGroup , id:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.put(Requests.editGroupURL(id) , data, 
        {
            headers,
        });
}