import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { editVisionAction } from "../Actions";
import { editVisionAPI } from "../../Axios/edit-vision";
import { selectToken } from "../../helper";
import { editVisionSucceeded , editVisionFailed  , editVision} from "../Actions/vision-action";
import { store } from "react-notifications-component";

const actionType = union(editVision);

function* editVisionSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(editVisionAPI, token , action.payload.data,action.payload.id);
        console.log('===>' , res.data.data)
        yield put(editVisionSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!",
            message: "Vision has been edited successfully",
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
        yield put(editVisionFailed(e));
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

export function* watchEditVisionSaga() {
    yield takeLatest(editVisionAction.requested, editVisionSaga);
}
