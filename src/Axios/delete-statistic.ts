import axios from 'axios';
import * as Requests from './urls'

export const deleteStatisticAPI = (token:string , id:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.delete(Requests.deleteStatisticURL(id),
        {
            headers,
        });
}