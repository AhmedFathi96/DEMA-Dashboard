import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { editBlogPageHeaderAction } from "../Actions";
import { editBlogAPI } from "../../Axios/edit-page-headers";
import { selectToken } from "../../helper";
import { editBlogPageHeader , editBlogPageHeaderFailed, editBlogPageHeaderSucceeded } from "../Actions/pages-headers-action";
import { store } from 'react-notifications-component';

const actionType = union(editBlogPageHeader);

function* editBlogSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(editBlogAPI, token , action.payload.data,action.payload.id);
        
        yield put(editBlogPageHeaderSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!",
            message: "Blog edited successfully",
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
        yield put(editBlogPageHeaderFailed(e));
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

export function* watchEditBlogSaga() {
    yield takeLatest(editBlogPageHeaderAction.requested, editBlogSaga);
}
