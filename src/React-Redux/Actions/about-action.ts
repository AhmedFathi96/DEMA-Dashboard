import {action , payload} from 'ts-action';
import { getAboutAction, createAboutAction  , editAboutAction, deleteAboutAction} from '.';
import { IAboutSection } from '../../lib/index';

export const getAbout = action(getAboutAction.requested);
export const getAboutSucceeded = action(getAboutAction.fulfilled , payload<IAboutSection[]>());
export const getAboutFailed = action(getAboutAction.rejected, payload<Error>());


export const createAbout = action(createAboutAction.requested, payload<IAboutSection>());
export const createAboutSucceeded = action(createAboutAction.fulfilled , payload<IAboutSection>());
export const createAboutFailed = action(createAboutAction.rejected, payload<Error>());


export const editAbout = action(editAboutAction.requested, payload<{data:IAboutSection , id: string}>());
export const editAboutSucceeded = action(editAboutAction.fulfilled , payload<IAboutSection>());
export const editAboutFailed = action(editAboutAction.rejected, payload<Error>());


export const deleteAbout = action(deleteAboutAction.requested, payload<string>());
export const deleteAboutSucceeded = action(deleteAboutAction.fulfilled , payload<IAboutSection>());
export const deleteAboutFailed = action(deleteAboutAction.rejected, payload<Error>());