import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { editTeamAction } from "../Actions";
import { editTeamAPI } from "../../Axios/edit-team";
import { selectToken } from "../../helper";
import { editTeamSucceeded , editTeamFailed  , editTeam} from "../Actions/team-action";
import { store } from "react-notifications-component";

const actionType = union(editTeam);

function* editTeamSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(editTeamAPI, token , action.payload.data,action.payload.id);
        console.log('===>' , res.data.data)
        yield put(editTeamSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!",
            message: "Team edited successfully",
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
        yield put(editTeamFailed(e));
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

export function* watchEditTeamSaga() {
    yield takeLatest(editTeamAction.requested, editTeamSaga);
}
