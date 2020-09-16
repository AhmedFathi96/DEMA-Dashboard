import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { createGroupAction } from "../Actions";
import { createGroupAPI } from "../../Axios/create-group";
import { selectToken } from "../../helper";
import { createGroupSucceeded , createGroupFailed  , createGroup} from "../Actions/group-action";
import { store } from "react-notifications-component";

const actionType = union(createGroup);

function* createGroupSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(createGroupAPI, token , action.payload);
        console.log('===>' , res.data.data)
        yield put(createGroupSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!",
            message: "Group added successfully",
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
        yield put(createGroupFailed(e));
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

export function* watchCreateGroupSaga() {
    yield takeLatest(createGroupAction.requested, createGroupSaga);
}
