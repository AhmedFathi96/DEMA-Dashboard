import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { createCollectionAction } from "../Actions";
import { createCollectionAPI } from "../../Axios/create-itemInfo";
import { selectToken } from "../../helper";
import { createCollectionSucceeded , createCollectionFailed  , createCollection} from "../Actions/itemInfo-action";
import { store } from "react-notifications-component";

const actionType = union(createCollection);

function* createCollectionSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(createCollectionAPI, token , action.payload);
        console.log('===>' , res.data.data)
        yield put(createCollectionSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!",
            message: "Collections has been added successfully",
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
        yield put(createCollectionFailed(e));
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

export function* watchCreateCollectionSaga() {
    yield takeLatest(createCollectionAction.requested, createCollectionSaga);
}
