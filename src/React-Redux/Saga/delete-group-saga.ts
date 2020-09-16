import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { deleteGroupAction } from "../Actions";
import { deleteGroupAPI } from "../../Axios/delete-group";
import { selectToken } from "../../helper";
import { deleteGroupSucceeded , deleteGroupFailed  , deleteGroup} from "../Actions/group-action";
import { store } from "react-notifications-component";

const actionType = union(deleteGroup);

function* deleteGroupSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(deleteGroupAPI, token , action.payload);
        console.log('===>' , res.data.data)
        yield put(deleteGroupSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!",
            message: "Group deleted successfully",
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
        yield put(deleteGroupFailed(e));
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

export function* watchDeleteGroupSaga() {
    yield takeLatest(deleteGroupAction.requested, deleteGroupSaga);
}
