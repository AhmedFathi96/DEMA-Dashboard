import axios from 'axios';
import * as Requests from './urls'

export const editProjectAPI = (token:string , data: FormData , id:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.put(Requests.editProjectURL(id) , data, 
        {
            headers,
        });
}