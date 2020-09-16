import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { editFeatureAction } from "../Actions";
import { editFeatureAPI } from "../../Axios/edit-feature";
import { selectToken } from "../../helper";
import { editFeature ,editFeatureFailed , editFeatureSucceeded  } from "../Actions/features-action";
import { store } from "react-notifications-component";

const actionType = union(editFeature);

function* editFeatureSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(editFeatureAPI, token , action.payload.data,action.payload.id);
        console.log('===>' , res.data.data)
        yield put(editFeatureSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!",
            message: "Feature edited successfully",
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
        yield put(editFeatureFailed(e));
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

export function* watchEditFeatureSaga() {
    yield takeLatest(editFeatureAction.requested, editFeatureSaga);
}
