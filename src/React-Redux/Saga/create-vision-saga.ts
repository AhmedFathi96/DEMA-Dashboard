import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { createVisionAction } from "../Actions";
import { createVisionAPI } from "../../Axios/create-vision";
import { selectToken } from "../../helper";
import { createVisionSucceeded , createVisionFailed  , createVision} from "../Actions/vision-action";
import { store } from "react-notifications-component";

const actionType = union(createVision);

function* createVisionSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(createVisionAPI, token , action.payload);
        
        yield put(createVisionSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!",
            message: "Visions has been added successfully",
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
        yield put(createVisionFailed(e));
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

export function* watchCreateVisionSaga() {
    yield takeLatest(createVisionAction.requested, createVisionSaga);
}
