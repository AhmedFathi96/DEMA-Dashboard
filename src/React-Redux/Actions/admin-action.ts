import {action , payload} from 'ts-action';
import { getAdminsAction, createAdminAction  , editAdminAction, deleteAdminAction} from '.';
import { IAdminUser } from '../../lib/index';

export const getAdmins = action(getAdminsAction.requested);
export const getAdminsSucceeded = action(getAdminsAction.fulfilled , payload<IAdminUser[]>());
export const getAdminsFailed = action(getAdminsAction.rejected, payload<Error>());


export const createAdmin = action(createAdminAction.requested, payload<IAdminUser>());
export const createAdminSucceeded = action(createAdminAction.fulfilled , payload<IAdminUser>());
export const createAdminFailed = action(createAdminAction.rejected, payload<Error>());


export const editAdmin = action(editAdminAction.requested, payload<{data:IAdminUser , id: string}>());
export const editAdminSucceeded = action(editAdminAction.fulfilled , payload<IAdminUser>());
export const editAdminFailed = action(editAdminAction.rejected, payload<Error>());


export const deleteAdmin = action(deleteAdminAction.requested, payload<string>());
export const deleteAdminSucceeded = action(deleteAdminAction.fulfilled , payload<IAdminUser>());
export const deleteAdminFailed = action(deleteAdminAction.rejected, payload<Error>());