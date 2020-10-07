import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { createColorAction } from "../Actions";
import { createColorAPI } from "../../Axios/create-itemInfo";
import { selectToken } from "../../helper";
import { createColorSucceeded , createColorFailed  , createColor} from "../Actions/itemInfo-action";
import { store } from "react-notifications-component";

const actionType = union(createColor);

function* createColorSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(createColorAPI, token , action.payload);
        console.log('===>' , res.data.data)
        yield put(createColorSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!",
            message: "Colors has been added successfully",
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
        yield put(createColorFailed(e));
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

export function* watchCreateColorSaga() {
    yield takeLatest(createColorAction.requested, createColorSaga);
}
