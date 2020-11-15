import axios from 'axios';
import * as Requests from './urls'

export const deleteProductAdditionalInfoAPI = (token:string , id:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.delete(Requests.deleteProductItemAdditionalInfoURL(id),
        {
            headers,
        });
}