import axios from 'axios';
import * as Requests from './urls'

export const editSliderItemAPI = (token:string , data: FormData , id:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.put(Requests.editSliderItemsURL(id) , data, 
        {
            headers,
        });
}