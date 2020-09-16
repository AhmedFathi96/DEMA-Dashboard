import axios from 'axios';
import * as Requests from './urls'

export const editVisionAPI = (token:string , data: FormData , id:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.put(Requests.editVisionURL(id) , data, 
        {
            headers,
        });
}