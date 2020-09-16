import axios from 'axios';
import * as Requests from './urls'

export const editFeatureAPI = (token:string , data: FormData , id:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.put(Requests.editFeatureURL(id) , data, 
        {
            headers,
        });
}