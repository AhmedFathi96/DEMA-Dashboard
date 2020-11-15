import { call, put, takeLatest, select  } from "redux-saga/effects";
import { getProductAdditionalInfoAction } from "../Actions";
import { getProductAdditionalInfoAPI } from "../../Axios/get-productAdditionalInfo";
import { selectToken } from "../../helper";
import { getProductAdditionalInfoSucceeded , getProductAdditionalInfoFailed, getProductAdditionalInfo } from "../Actions/product-action";
import { store } from "react-notifications-component";
import { union } from "ts-action";


const actionType = union(getProductAdditionalInfo);

function* getProductAdditionalInfosSaga(action: typeof actionType.actions) {

    try {
        const token = yield select(selectToken);
        const res = yield call(getProductAdditionalInfoAPI, token , action.payload);
        console.log('Additional===>' , res.data.data)
        yield put(getProductAdditionalInfoSucceeded(res.data.data));
    } catch (e) {
        yield put(getProductAdditionalInfoFailed(e));
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

export function* watchGetProductAdditionalInfosSaga() {
    yield takeLatest(getProductAdditionalInfoAction.requested, getProductAdditionalInfosSaga);
}
