import axios from 'axios';
import * as Requests from './urls'

export const editStatisticAPI = (token:string , data: FormData , id:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.put(Requests.editStatisticURL(id) , data, 
        {
            headers,
        });
}