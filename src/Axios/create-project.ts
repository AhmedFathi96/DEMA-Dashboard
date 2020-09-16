import axios from 'axios';
import * as Requests from './urls'

export const createProjectAPI = (token:string , data: FormData) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.post(Requests.createProjectURL , data , {headers});
}