import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { editProductImageAction } from "../Actions";
import { editProductImageAPI } from "../../Axios/edit-product-image";
import { selectToken } from "../../helper";
import { editProductImageSucceeded , editProductImageFailed  , editProductImage} from "../Actions/product-action";

import { store } from "react-notifications-component";

const actionType = union(editProductImage);

function* editProductImageSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(editProductImageAPI, token , action.payload.data,action.payload.id);
        console.log('===>' , res.data.data)
        yield put(editProductImageSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!!",
            message: "ProductImage edited successfully",
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
        yield put(editProductImageFailed(e));
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

export function* watchEditProductImageSaga() {
    yield takeLatest(editProductImageAction.requested, editProductImageSaga);
}
