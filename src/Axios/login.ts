import axios from 'axios';
import * as Requests from './urls'
import { ILoginInfo } from '../React-Redux/Actions/types';

export const loginAPI = (data: ILoginInfo) =>{
    return axios.post(Requests.loginUTR , data);
}