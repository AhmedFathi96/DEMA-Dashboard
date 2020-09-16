import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { createStatisticAction } from "../Actions";
import { createStatisticAPI } from "../../Axios/create-statistic";
import { selectToken } from "../../helper";
import { createStatisticSucceeded , createStatisticFailed  , createStatistic} from "../Actions/statistic-action";
import { store } from "react-notifications-component";

const actionType = union(createStatistic);

function* createStatisticSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(createStatisticAPI, token , action.payload);
        console.log('===>' , res.data.data)
        yield put(createStatisticSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!",
            message: "Statistic added successfully",
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
        yield put(createStatisticFailed(e));
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

export function* watchCreateStatisticSaga() {
    yield takeLatest(createStatisticAction.requested, createStatisticSaga);
}
