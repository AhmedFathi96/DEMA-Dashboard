import axios from 'axios';
import * as Requests from './urls'

export const deleteTeamAPI = (token:string , id:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.delete(Requests.deleteTeamURL(id),
        {
            headers,
        });
}