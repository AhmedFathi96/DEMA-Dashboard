import axios from 'axios';
import * as Requests from './urls'

export const deleteVisionAPI = (token:string , id:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.delete(Requests.deleteVisionURL(id),
        {
            headers,
        });
}