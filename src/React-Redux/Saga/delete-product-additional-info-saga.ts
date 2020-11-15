import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { deleteProductAdditionalInfoAction } from "../Actions";
import { deleteProductAdditionalInfoAPI } from "../../Axios/delete-product-additional-info";
import { selectToken } from "../../helper";
import { deleteProductAdditionalInfoSucceeded , deleteProductAdditionalInfoFailed  , deleteProductAdditionalInfo} from "../Actions/product-action";
import { store } from "react-notifications-component";


const actionType = union(deleteProductAdditionalInfo);

function* deleteProductAdditionalInfoSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(deleteProductAdditionalInfoAPI, token , action.payload);
        yield put(deleteProductAdditionalInfoSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!!",
            message: "ProductAdditionalInfo deleted successfully",
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
        yield put(deleteProductAdditionalInfoFailed(e));

    } 
}

export function* watchDeleteProductAdditionalInfoSaga() {
    yield takeLatest(deleteProductAdditionalInfoAction.requested, deleteProductAdditionalInfoSaga);
}
