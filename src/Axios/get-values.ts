import axios from 'axios';
import * as Requests from './urls'

export const getValues = (token:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.get(Requests.getValuesURL , {headers});
}