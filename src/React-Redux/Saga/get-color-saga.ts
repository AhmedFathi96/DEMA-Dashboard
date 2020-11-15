import { call, put, takeLatest, select  } from "redux-saga/effects";
import { getColorAction } from "../Actions";
import { getColors } from "../../Axios/get-itemInfo";
import { selectToken } from "../../helper";
import { getColorsSucceeded , getColorsFailed } from "../Actions/itemInfo-action";
import { store } from "react-notifications-component";

function* getColorsSaga() {

    try {
        const token = yield select(selectToken);
        const res = yield call(getColors, token);
        
        yield put(getColorsSucceeded(res.data.data));
    } catch (e) {
        yield put(getColorsFailed(e));
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

export function* watchGetColorSaga() {
    yield takeLatest(getColorAction.requested, getColorsSaga);
}
