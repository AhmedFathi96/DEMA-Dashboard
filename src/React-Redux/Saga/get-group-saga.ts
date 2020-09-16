import { call, put, takeLatest, select  } from "redux-saga/effects";
import { getGroupAction } from "../Actions";
import { getGroups } from "../../Axios/get-group";
import { selectToken } from "../../helper";
import { getGroupsSucceeded , getGroupsFailed } from "../Actions/group-action";
import { store } from "react-notifications-component";

function* getGroupsSaga() {

    try {
        const token = yield select(selectToken);
        const res = yield call(getGroups, token);
        console.log('===>' , res.data.data)
        yield put(getGroupsSucceeded(res.data.data));
    } catch (e) {
        yield put(getGroupsFailed(e));
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

export function* watchGetGroupsSaga() {
    yield takeLatest(getGroupAction.requested, getGroupsSaga);
}
