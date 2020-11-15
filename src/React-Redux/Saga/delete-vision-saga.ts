import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { deleteVisionAction } from "../Actions";
import { deleteVisionAPI } from "../../Axios/delete-vision";
import { selectToken } from "../../helper";
import { deleteVisionSucceeded , deleteVisionFailed  , deleteVision} from "../Actions/vision-action";
import { store } from "react-notifications-component";

const actionType = union(deleteVision);

function* deleteVisionSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(deleteVisionAPI, token , action.payload);
        
        yield put(deleteVisionSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!",
            message: "Vision has been deleted successfully",
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
        yield put(deleteVisionFailed(e));
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

export function* watchDeleteVisionSaga() {
    yield takeLatest(deleteVisionAction.requested, deleteVisionSaga);
}
