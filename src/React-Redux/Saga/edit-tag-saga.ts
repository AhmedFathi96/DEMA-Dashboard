import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { editTagAction } from "../Actions";
import { editTagAPI } from "../../Axios/edit-itemInfo";
import { selectToken } from "../../helper";
import { editTagSucceeded , editTagFailed  , editTag} from "../Actions/itemInfo-action";
import { store } from "react-notifications-component";

const actionType = union(editTag);

function* editTagSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(editTagAPI, token , action.payload.data,action.payload.id);
        console.log('===>' , res.data.data)
        yield put(editTagSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!",
            message: "Tag edited successfully",
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
        yield put(editTagFailed(e));
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

export function* watchEditTagSaga() {
    yield takeLatest(editTagAction.requested, editTagSaga);
}
