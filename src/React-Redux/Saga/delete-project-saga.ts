import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { deleteProjectAction } from "../Actions";
import { deleteProjectAPI } from "../../Axios/delete-project";
import { selectToken } from "../../helper";
import { deleteProjectSucceeded , deleteProjectFailed  , deleteProject} from "../Actions/projects-action";
import { store } from "react-notifications-component";

const actionType = union(deleteProject);

function* deleteProjectSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(deleteProjectAPI, token , action.payload);
        console.log('===>' , res.data.data)
        yield put(deleteProjectSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!",
            message: "project has been deleted successfully",
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
        yield put(deleteProjectFailed(e));
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

export function* watchDeleteProjectSaga() {
    yield takeLatest(deleteProjectAction.requested, deleteProjectSaga);
}
