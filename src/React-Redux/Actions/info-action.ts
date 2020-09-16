import {action , payload} from 'ts-action';
import { getInfoAction  , editInfoAction} from '.';
import { IInfo } from '../../lib';

export const getInfo = action(getInfoAction.requested);
export const getInfoSucceeded = action(getInfoAction.fulfilled , payload<IInfo>());
export const getInfoFailed = action(getInfoAction.rejected, payload<Error>());

export const editInfo = action(editInfoAction.requested, payload<{data:any , id:string}>());
export const editInfoSucceeded = action(editInfoAction.fulfilled , payload<IInfo>());
export const editInfoFailed = action(editInfoAction.rejected, payload<Error>());

