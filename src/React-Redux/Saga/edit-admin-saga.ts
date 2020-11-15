import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { editAdminAction } from "../Actions";
import { editAdminAPI } from "../../Axios/edit-admin";
import { selectToken } from "../../helper";
import { editAdminSucceeded , editAdminFailed  , editAdmin} from "../Actions/admin-action";

import { store } from "react-notifications-component";

const actionType = union(editAdmin);

function* editAdminSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(editAdminAPI, token , action.payload.data,action.payload.id);
        
        yield put(editAdminSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!!",
            message: "Admin edited successfully",
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
        yield put(editAdminFailed(e));
        store.addNotification({
            title: "Error Message!!",
            message: "something went wrong",
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

export function* watchEditAdminSaga() {
    yield takeLatest(editAdminAction.requested, editAdminSaga);
}
