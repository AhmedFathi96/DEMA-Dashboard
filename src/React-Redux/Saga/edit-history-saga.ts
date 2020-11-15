import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { editHistoryAction } from "../Actions";
import { editHistoryAPI } from "../../Axios/edit-history";
import { selectToken } from "../../helper";
import { editHistorySucceeded , editHistoryFailed  , editHistory} from "../Actions/history-action";
import { store } from "react-notifications-component";

const actionType = union(editHistory);

function* editHistorySaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(editHistoryAPI, token , action.payload.data,action.payload.id);
        
        yield put(editHistorySucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!",
            message: "History edited successfully",
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
        yield put(editHistoryFailed(e));
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

export function* watchEditHistorySaga() {
    yield takeLatest(editHistoryAction.requested, editHistorySaga);
}
