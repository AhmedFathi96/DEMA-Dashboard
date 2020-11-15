import axios from 'axios';
import * as Requests from './urls'
import { IBadge, IColor , ISize , ITag } from '../lib';

export const createCategoryAPI = (token:string , data: FormData) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.post(Requests.createCategoryURL , data , {headers});
}

export const createCollectionAPI = (token:string , data: FormData) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.post(Requests.createCollectionURL , data , {headers});
}

export const createColorAPI = (token:string , data: IColor) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.post(Requests.createColorURL , data , {headers});
}
export const createBadgeAPI = (token:string , data: IBadge) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.post(Requests.createBadgeURL , data , {headers});
}
export const createSizeAPI = (token:string , data: ISize) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.post(Requests.createSizeURL , data , {headers});
}
export const createTagAPI = (token:string , data: ITag) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.post(Requests.createTagURL , data , {headers});
}