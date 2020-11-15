import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { editProjectAction } from "../Actions";
import { editProjectAPI } from "../../Axios/edit-project";
import { selectToken } from "../../helper";
import { editProjectSucceeded , editProjectFailed  , editProject} from "../Actions/projects-action";
import { store } from "react-notifications-component";

const actionType = union(editProject);

function* editProjectSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(editProjectAPI, token , action.payload.data,action.payload.id);
        
        yield put(editProjectSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!",
            message: "project has been edited successfully",
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
        yield put(editProjectFailed(e));
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

export function* watchEditProjectSaga() {
    yield takeLatest(editProjectAction.requested, editProjectSaga);
}
