import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { editStatisticAction } from "../Actions";
import { editStatisticAPI } from "../../Axios/edit-statistic";
import { selectToken } from "../../helper";
import { editStatisticSucceeded , editStatisticFailed  , editStatistic} from "../Actions/statistic-action";
import { store } from "react-notifications-component";

const actionType = union(editStatistic);

function* editStatisticSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(editStatisticAPI, token , action.payload.data,action.payload.id);
        console.log('===>' , res.data.data)
        yield put(editStatisticSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!",
            message: "Statistic edited successfully",
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
        yield put(editStatisticFailed(e));
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

export function* watchEditStatisticSaga() {
    yield takeLatest(editStatisticAction.requested, editStatisticSaga);
}
