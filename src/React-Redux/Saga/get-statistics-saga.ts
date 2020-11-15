import { call, put, takeLatest, select  } from "redux-saga/effects";
import { getStatisticsAction } from "../Actions";
import { getStatistics } from "../../Axios/get-statistics";
import { selectToken } from "../../helper";
import { getStatisticsSucceeded , getStatisticsFailed } from "../Actions/statistic-action";
import { store } from "react-notifications-component";

function* getStatisticsSaga() {

    try {
        const token = yield select(selectToken);
        const res = yield call(getStatistics, token);
        
        yield put(getStatisticsSucceeded(res.data.data));
    } catch (e) {
        yield put(getStatisticsFailed(e));
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

export function* watchGetStatisticsSaga() {
    yield takeLatest(getStatisticsAction.requested, getStatisticsSaga);
}
