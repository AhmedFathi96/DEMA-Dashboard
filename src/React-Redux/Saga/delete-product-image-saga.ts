import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { deleteProductImageAction } from "../Actions";
import { deleteProductImageAPI } from "../../Axios/delete-product-image";
import { selectToken } from "../../helper";
import { deleteProductImageSucceeded , deleteProductImageFailed  , deleteProductImage} from "../Actions/product-action";
import { store } from "react-notifications-component";


const actionType = union(deleteProductImage);

function* deleteProductImageSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(deleteProductImageAPI, token , action.payload);
        yield put(deleteProductImageSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!!",
            message: "ProductImage deleted successfully",
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
        yield put(deleteProductImageFailed(e));

    } 
}

export function* watchDeleteProductImageSaga() {
    yield takeLatest(deleteProductImageAction.requested, deleteProductImageSaga);
}
