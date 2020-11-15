import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { createProductAction } from "../Actions";
import { createProductItemAPI } from "../../Axios/create-product";
import { selectToken } from "../../helper";
import { createProductSucceeded , createProductFailed  , createProduct} from "../Actions/product-action";
import { store } from "react-notifications-component";


const actionType = union(createProduct);

function* createProductSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(createProductItemAPI, token , action.payload);
        yield put(createProductSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!",
            message: "Product section added successfully",
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
        yield put(createProductFailed(e));
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

export function* watchCreateProductItemSaga() {
    yield takeLatest(createProductAction.requested, createProductSaga);
}
