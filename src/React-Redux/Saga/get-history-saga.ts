import { call, put, takeLatest, select  } from "redux-saga/effects";
import { getHistoryAction } from "../Actions";
import { getHistory } from "../../Axios/get-history";
import { selectToken } from "../../helper";
import { getHistorySucceeded , getHistoryFailed } from "../Actions/history-action";
import { store } from "react-notifications-component";

function* getHistorySaga() {

    try {
        const token = yield select(selectToken);
        const res = yield call(getHistory, token);
        console.log('===>' , res.data.data)
        yield put(getHistorySucceeded(res.data.data));
    } catch (e) {
        yield put(getHistoryFailed(e));
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

export function* watchGetHistorySaga() {
    yield takeLatest(getHistoryAction.requested, getHistorySaga);
}
