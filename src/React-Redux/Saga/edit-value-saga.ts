import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { editValueAction } from "../Actions";
import { editValueAPI } from "../../Axios/edit-value";
import { selectToken } from "../../helper";
import { editValueSucceeded , editValueFailed  , editValue} from "../Actions/values-action";
import { store } from "react-notifications-component";

const actionType = union(editValue);

function* editValueSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(editValueAPI, token , action.payload.data,action.payload.id);
        console.log('===>' , res.data.data)
        yield put(editValueSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!",
            message: "Value edited successfully",
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
        yield put(editValueFailed(e));
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

export function* watchEditValueSaga() {
    yield takeLatest(editValueAction.requested, editValueSaga);
}
