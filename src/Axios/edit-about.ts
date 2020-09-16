import axios from 'axios';
import * as Requests from './urls'
import { IAboutSection } from '../lib';

export const editAboutAPI = (token:string , data: IAboutSection , id:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.put(Requests.editAboutURL(id) , data, 
        {
            headers,
        });
}