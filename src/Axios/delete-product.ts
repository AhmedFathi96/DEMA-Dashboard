import axios from 'axios';
import * as Requests from './urls'

export const deleteProductAPI = (token:string , id:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.delete(Requests.deleteProductItemURL(id),
        {
            headers,
        });
}