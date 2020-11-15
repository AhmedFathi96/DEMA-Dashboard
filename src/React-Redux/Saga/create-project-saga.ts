import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { createProjectAction } from "../Actions";
import { createProjectAPI } from "../../Axios/create-project";
import { selectToken } from "../../helper";
import { createProjectSucceeded , createProjectFailed  , createProject} from "../Actions/projects-action";
import { store } from "react-notifications-component";

const actionType = union(createProject);

function* createProjectSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(createProjectAPI, token , action.payload);
        
        yield put(createProjectSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!",
            message: "Projects has been added successfully",
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
        yield put(createProjectFailed(e));
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

export function* watchCreateProjectSaga() {
    yield takeLatest(createProjectAction.requested, createProjectSaga);
}
