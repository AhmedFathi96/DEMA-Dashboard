import axios from 'axios';
import * as Requests from './urls'

export const deleteFeatureAPI = (token:string , id:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.delete(Requests.deleteFeatureURL(id),
        {
            headers,
        });
}