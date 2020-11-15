import { call, put, takeLatest, select  } from "redux-saga/effects";
import { getVisionAction } from "../Actions";
import { getVisions } from "../../Axios/get-vision";
import { selectToken } from "../../helper";
import { getVisionSucceeded , getVisionFailed } from "../Actions/vision-action";
import { store } from "react-notifications-component";

function* getVisionsSaga() {

    try {
        const token = yield select(selectToken);
        const res = yield call(getVisions, token);
        
        yield put(getVisionSucceeded(res.data.data));
    } catch (e) {
        yield put(getVisionFailed(e));
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

export function* watchGetVisionSaga() {
    yield takeLatest(getVisionAction.requested, getVisionsSaga);
}
