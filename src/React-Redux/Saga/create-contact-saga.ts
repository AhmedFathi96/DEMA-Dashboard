import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { createContactAction } from "../Actions";
import { createContactAPI } from "../../Axios/create-contact";
import { selectToken } from "../../helper";
import { createContactSucceeded , createContactFailed  , createContact} from "../Actions/contact-action";
import { store } from "react-notifications-component";

const actionType = union(createContact);

function* createContactSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(createContactAPI, token , action.payload);
        console.log('===>' , res.data.data)
        yield put(createContactSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!",
            message: "contact section added successfully",
            type: "success",
            insert: "top",
            container: "top-left",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
                duration: 5000,
                onScreen: true
            }
        });
    } catch (e) {
        yield put(createContactFailed(e));
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

export function* watchCreateContactSaga() {
    yield takeLatest(createContactAction.requested, createContactSaga);
}
