import axios from 'axios';
import * as Requests from './urls'

export const getGroups = (token:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.get(Requests.getGroupURL , {headers});
}