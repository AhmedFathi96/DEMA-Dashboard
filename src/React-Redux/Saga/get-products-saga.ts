import { call, put, takeLatest, select  } from "redux-saga/effects";
import { getProductsAction } from "../Actions";
import { getProductsAPI } from "../../Axios/get-product";
import { selectToken } from "../../helper";
import { getProductsSucceeded , getProductsFailed } from "../Actions/product-action";
import { store } from "react-notifications-component";

function* getProductsSaga() {

    try {
        const token = yield select(selectToken);
        const res = yield call(getProductsAPI, token);

        yield put(getProductsSucceeded(res.data.data));
    } catch (e) {
        yield put(getProductsFailed(e));
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

export function* watchGetProductsSaga() {
    yield takeLatest(getProductsAction.requested, getProductsSaga);
}
