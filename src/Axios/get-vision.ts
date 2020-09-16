import axios from 'axios';
import * as Requests from './urls'

export const getVisions = (token:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.get(Requests.getVisionURL , {headers});
}