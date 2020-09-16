import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { createHistoryAction } from "../Actions";
import { createHistoryAPI } from "../../Axios/create-history";
import { selectToken } from "../../helper";
import { createHistorySucceeded , createHistoryFailed  , createHistory} from "../Actions/history-action";
import { store } from "react-notifications-component";

const actionType = union(createHistory);

function* createHistorySaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(createHistoryAPI, token , action.payload);
        console.log('===>' , res.data.data)
        yield put(createHistorySucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!",
            message: "History added successfully",
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
        yield put(createHistoryFailed(e));
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

export function* watchCreateHistorySaga() {
    yield takeLatest(createHistoryAction.requested, createHistorySaga);
}
