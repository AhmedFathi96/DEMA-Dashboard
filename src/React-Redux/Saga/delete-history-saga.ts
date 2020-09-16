import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { deleteHistoryAction } from "../Actions";
import { deleteHistoryAPI } from "../../Axios/delete-history";
import { selectToken } from "../../helper";
import { deleteHistorySucceeded , deleteHistoryFailed  , deleteHistory} from "../Actions/history-action";
import { store } from "react-notifications-component";

const actionType = union(deleteHistory);

function* deleteHistorySaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(deleteHistoryAPI, token , action.payload);
        console.log('===>' , res.data.data)
        yield put(deleteHistorySucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!",
            message: "History deleted successfully",
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
        yield put(deleteHistoryFailed(e));
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

export function* watchDeleteHistorySaga() {
    yield takeLatest(deleteHistoryAction.requested, deleteHistorySaga);
}
