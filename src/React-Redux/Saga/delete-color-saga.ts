import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { deleteColorAction } from "../Actions";
import { deleteColorAPI } from "../../Axios/delete-itemInfo";
import { selectToken } from "../../helper";
import { deleteColorSucceeded , deleteColorFailed  , deleteColor} from "../Actions/itemInfo-action";
import { store } from "react-notifications-component";

const actionType = union(deleteColor);

function* deleteColorSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(deleteColorAPI, token , action.payload);
        
        yield put(deleteColorSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!",
            message: "Color section added successfully",
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
        yield put(deleteColorFailed(e));
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

export function* watchDeleteColorSaga() {
    yield takeLatest(deleteColorAction.requested, deleteColorSaga);
}
