import axios from 'axios';
import * as Requests from './urls'

export const getFeatures = (token:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.get(Requests.getFeaturesURL , {headers});
}