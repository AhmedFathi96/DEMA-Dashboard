import axios from 'axios';
import * as Requests from './urls'

export const deleteProjectAPI = (token:string , id:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.delete(Requests.deleteProjectURL(id),
        {
            headers,
        });
}