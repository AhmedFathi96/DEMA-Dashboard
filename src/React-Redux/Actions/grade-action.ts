import {action , payload} from 'ts-action';
import { getGradesAction} from '.';
import { IGrade } from './types';

export const getGrades = action(getGradesAction.requested);
export const getGradesSucceeded = action(getGradesAction.fulfilled , payload<IGrade[]>());
export const getGradesFailed = action(getGradesAction.rejected, payload<Error>());


// export const createGrade = action(createGradeAction.requested, payload<IGrade>());
// export const createGradeSucceeded = action(createGradeAction.fulfilled , payload<IGrade>());
// export const createGradeFailed = action(createGradeAction.rejected, payload<Error>());


// export const editGrade = action(editGradeAction.requested, payload<{data:IGrade , id: string}>());
// export const editGradeSucceeded = action(editGradeAction.fulfilled , payload<IGrade>());
// export const editGradeFailed = action(editGradeAction.rejected, payload<Error>());