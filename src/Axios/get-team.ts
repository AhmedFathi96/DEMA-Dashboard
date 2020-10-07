import axios from 'axios';
import * as Requests from './urls'

export const getTeams = (token:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.get(Requests.getTeamURL , {headers});
}