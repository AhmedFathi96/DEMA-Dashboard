import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { editProductAction } from "../Actions";
import { editProductAPI } from "../../Axios/edit-product";
import { selectToken } from "../../helper";
import { editProductSucceeded , editProductFailed  , editProduct} from "../Actions/product-action";

import { store } from "react-notifications-component";

const actionType = union(editProduct);

function* editProductSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(editProductAPI, token , action.payload.data,action.payload.id);
        console.log('===>' , res.data.data)
        yield put(editProductSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!!",
            message: "Product edited successfully",
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
        yield put(editProductFailed(e));
        store.addNotification({
            title: "Error Message!!",
            message: "something went wrong",
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

export function* watchEditProductSaga() {
    yield takeLatest(editProductAction.requested, editProductSaga);
}
