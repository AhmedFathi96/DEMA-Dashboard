import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { deleteFeatureAction } from "../Actions";
import { deleteFeatureAPI } from "../../Axios/delete-feature";
import { selectToken } from "../../helper";
import { deleteFeatureSucceeded , deleteFeatureFailed  , deleteFeature} from "../Actions/features-action";
import { store } from "react-notifications-component";

const actionType = union(deleteFeature);

function* deleteFeatureSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(deleteFeatureAPI, token , action.payload);
        console.log('===>' , res.data.data)
        yield put(deleteFeatureSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!",
            message: "Feature added successfully",
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
        yield put(deleteFeatureFailed(e));
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

export function* watchDeleteFeatureSaga() {
    yield takeLatest(deleteFeatureAction.requested, deleteFeatureSaga);
}
