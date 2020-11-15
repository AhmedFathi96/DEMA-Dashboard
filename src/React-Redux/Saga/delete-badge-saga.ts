import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { deleteBadgeAction } from "../Actions";
import { deleteBadgeAPI } from "../../Axios/delete-itemInfo";
import { selectToken } from "../../helper";
import { deleteBadgeSucceeded , deleteBadgeFailed  , deleteBadge} from "../Actions/itemInfo-action";
import { store } from "react-notifications-component";

const actionType = union(deleteBadge);

function* deleteBadgeSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(deleteBadgeAPI, token , action.payload);
        yield put(deleteBadgeSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!",
            message: "Badge section added successfully",
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
        yield put(deleteBadgeFailed(e));
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

export function* watchDeleteBadgeSaga() {
    yield takeLatest(deleteBadgeAction.requested, deleteBadgeSaga);
}
