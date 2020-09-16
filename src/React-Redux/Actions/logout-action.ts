import {action , payload} from 'ts-action';
import { logoutAction } from '.';

export const logout = action(logoutAction.requested);
export const logoutSucceeded = action(logoutAction.fulfilled);
export const logoutFailed = action(logoutAction.rejected, payload<Error>());