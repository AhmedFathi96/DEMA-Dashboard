import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { deleteTagAction } from "../Actions";
import { deleteTagAPI } from "../../Axios/delete-itemInfo";
import { selectToken } from "../../helper";
import { deleteTagSucceeded , deleteTagFailed  , deleteTag} from "../Actions/itemInfo-action";
import { store } from "react-notifications-component";

const actionType = union(deleteTag);

function* deleteTagSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(deleteTagAPI, token , action.payload);
        console.log('===>' , res.data.data)
        yield put(deleteTagSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!",
            message: "Tag section added successfully",
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
        yield put(deleteTagFailed(e));
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

export function* watchDeleteTagSaga() {
    yield takeLatest(deleteTagAction.requested, deleteTagSaga);
}
