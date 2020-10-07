import {action , payload} from 'ts-action';
import { getTeamAction, createTeamAction  , editTeamAction, deleteTeamAction} from '.';
import { ITeam } from '../../lib/index';

export const getTeams = action(getTeamAction.requested);
export const getTeamsSucceeded = action(getTeamAction.fulfilled , payload<ITeam[]>());
export const getTeamsFailed = action(getTeamAction.rejected, payload<Error>());


export const createTeam = action(createTeamAction.requested, payload<FormData>());
export const createTeamSucceeded = action(createTeamAction.fulfilled , payload<ITeam>());
export const createTeamFailed = action(createTeamAction.rejected, payload<Error>());


export const editTeam = action(editTeamAction.requested, payload<{data:FormData , id: string}>());
export const editTeamSucceeded = action(editTeamAction.fulfilled , payload<ITeam>());
export const editTeamFailed = action(editTeamAction.rejected, payload<Error>());


export const deleteTeam = action(deleteTeamAction.requested, payload<string>());
export const deleteTeamSucceeded = action(deleteTeamAction.fulfilled , payload<ITeam>());
export const deleteTeamFailed = action(deleteTeamAction.rejected, payload<Error>());