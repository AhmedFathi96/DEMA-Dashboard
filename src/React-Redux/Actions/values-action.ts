import {action , payload} from 'ts-action';
import { getValuesAction, createValueAction  , editValueAction, deleteValueAction} from '.';
import { IValue } from '../../lib/index';

export const getValues = action(getValuesAction.requested);
export const getValuesSucceeded = action(getValuesAction.fulfilled , payload<IValue[]>());
export const getValuesFailed = action(getValuesAction.rejected, payload<Error>());


export const createValue = action(createValueAction.requested, payload<IValue>());
export const createValueSucceeded = action(createValueAction.fulfilled , payload<IValue>());
export const createValueFailed = action(createValueAction.rejected, payload<Error>());


export const editValue = action(editValueAction.requested, payload<{data:IValue , id: string}>());
export const editValueSucceeded = action(editValueAction.fulfilled , payload<IValue>());
export const editValueFailed = action(editValueAction.rejected, payload<Error>());


export const deleteValue = action(deleteValueAction.requested, payload<string>());
export const deleteValueSucceeded = action(deleteValueAction.fulfilled , payload<IValue>());
export const deleteValueFailed = action(deleteValueAction.rejected, payload<Error>());