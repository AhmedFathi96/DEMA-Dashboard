import {action , payload} from 'ts-action';
import { getVisionAction, createVisionAction  , editVisionAction, deleteVisionAction} from '.';
import { IVision } from '../../lib/index';

export const getVision = action(getVisionAction.requested);
export const getVisionSucceeded = action(getVisionAction.fulfilled , payload<IVision[]>());
export const getVisionFailed = action(getVisionAction.rejected, payload<Error>());


export const createVision = action(createVisionAction.requested, payload<FormData>());
export const createVisionSucceeded = action(createVisionAction.fulfilled , payload<IVision>());
export const createVisionFailed = action(createVisionAction.rejected, payload<Error>());


export const editVision = action(editVisionAction.requested, payload<{data:FormData , id: string}>());
export const editVisionSucceeded = action(editVisionAction.fulfilled , payload<IVision>());
export const editVisionFailed = action(editVisionAction.rejected, payload<Error>());


export const deleteVision = action(deleteVisionAction.requested, payload<string>());
export const deleteVisionSucceeded = action(deleteVisionAction.fulfilled , payload<IVision>());
export const deleteVisionFailed = action(deleteVisionAction.rejected, payload<Error>());
