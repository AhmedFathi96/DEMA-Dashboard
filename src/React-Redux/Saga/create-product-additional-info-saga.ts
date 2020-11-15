import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { createProductAdditionalInfoAction } from "../Actions";
import { createProductAdditionalInfoAPI } from "../../Axios/create-productAdditionalInfo";
import { selectToken } from "../../helper";
import { createProductItemAdditionalInfo , createProductItemAdditionalInfoFailed , createProductItemAdditionalInfoSucceeded} from "../Actions/product-action";
import { store } from "react-notifications-component";


const actionType = union(createProductItemAdditionalInfo);

function* createProductAdditionalInfoSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(createProductAdditionalInfoAPI, token , action.payload);
        yield put(createProductItemAdditionalInfoSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!",
            message: "ProductAdditionalInfo section added successfully",
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
        yield put(createProductItemAdditionalInfoFailed(e));
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

export function* watchCreateProductAdditionalInfoItemSaga() {
    yield takeLatest(createProductAdditionalInfoAction.requested, createProductAdditionalInfoSaga);
}
