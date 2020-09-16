import axios from 'axios';
import * as Requests from './urls'
import { IAdminUser } from "../lib/index";

export const editAdminAPI = (token:string , data: IAdminUser , id:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.put(Requests.editAdminsURL(id) , data, 
        {
            headers,
        });
}