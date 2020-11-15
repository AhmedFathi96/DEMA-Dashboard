import { call, put, takeLatest, select  } from "redux-saga/effects";
import { getTagAction } from "../Actions";
import { getTags } from "../../Axios/get-itemInfo";
import { selectToken } from "../../helper";
import { getTagsSucceeded , getTagsFailed } from "../Actions/itemInfo-action";
import { store } from "react-notifications-component";

function* getTagsSaga() {

    try {
        const token = yield select(selectToken);
        const res = yield call(getTags, token);
        
        yield put(getTagsSucceeded(res.data.data));
    } catch (e) {
        yield put(getTagsFailed(e));
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

export function* watchGetTagSaga() {
    yield takeLatest(getTagAction.requested, getTagsSaga);
}
