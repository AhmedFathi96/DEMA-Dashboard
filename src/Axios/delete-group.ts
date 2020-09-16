import axios from 'axios';
import * as Requests from './urls'

export const deleteGroupAPI = (token:string , id:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.delete(Requests.deleteGroupURL(id),
        {
            headers,
        });
}