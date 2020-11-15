import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { createTeamAction } from "../Actions";
import { createTeamAPI } from "../../Axios/create-team";
import { selectToken } from "../../helper";
import { createTeamSucceeded , createTeamFailed  , createTeam} from "../Actions/team-action";
import { store } from "react-notifications-component";

const actionType = union(createTeam);

function* createTeamSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(createTeamAPI, token , action.payload);
        
        yield put(createTeamSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!",
            message: "Team added successfully",
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
        yield put(createTeamFailed(e));
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

export function* watchCreateTeamSaga() {
    yield takeLatest(createTeamAction.requested, createTeamSaga);
}
