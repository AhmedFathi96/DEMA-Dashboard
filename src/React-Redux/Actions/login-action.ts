import {action , payload} from 'ts-action';
import { loginAction } from '.';
import { ILoginInfo } from './types';

export const login = action(loginAction.requested , payload<ILoginInfo>());
export const loginSucceeded = action(loginAction.fulfilled , payload<{token:string,role:string}>());
export const loginFailed = action(loginAction.rejected, payload<Error>());