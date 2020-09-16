import axios from 'axios';
import * as Requests from './urls'
import { IInfo} from "../lib/index";

export const editInfoAPI = (token:string , data: IInfo, id:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.put(Requests.editInfoURL(id) , data, 
        {
            headers,
        });
}