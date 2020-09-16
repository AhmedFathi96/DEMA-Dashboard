import axios from 'axios';
import * as Requests from './urls'

export const getHistory = (token:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.get(Requests.getHistoryURL , {headers});
}