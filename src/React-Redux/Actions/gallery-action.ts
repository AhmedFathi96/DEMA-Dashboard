import {action , payload} from 'ts-action';
import { getGalleryImagesAction, createGalleryImageAction  , editGalleryImageAction, deleteGalleryImageAction} from '.';
import { IGalleryImage } from '../../lib/index';

export const getGalleryImage = action(getGalleryImagesAction.requested);
export const getGalleryImageSucceeded = action(getGalleryImagesAction.fulfilled , payload<IGalleryImage[]>());
export const getGalleryImageFailed = action(getGalleryImagesAction.rejected, payload<Error>());


export const createGalleryImage = action(createGalleryImageAction.requested, payload<FormData>());
export const createGalleryImageSucceeded = action(createGalleryImageAction.fulfilled , payload<IGalleryImage>());
export const createGalleryImageFailed = action(createGalleryImageAction.rejected, payload<Error>());


export const editGalleryImage = action(editGalleryImageAction.requested, payload<{data:FormData , id: string}>());
export const editGalleryImageSucceeded = action(editGalleryImageAction.fulfilled , payload<IGalleryImage>());
export const editGalleryImageFailed = action(editGalleryImageAction.rejected, payload<Error>());


export const deleteGalleryImage = action(deleteGalleryImageAction.requested, payload<string>());
export const deleteGalleryImageSucceeded = action(deleteGalleryImageAction.fulfilled , payload<IGalleryImage>());
export const deleteGalleryImageFailed = action(deleteGalleryImageAction.rejected, payload<Error>());