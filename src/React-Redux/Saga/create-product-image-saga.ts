import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { createProductImageAction } from "../Actions";
import { createProductItemImageAPI } from "../../Axios/create-productImages";
import { selectToken } from "../../helper";
import { createProductImageSucceeded , createProductImageFailed  , createProductImage} from "../Actions/product-action";
import { store } from "react-notifications-component";


const actionType = union(createProductImage);

function* createProductImageSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(createProductItemImageAPI, token , action.payload);
        yield put(createProductImageSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!",
            message: "ProductImage section added successfully",
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
        yield put(createProductImageFailed(e));
        store.addNotification({
            title: "Error Message!",
            message: `Error happened ${e}`,
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

export function* watchCreateProductImageItemSaga() {
    yield takeLatest(createProductImageAction.requested, createProductImageSaga);
}
