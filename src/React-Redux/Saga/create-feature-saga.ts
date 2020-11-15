import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { createFeatureAction } from "../Actions";
import { createFeatureAPI } from "../../Axios/create-feature";
import { selectToken } from "../../helper";
import { createFeatureSucceeded , createFeatureFailed  , createFeature} from "../Actions/features-action";
import { store } from "react-notifications-component";

const actionType = union(createFeature);

function* createFeatureSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);

        const res = yield call(createFeatureAPI, token , action.payload);
        yield put(createFeatureSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!",
            message: "gallery image added successfully",
            type: "success",
            insert: "top",
            container: "top-left",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
                duration: 5000,
                onScreen: true
            }
        });
    } catch (e) {
        yield put(createFeatureFailed(e));
        store.addNotification({
            title: "Error Message!",
            message: "Something went wrong",
            type: "danger",
            insert: "top",
            container: "top-left",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
                duration: 5000,
                onScreen: true
            }
        });
    } 
}

export function* watchCreateFeatureSaga() {
    yield takeLatest(createFeatureAction.requested, createFeatureSaga);
}
