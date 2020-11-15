import { call, put, takeLatest, select  } from "redux-saga/effects";
import { getBadgeAction } from "../Actions";
import { getBadges } from "../../Axios/get-itemInfo";
import { selectToken } from "../../helper";
import { getBadgesSucceeded , getBadgesFailed } from "../Actions/itemInfo-action";
import { store } from "react-notifications-component";

function* getBadgesSaga() {

    try {
        const token = yield select(selectToken);
        const res = yield call(getBadges, token);
        console.log('===>' , res.data.data)
        yield put(getBadgesSucceeded(res.data.data));
    } catch (e) {
        yield put(getBadgesFailed(e));
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

export function* watchGetBadgeSaga() {
    yield takeLatest(getBadgeAction.requested, getBadgesSaga);
}
