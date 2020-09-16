import axios from 'axios';
import * as Requests from './urls'

export const deleteAboutAPI = (token:string , id:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.delete(Requests.deleteAboutURL(id),
        {
            headers,
        });
}