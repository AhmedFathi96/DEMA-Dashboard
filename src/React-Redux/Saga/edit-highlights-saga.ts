import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { editHighlightsPageHeaderAction } from "../Actions";
import { editHighlightsAPI } from "../../Axios/edit-page-headers";
import { selectToken } from "../../helper";
import { editHighlightsPageHeader , editHighlightsPageHeaderFailed, editHighlightsPageHeaderSucceeded } from "../Actions/pages-headers-action";
import { store } from "react-notifications-component";

const actionType = union(editHighlightsPageHeader);

function* editHighlightsSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(editHighlightsAPI, token , action.payload.data,action.payload.id);
        console.log('===>' , res.data.data)
        yield put(editHighlightsPageHeaderSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!",
            message: "Highlights edited successfully",
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
        yield put(editHighlightsPageHeaderFailed(e));
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

export function* watchEditHighlightsSaga() {
    yield takeLatest(editHighlightsPageHeaderAction.requested, editHighlightsSaga);
}
