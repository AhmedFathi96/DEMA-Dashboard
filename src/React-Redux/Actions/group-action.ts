import {action , payload} from 'ts-action';
import { getGroupAction, createGroupAction  , editGroupAction, deleteGroupAction} from '.';
import { IGroup } from '../../lib/index';

export const getGroups = action(getGroupAction.requested);
export const getGroupsSucceeded = action(getGroupAction.fulfilled , payload<IGroup[]>());
export const getGroupsFailed = action(getGroupAction.rejected, payload<Error>());


export const createGroup = action(createGroupAction.requested, payload<IGroup>());
export const createGroupSucceeded = action(createGroupAction.fulfilled , payload<IGroup>());
export const createGroupFailed = action(createGroupAction.rejected, payload<Error>());


export const editGroup = action(editGroupAction.requested, payload<{data:IGroup , id: string}>());
export const editGroupSucceeded = action(editGroupAction.fulfilled , payload<IGroup>());
export const editGroupFailed = action(editGroupAction.rejected, payload<Error>());


export const deleteGroup = action(deleteGroupAction.requested, payload<string>());
export const deleteGroupSucceeded = action(deleteGroupAction.fulfilled , payload<IGroup>());
export const deleteGroupFailed = action(deleteGroupAction.rejected, payload<Error>());