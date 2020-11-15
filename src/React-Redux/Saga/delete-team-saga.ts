import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { deleteTeamAction } from "../Actions";
import { deleteTeamAPI } from "../../Axios/delete-team";
import { selectToken } from "../../helper";
import { deleteTeamSucceeded , deleteTeamFailed  , deleteTeam} from "../Actions/team-action";
import { store } from "react-notifications-component";

const actionType = union(deleteTeam);

function* deleteTeamSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(deleteTeamAPI, token , action.payload);
        
        yield put(deleteTeamSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!",
            message: "Team deleted successfully",
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
        yield put(deleteTeamFailed(e));
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

export function* watchDeleteTeamSaga() {
    yield takeLatest(deleteTeamAction.requested, deleteTeamSaga);
}
