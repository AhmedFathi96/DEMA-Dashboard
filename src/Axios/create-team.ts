import axios from 'axios';
import * as Requests from './urls'

export const createTeamAPI = (token:string , data: FormData) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.post(Requests.createTeamURL , data , {headers});
}