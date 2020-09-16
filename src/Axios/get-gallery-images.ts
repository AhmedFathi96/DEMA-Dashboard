import axios from 'axios';
import * as Requests from './urls'

export const getGalleryImage = (token:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.get(Requests.getGalleryImagesURL , {headers});
}