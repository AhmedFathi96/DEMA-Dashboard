import axios from 'axios';
import * as Requests from './urls'

export const getSliderItems = (token:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.get(Requests.getSliderItemsURL , {headers});
}