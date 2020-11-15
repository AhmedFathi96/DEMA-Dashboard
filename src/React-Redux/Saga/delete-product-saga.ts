import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { deleteProductAction } from "../Actions";
import { deleteProductAPI } from "../../Axios/delete-product";
import { selectToken } from "../../helper";
import { deleteProductSucceeded , deleteProductFailed  , deleteProduct} from "../Actions/product-action";
import { store } from "react-notifications-component";


const actionType = union(deleteProduct);

function* deleteProductSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(deleteProductAPI, token , action.payload);
        yield put(deleteProductSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!!",
            message: "Product deleted successfully",
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
        store.addNotification({
            title: "Error Message!!",
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
        yield put(deleteProductFailed(e));

    } 
}

export function* watchDeleteProductSaga() {
    yield takeLatest(deleteProductAction.requested, deleteProductSaga);
}
