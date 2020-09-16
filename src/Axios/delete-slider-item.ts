import axios from 'axios';
import * as Requests from './urls'

export const deleteSliderItemAPI = (token:string , id:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.delete(Requests.deleteSliderItemsURL(id),
        {
            headers,
        });
}