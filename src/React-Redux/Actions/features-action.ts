import {action , payload} from 'ts-action';
import { getFeaturesAction, createFeatureAction  , deleteFeatureAction ,editFeatureAction} from '.';
import { IFeature } from '../../lib/index';


export const getFeatures = action(getFeaturesAction.requested);
export const getFeaturesSucceeded = action(getFeaturesAction.fulfilled , payload<IFeature[]>());
export const getFeaturesFailed = action(getFeaturesAction.rejected, payload<Error>());


export const createFeature = action(createFeatureAction.requested, payload<FormData>());
export const createFeatureSucceeded = action(createFeatureAction.fulfilled , payload<IFeature>());
export const createFeatureFailed = action(createFeatureAction.rejected, payload<Error>());


export const editFeature = action(editFeatureAction.requested, payload<{data:FormData , id: string}>());
export const editFeatureSucceeded = action(editFeatureAction.fulfilled , payload<IFeature>());
export const editFeatureFailed = action(editFeatureAction.rejected, payload<Error>());


export const deleteFeature = action(deleteFeatureAction.requested, payload<string>());
export const deleteFeatureSucceeded = action(deleteFeatureAction.fulfilled , payload<IFeature>());
export const deleteFeatureFailed = action(deleteFeatureAction.rejected, payload<Error>());