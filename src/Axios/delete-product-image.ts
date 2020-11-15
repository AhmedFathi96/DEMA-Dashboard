import axios from 'axios';
import * as Requests from './urls'

export const deleteProductImageAPI = (token:string , id:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.delete(Requests.deleteProductItemImageURL(id),
        {
            headers,
        });
}