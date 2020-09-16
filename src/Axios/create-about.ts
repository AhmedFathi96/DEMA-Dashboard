import axios from 'axios';
import * as Requests from './urls'
import { IAboutSection } from '../lib';

export const createAboutAPI = (token:string , data: IAboutSection) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.post(Requests.createAboutURL , data , {headers});
}