import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { createTagAction } from "../Actions";
import { createTagAPI } from "../../Axios/create-itemInfo";
import { selectToken } from "../../helper";
import { createTagSucceeded , createTagFailed  , createTag} from "../Actions/itemInfo-action";
import { store } from "react-notifications-component";

const actionType = union(createTag);

function* createTagSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(createTagAPI, token , action.payload);
        
        yield put(createTagSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!",
            message: "Tags has been added successfully",
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
        yield put(createTagFailed(e));
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

export function* watchCreateTagSaga() {
    yield takeLatest(createTagAction.requested, createTagSaga);
}
