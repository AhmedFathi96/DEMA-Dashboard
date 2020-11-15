import { call, put, takeLatest, select  } from "redux-saga/effects";
import { getProductImageAction } from "../Actions";
import { getProductImagesAPI } from "../../Axios/get-productImages";
import { selectToken } from "../../helper";
import { getProductImageSucceeded , getProductImageFailed, getProductImage } from "../Actions/product-action";
import { store } from "react-notifications-component";
import { union } from "ts-action";


const actionType = union(getProductImage);

function* getProductImagesSaga(action: typeof actionType.actions) {

    try {
        const token = yield select(selectToken);
        const res = yield call(getProductImagesAPI, token , action.payload);
        yield put(getProductImageSucceeded(res.data.data));
    } catch (e) {
        yield put(getProductImageFailed(e));
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

export function* watchGetProductImagesSaga() {
    yield takeLatest(getProductImageAction.requested, getProductImagesSaga);
}
