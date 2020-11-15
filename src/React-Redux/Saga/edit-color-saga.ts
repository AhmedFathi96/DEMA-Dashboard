import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { editColorAction } from "../Actions";
import { editColorAPI } from "../../Axios/edit-itemInfo";
import { selectToken } from "../../helper";
import { editColorSucceeded , editColorFailed  , editColor} from "../Actions/itemInfo-action";
import { store } from "react-notifications-component";

const actionType = union(editColor);

function* editColorSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(editColorAPI, token , action.payload.data,action.payload.id);
        
        yield put(editColorSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!",
            message: "Color edited successfully",
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
        yield put(editColorFailed(e));
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

export function* watchEditColorSaga() {
    yield takeLatest(editColorAction.requested, editColorSaga);
}
