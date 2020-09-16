import axios from 'axios';
import * as Requests from './urls'
import { IAdminUser } from '../lib';

export const createAdminAPI = (token:string , data: IAdminUser) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.post(Requests.createAdminsURL , data , {headers});
}