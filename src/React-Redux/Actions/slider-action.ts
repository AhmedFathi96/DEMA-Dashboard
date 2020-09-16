import {action , payload} from 'ts-action';
import { getSliderItemsAction, createSliderItemAction  , editSliderItemAction, deleteSliderItemAction} from '.';
import { ISliderItem } from '../../lib/index';

export const getSliderItems = action(getSliderItemsAction.requested);
export const getSliderItemsSucceeded = action(getSliderItemsAction.fulfilled , payload<ISliderItem[]>());
export const getSliderItemsFailed = action(getSliderItemsAction.rejected, payload<Error>());


export const createSliderItem = action(createSliderItemAction.requested, payload<FormData>());
export const createSliderItemSucceeded = action(createSliderItemAction.fulfilled , payload<ISliderItem>());
export const createSliderItemFailed = action(createSliderItemAction.rejected, payload<Error>());


export const editSliderItem = action(editSliderItemAction.requested, payload<{data:FormData , id: string}>());
export const editSliderItemSucceeded = action(editSliderItemAction.fulfilled , payload<ISliderItem>());
export const editSliderItemFailed = action(editSliderItemAction.rejected, payload<Error>());


export const deleteSliderItem = action(deleteSliderItemAction.requested, payload<string>());
export const deleteSliderItemSucceeded = action(deleteSliderItemAction.fulfilled , payload<ISliderItem>());
export const deleteSliderItemFailed = action(deleteSliderItemAction.rejected, payload<Error>());