import axios from 'axios';
import * as Requests from './urls'

export const deleteHistoryAPI = (token:string , id:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.delete(Requests.deleteHistoryURL(id),
        {
            headers,
        });
}