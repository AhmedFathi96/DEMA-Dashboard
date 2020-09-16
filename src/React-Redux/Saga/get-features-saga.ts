import { call, put, takeLatest, select  } from "redux-saga/effects";
import { getFeaturesAction } from "../Actions";
import { getFeatures } from "../../Axios/get-features";
import { selectToken } from "../../helper";
import { getFeaturesSucceeded , getFeaturesFailed } from "../Actions/features-action";
import { store } from "react-notifications-component";

function* getFeaturesSaga() {

    try {
        const token = yield select(selectToken);
        const res = yield call(getFeatures, token);
        console.log('===>' , res.data.data)
        yield put(getFeaturesSucceeded(res.data.data));
    } catch (e) {
        yield put(getFeaturesFailed(e));
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

export function* watchGetFeaturesSaga() {
    yield takeLatest(getFeaturesAction.requested, getFeaturesSaga);
}
