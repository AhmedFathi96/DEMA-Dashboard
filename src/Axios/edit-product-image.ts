import axios from 'axios';
import * as Requests from './urls'

export const editProductImageAPI = (token:string , data: FormData , id:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.put(Requests.updateProductItemImageURL(id) , data, 
        {
            headers,
        });
}