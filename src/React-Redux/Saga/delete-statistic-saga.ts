import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { deleteStatisticAction } from "../Actions";
import { deleteStatisticAPI } from "../../Axios/delete-statistic";
import { selectToken } from "../../helper";
import { deleteStatisticSucceeded , deleteStatisticFailed  , deleteStatistic} from "../Actions/statistic-action";
import { store } from "react-notifications-component";

const actionType = union(deleteStatistic);

function* deleteStatisticSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(deleteStatisticAPI, token , action.payload);
        
        yield put(deleteStatisticSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!",
            message: "Statistic deleted successfully",
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
        yield put(deleteStatisticFailed(e));
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

export function* watchDeleteStatisticSaga() {
    yield takeLatest(deleteStatisticAction.requested, deleteStatisticSaga);
}
