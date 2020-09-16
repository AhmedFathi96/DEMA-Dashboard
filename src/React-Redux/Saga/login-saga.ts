import { union } from "ts-action";
import { call, put, takeLatest  } from "redux-saga/effects";
import { loginSucceeded, loginFailed, login } from "../Actions/login-action";
import { loginAction } from "../Actions";
import { loginAPI } from "../../Axios/login";
const actionType = union(login);

function* loginSaga(action: typeof actionType.actions) {
    
    try {
        const res = yield call(loginAPI, action.payload);
        console.log('res is ===========>' ,res);
        yield put(loginSucceeded(res.data.data.token));
    } catch (e) {
        yield put(loginFailed(e));
    } 
}

export function* watchLoginSaga() {
    yield takeLatest(loginAction.requested, loginSaga);
}
