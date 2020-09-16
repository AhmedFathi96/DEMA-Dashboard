import {action , payload} from 'ts-action';
import { getHistoryAction, createHistoryAction  , editHistoryAction, deleteHistoryAction} from '.';
import { IHistory } from '../../lib/index';

export const getHistory = action(getHistoryAction.requested);
export const getHistorySucceeded = action(getHistoryAction.fulfilled , payload<IHistory[]>());
export const getHistoryFailed = action(getHistoryAction.rejected, payload<Error>());


export const createHistory = action(createHistoryAction.requested, payload<IHistory>());
export const createHistorySucceeded = action(createHistoryAction.fulfilled , payload<IHistory>());
export const createHistoryFailed = action(createHistoryAction.rejected, payload<Error>());


export const editHistory = action(editHistoryAction.requested, payload<{data:IHistory , id: string}>());
export const editHistorySucceeded = action(editHistoryAction.fulfilled , payload<IHistory>());
export const editHistoryFailed = action(editHistoryAction.rejected, payload<Error>());


export const deleteHistory = action(deleteHistoryAction.requested, payload<string>());
export const deleteHistorySucceeded = action(deleteHistoryAction.fulfilled , payload<IHistory>());
export const deleteHistoryFailed = action(deleteHistoryAction.rejected, payload<Error>());