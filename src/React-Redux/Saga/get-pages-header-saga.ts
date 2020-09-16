import { call, put, takeLatest, select  } from "redux-saga/effects";
import { getPagesHeadersAction } from "../Actions";
import { getPagesHeader } from "../../Axios/get-pages-header";
import { selectToken } from "../../helper";
import { getPagesHeadersSucceeded , getPagesHeadersFailed } from "../Actions/pages-headers-action";
import { store } from "react-notifications-component";

function* getPagesHeadersSaga() {

    try {
        const token = yield select(selectToken);
        const res = yield call(getPagesHeader, token);
        console.log('===>' , res.data.data[0])
        yield put(getPagesHeadersSucceeded(res.data.data[0]));
    } catch (e) {
        yield put(getPagesHeadersFailed(e));
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

export function* watchGetPagesHeadersSaga() {
    yield takeLatest(getPagesHeadersAction.requested, getPagesHeadersSaga);
}
