import axios from 'axios';
import * as Requests from './urls'
import { IContactMessage } from "../lib/index";

export const createContactAPI = (token:string , data: IContactMessage) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.post(Requests.creatContactURL , data , {headers});
}