import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { editContactsPageHeaderAction } from "../Actions";
import { editContactAPI } from "../../Axios/edit-page-headers";
import { selectToken } from "../../helper";
import { editContactsPageHeader , editContactsPageHeaderFailed, editContactsPageHeaderSucceeded } from "../Actions/pages-headers-action";
import { store } from "react-notifications-component";

const actionType = union(editContactsPageHeader);

function* editContactsSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(editContactAPI, token , action.payload.data,action.payload.id);
        console.log('===>' , res.data.data)
        yield put(editContactsPageHeaderSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!",
            message: "Contacts edited successfully",
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
        yield put(editContactsPageHeaderFailed(e));
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

export function* watchEditContactsSaga() {
    yield takeLatest(editContactsPageHeaderAction.requested, editContactsSaga);
}
