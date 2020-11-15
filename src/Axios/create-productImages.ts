import axios from 'axios';
import * as Requests from './urls'

export const createProductItemImageAPI = (token:string , data: FormData) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.post(Requests.createProductItemImageURL , data , {headers});
}