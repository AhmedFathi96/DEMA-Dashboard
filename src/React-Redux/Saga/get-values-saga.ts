import { call, put, takeLatest, select  } from "redux-saga/effects";
import { getValuesAction } from "../Actions";
import { getValues } from "../../Axios/get-values";
import { selectToken } from "../../helper";
import { getValuesSucceeded , getValuesFailed } from "../Actions/values-action";
import { store } from "react-notifications-component";

function* getValuesSaga() {

    try {
        const token = yield select(selectToken);
        const res = yield call(getValues, token);
        console.log('===>' , res.data.data)
        yield put(getValuesSucceeded(res.data.data));
    } catch (e) {
        yield put(getValuesFailed(e));
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

export function* watchGetValuesSaga() {
    yield takeLatest(getValuesAction.requested, getValuesSaga);
}
