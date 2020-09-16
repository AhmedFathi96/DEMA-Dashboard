import axios from 'axios';
import * as Requests from './urls'

export const getStatistics = (token:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.get(Requests.getStatisticsURL , {headers});
}