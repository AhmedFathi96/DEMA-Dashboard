import axios from 'axios';
import * as Requests from './urls'

export const editTeamAPI = (token:string , data: FormData , id:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.put(Requests.editTeamURL(id) , data, 
        {
            headers,
        });
}