import { call, put, takeLatest, select  } from "redux-saga/effects";
import { getSizeAction } from "../Actions";
import { getSizes } from "../../Axios/get-itemInfo";
import { selectToken } from "../../helper";
import { getSizesSucceeded , getSizesFailed } from "../Actions/itemInfo-action";
import { store } from "react-notifications-component";

function* getSizesSaga() {

    try {
        const token = yield select(selectToken);
        const res = yield call(getSizes, token);
        console.log('===>' , res.data.data)
        yield put(getSizesSucceeded(res.data.data));
    } catch (e) {
        yield put(getSizesFailed(e));
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

export function* watchGetSizeSaga() {
    yield takeLatest(getSizeAction.requested, getSizesSaga);
}
