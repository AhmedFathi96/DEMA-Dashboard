import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { editBadgeAction } from "../Actions";
import { editBadgeAPI } from "../../Axios/edit-itemInfo";
import { selectToken } from "../../helper";
import { editBadgeSucceeded , editBadgeFailed  , editBadge} from "../Actions/itemInfo-action";
import { store } from "react-notifications-component";

const actionType = union(editBadge);

function* editBadgeSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(editBadgeAPI, token , action.payload.data,action.payload.id);
        console.log('===>' , res.data.data)
        yield put(editBadgeSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!",
            message: "Badge edited successfully",
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
        yield put(editBadgeFailed(e));
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

export function* watchEditBadgeSaga() {
    yield takeLatest(editBadgeAction.requested, editBadgeSaga);
}
