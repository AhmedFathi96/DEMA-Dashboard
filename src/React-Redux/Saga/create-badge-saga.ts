import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { createBadgeAction } from "../Actions";
import { createBadgeAPI } from "../../Axios/create-itemInfo";
import { selectToken } from "../../helper";
import { createBadgeSucceeded , createBadgeFailed  , createBadge} from "../Actions/itemInfo-action";
import { store } from "react-notifications-component";

const actionType = union(createBadge);

function* createBadgeSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(createBadgeAPI, token , action.payload);
        
        yield put(createBadgeSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!",
            message: "Badges has been added successfully",
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
        yield put(createBadgeFailed(e));
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

export function* watchCreateBadgeSaga() {
    yield takeLatest(createBadgeAction.requested, createBadgeSaga);
}
