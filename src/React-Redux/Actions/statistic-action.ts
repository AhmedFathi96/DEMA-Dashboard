import {action , payload} from 'ts-action';
import { getStatisticsAction, createStatisticAction  , editStatisticAction, deleteStatisticAction} from '.';
import { IStatistic } from '../../lib/index';

export const getStatistics = action(getStatisticsAction.requested);
export const getStatisticsSucceeded = action(getStatisticsAction.fulfilled , payload<IStatistic[]>());
export const getStatisticsFailed = action(getStatisticsAction.rejected, payload<Error>());


export const createStatistic = action(createStatisticAction.requested, payload<FormData>());
export const createStatisticSucceeded = action(createStatisticAction.fulfilled , payload<IStatistic>());
export const createStatisticFailed = action(createStatisticAction.rejected, payload<Error>());


export const editStatistic = action(editStatisticAction.requested, payload<{data:FormData , id: string}>());
export const editStatisticSucceeded = action(editStatisticAction.fulfilled , payload<IStatistic>());
export const editStatisticFailed = action(editStatisticAction.rejected, payload<Error>());


export const deleteStatistic = action(deleteStatisticAction.requested, payload<string>());
export const deleteStatisticSucceeded = action(deleteStatisticAction.fulfilled , payload<IStatistic>());
export const deleteStatisticFailed = action(deleteStatisticAction.rejected, payload<Error>());