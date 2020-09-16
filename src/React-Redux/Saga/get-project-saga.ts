import { call, put, takeLatest, select  } from "redux-saga/effects";
import { getProjectsAction } from "../Actions";
import { getProjects } from "../../Axios/get-projects";
import { selectToken } from "../../helper";
import { getProjectSucceeded , getProjectFailed } from "../Actions/projects-action";
import { store } from "react-notifications-component";

function* getProjectsSaga() {

    try {
        const token = yield select(selectToken);
        const res = yield call(getProjects, token);
        console.log('===>' , res.data.data)
        yield put(getProjectSucceeded(res.data.data));
    } catch (e) {
        yield put(getProjectFailed(e));
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

export function* watchGetProjectsSaga() {
    yield takeLatest(getProjectsAction.requested, getProjectsSaga);
}
