import axios from 'axios';
import * as Requests from './urls'

export const deleteValueAPI = (token:string , id:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.delete(Requests.deleteValueURL(id),
        {
            headers,
        });
}