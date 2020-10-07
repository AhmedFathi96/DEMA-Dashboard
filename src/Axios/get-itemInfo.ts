import axios from 'axios';
import * as Requests from './urls'

export const getCategories = (token:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.get(Requests.getCategoryURL , {headers});
}
export const getCollections = (token:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.get(Requests.getCollectionURL , {headers});
}
export const getColors = (token:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.get(Requests.getColorURL , {headers});
}
export const getSizes = (token:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.get(Requests.getSizeURL , {headers});
}
export const getTags = (token:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.get(Requests.getTagURL , {headers});
}