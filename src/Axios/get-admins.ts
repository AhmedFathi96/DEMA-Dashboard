import axios from 'axios';
import * as Requests from './urls'

export const getAdmins = (token:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.get(Requests.getAdminsURL , {headers});
}