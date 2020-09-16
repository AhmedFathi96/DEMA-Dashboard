import axios from 'axios';
import * as Requests from './urls'

export const createStatisticAPI = (token:string , data: FormData) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.post(Requests.createStatisticURL , data , {headers});
}