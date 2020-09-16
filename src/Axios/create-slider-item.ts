import axios from 'axios';
import * as Requests from './urls'

export const createSliderItemAPI = (token:string , data: FormData) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.post(Requests.createSliderItemsURL , data , {headers});
}