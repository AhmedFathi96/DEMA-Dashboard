import {action , payload} from 'ts-action';
import { getProjectsAction, createProjectAction  , editProjectAction, deleteProjectAction} from '.';
import { IProject } from '../../lib/index';

export const getProject = action(getProjectsAction.requested);
export const getProjectSucceeded = action(getProjectsAction.fulfilled , payload<IProject[]>());
export const getProjectFailed = action(getProjectsAction.rejected, payload<Error>());


export const createProject = action(createProjectAction.requested, payload<FormData>());
export const createProjectSucceeded = action(createProjectAction.fulfilled , payload<IProject>());
export const createProjectFailed = action(createProjectAction.rejected, payload<Error>());


export const editProject = action(editProjectAction.requested, payload<{data:FormData , id: string}>());
export const editProjectSucceeded = action(editProjectAction.fulfilled , payload<IProject>());
export const editProjectFailed = action(editProjectAction.rejected, payload<Error>());


export const deleteProject = action(deleteProjectAction.requested, payload<string>());
export const deleteProjectSucceeded = action(deleteProjectAction.fulfilled , payload<IProject>());
export const deleteProjectFailed = action(deleteProjectAction.rejected, payload<Error>());