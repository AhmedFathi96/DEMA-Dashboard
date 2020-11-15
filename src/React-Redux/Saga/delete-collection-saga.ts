import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { deleteCollectionAction } from "../Actions";
import { deleteCollectionAPI } from "../../Axios/delete-itemInfo";
import { selectToken } from "../../helper";
import { deleteCollectionSucceeded , deleteCollectionFailed  , deleteCollection} from "../Actions/itemInfo-action";
import { store } from "react-notifications-component";

const actionType = union(deleteCollection);

function* deleteCollectionSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(deleteCollectionAPI, token , action.payload);
        
        yield put(deleteCollectionSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!",
            message: "Collection section added successfully",
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
        yield put(deleteCollectionFailed(e));
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

export function* watchDeleteCollectionSaga() {
    yield takeLatest(deleteCollectionAction.requested, deleteCollectionSaga);
}
