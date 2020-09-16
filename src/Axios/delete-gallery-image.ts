import axios from 'axios';
import * as Requests from './urls'

export const deleteGalleryImageAPI = (token:string , id:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.delete(Requests.deleteGalleryImageURL(id),
        {
            headers,
        });
}