import axios from 'axios';
import * as Requests from './urls'

export const getProjects = (token:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.get(Requests.getProjectsURL , {headers});
}