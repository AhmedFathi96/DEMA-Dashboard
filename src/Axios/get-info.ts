import axios from 'axios';
import * as Requests from './urls'

export const getInfoAPI = (token:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.get(Requests.getInfoURL , {headers});
}