import axios from 'axios';
import * as Requests from './urls'

export const editGalleryImageAPI = (token:string , data: FormData , id:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.put(Requests.editGalleryImageURL(id) , data, 
        {
            headers,
        });
}