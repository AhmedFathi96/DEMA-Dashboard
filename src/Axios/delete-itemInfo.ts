import axios from 'axios';
import * as Requests from './urls'

export const deleteCategoryAPI = (token:string , id:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.delete(Requests.deleteCategoryURL(id),
        {
            headers,
        });
}
export const deleteCollectionAPI = (token:string , id:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.delete(Requests.deleteCollectionURL(id),
        {
            headers,
        });
}
export const deleteColorAPI = (token:string , id:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.delete(Requests.deleteColorURL(id),
        {
            headers,
        });
}
export const deleteSizeAPI = (token:string , id:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.delete(Requests.deleteSizeURL(id),
        {
            headers,
        });
}
export const deleteTagAPI = (token:string , id:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.delete(Requests.deleteTagURL(id),
        {
            headers,
        });
}