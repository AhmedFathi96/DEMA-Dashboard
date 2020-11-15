import { call, put, takeLatest, select  } from "redux-saga/effects";
import { getAboutAction } from "../Actions";
import { getAbout } from "../../Axios/get-about";
import { selectToken } from "../../helper";
import { getAboutSucceeded , getAboutFailed } from "../Actions/about-action";
function* getAboutSaga() {

    try {
        const token = yield select(selectToken);
        const res = yield call(getAbout, token);
        
        yield put(getAboutSucceeded(res.data.data));
    } catch (e) {
        yield put(getAboutFailed(e));
    } 
}

export function* watchGetAboutSaga() {
    yield takeLatest(getAboutAction.requested, getAboutSaga);
}
