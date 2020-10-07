import { call, put, takeLatest, select  } from "redux-saga/effects";
import { getTeamAction } from "../Actions";
import { getTeams } from "../../Axios/get-team";
import { selectToken } from "../../helper";
import { getTeamsSucceeded , getTeamsFailed } from "../Actions/team-action";
import { store } from "react-notifications-component";

function* getTeamsSaga() {

    try {
        const token = yield select(selectToken);
        const res = yield call(getTeams, token);
        console.log('===>' , res.data.data)
        yield put(getTeamsSucceeded(res.data.data));
    } catch (e) {
        yield put(getTeamsFailed(e));
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

export function* watchGetTeamsSaga() {
    yield takeLatest(getTeamAction.requested, getTeamsSaga);
}
