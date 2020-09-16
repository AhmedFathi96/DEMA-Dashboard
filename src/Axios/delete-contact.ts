import axios from 'axios';
import * as Requests from './urls'

export const deleteContactAPI = (token:string , id:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.delete(Requests.deleteContactURL(id),
        {
            headers,
        });
}