import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { editProductAdditionalInfoAction } from "../Actions";
import { editProductItemAdditionalInfoAPI } from "../../Axios/edit-product-additional-info";
import { selectToken } from "../../helper";
import { editProductAdditionalInfoSucceeded , editProductAdditionalInfoFailed  , editProductAdditionalInfo} from "../Actions/product-action";

import { store } from "react-notifications-component";

const actionType = union(editProductAdditionalInfo);

function* editProductAdditionalInfoSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(editProductItemAdditionalInfoAPI, token , action.payload.data,action.payload.id);
        yield put(editProductAdditionalInfoSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!!",
            message: "ProductAdditionalInfo edited successfully",
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
        yield put(editProductAdditionalInfoFailed(e));
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

export function* watchEditProductAdditionalInfoSaga() {
    yield takeLatest(editProductAdditionalInfoAction.requested, editProductAdditionalInfoSaga);
}
