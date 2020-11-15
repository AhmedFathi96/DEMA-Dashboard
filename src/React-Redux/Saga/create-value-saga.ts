import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { createValueAction } from "../Actions";
import { createValueAPI } from "../../Axios/create-value";
import { selectToken } from "../../helper";
import { createValueSucceeded , createValueFailed  , createValue} from "../Actions/values-action";
import { store } from "react-notifications-component";

const actionType = union(createValue);

function* createValueSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(createValueAPI, token , action.payload);
        
        yield put(createValueSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!",
            message: "Value added successfully",
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
        yield put(createValueFailed(e));
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

export function* watchCreateValueSaga() {
    yield takeLatest(createValueAction.requested, createValueSaga);
}
