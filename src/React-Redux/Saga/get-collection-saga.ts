import { call, put, takeLatest, select  } from "redux-saga/effects";
import { getCollectionAction } from "../Actions";
import { getCollections } from "../../Axios/get-itemInfo";
import { selectToken } from "../../helper";
import { getCollectionsSucceeded , getCollectionsFailed } from "../Actions/itemInfo-action";
import { store } from "react-notifications-component";

function* getCollectionsSaga() {

    try {
        const token = yield select(selectToken);
        const res = yield call(getCollections, token);
        console.log('===>' , res.data.data)
        yield put(getCollectionsSucceeded(res.data.data));
    } catch (e) {
        yield put(getCollectionsFailed(e));
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

export function* watchGetCollectionSaga() {
    yield takeLatest(getCollectionAction.requested, getCollectionsSaga);
}
