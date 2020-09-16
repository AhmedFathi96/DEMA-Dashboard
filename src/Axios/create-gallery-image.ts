import axios from 'axios';
import * as Requests from './urls'

export const createGalleryImageAPI = (token:string , data: FormData) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.post(Requests.createGalleryImageURL , data , {headers});
}