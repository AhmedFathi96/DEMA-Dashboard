import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { deleteContactAction } from "../Actions";
import { deleteContactAPI } from "../../Axios/delete-contact";
import { selectToken } from "../../helper";
import { deleteContactSucceeded , deleteContactFailed  , deleteContact} from "../Actions/contact-action";
import { store } from "react-notifications-component";

const actionType = union(deleteContact);

function* deleteContactSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(deleteContactAPI, token , action.payload);
        
        yield put(deleteContactSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!",
            message: "contact added successfully",
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
        yield put(deleteContactFailed(e));
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

export function* watchDeleteContactSaga() {
    yield takeLatest(deleteContactAction.requested, deleteContactSaga);
}
