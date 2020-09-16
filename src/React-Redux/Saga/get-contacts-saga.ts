import { call, put, takeLatest, select  } from "redux-saga/effects";
import { getContactsAction } from "../Actions";
import { getContacts } from "../../Axios/get-contacts";
import { selectToken } from "../../helper";
import { getContactsSucceeded , getContactsFailed } from "../Actions/contact-action";
import { store } from "react-notifications-component";

function* getContactsSaga() {

    try {
        const token = yield select(selectToken);
        const res = yield call(getContacts, token);
        console.log('===>' , res.data.data)
        yield put(getContactsSucceeded(res.data.data));
    } catch (e) {
        yield put(getContactsFailed(e));
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

export function* watchGetContactsSaga() {
    yield takeLatest(getContactsAction.requested, getContactsSaga);
}
