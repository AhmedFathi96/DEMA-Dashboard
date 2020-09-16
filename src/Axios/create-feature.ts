import axios from 'axios';
import * as Requests from './urls'

export const createFeatureAPI = (token:string , data: FormData) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.post(Requests.createFeatureURL , data , {headers});
}