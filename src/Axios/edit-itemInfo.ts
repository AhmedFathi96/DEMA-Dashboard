import axios from 'axios';
import * as Requests from './urls'
import {  ISize , IColor ,ITag, IBadge} from "../lib/index";

export const editACategoryAPI = (token:string , data: FormData , id:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.put(Requests.editCategoryURL(id) , data, 
        {
            headers,
        });
}
export const editCollectionAPI = (token:string , data: FormData , id:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.put(Requests.editCollectionURL(id) , data, 
        {
            headers,
        });
}
export const editColorAPI = (token:string , data: IColor , id:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.put(Requests.editColorURL(id) , data, 
        {
            headers,
        });
}
export const editBadgeAPI = (token:string , data: IBadge , id:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.put(Requests.editBadgeURL(id) , data, 
        {
            headers,
        });
}
export const editSizeAPI = (token:string , data: ISize , id:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.put(Requests.editSizeURL(id) , data, 
        {
            headers,
        });
}
export const editTagAPI = (token:string , data: ITag , id:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.put(Requests.editTagURL(id) , data, 
        {
            headers,
        });
}