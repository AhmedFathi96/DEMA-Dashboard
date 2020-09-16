import { call, put, takeLatest, select  } from "redux-saga/effects";
import { getInfoAction } from "../Actions";
import { getInfoAPI } from "../../Axios/get-info";
import { selectToken } from "../../helper";
import { store } from "react-notifications-component";
import { getInfoSucceeded , getInfoFailed } from "../Actions/info-action";
function* getInfoSaga() {

    try {
        const token = yield select(selectToken);
        const res = yield call(getInfoAPI, token);
        console.log('===>' , res.data.data)
        yield put(getInfoSucceeded(res.data.data[0]));
    } catch (e) {
        yield put(getInfoFailed(e));
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

export function* watchGetInfoSaga() {
    yield takeLatest(getInfoAction.requested, getInfoSaga);
}
