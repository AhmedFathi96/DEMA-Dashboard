import axios from 'axios';
import * as Requests from './urls'

export const deleteAdminAPI = (token:string , id:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.delete(Requests.deleteAdminsURL(id),
        {
            headers,
        });
}