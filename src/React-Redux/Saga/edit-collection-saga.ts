import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { editCollectionAction } from "../Actions";
import { editCollectionAPI } from "../../Axios/edit-itemInfo";
import { selectToken } from "../../helper";
import { editCollectionSucceeded , editCollectionFailed  , editCollection} from "../Actions/itemInfo-action";
import { store } from "react-notifications-component";

const actionType = union(editCollection);

function* editCollectionSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(editCollectionAPI, token , action.payload.data,action.payload.id);
        console.log('===>' , res.data.data)
        yield put(editCollectionSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!",
            message: "Collection edited successfully",
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
        yield put(editCollectionFailed(e));
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

export function* watchEditCollectionSaga() {
    yield takeLatest(editCollectionAction.requested, editCollectionSaga);
}
