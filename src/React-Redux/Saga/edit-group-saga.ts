import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { editGroupAction } from "../Actions";
import { editGroupAPI } from "../../Axios/edit-group";
import { selectToken } from "../../helper";
import { editGroupSucceeded , editGroupFailed  , editGroup} from "../Actions/group-action";
import { store } from "react-notifications-component";

const actionType = union(editGroup);

function* editGroupSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(editGroupAPI, token , action.payload.data,action.payload.id);
        console.log('===>' , res.data.data)
        yield put(editGroupSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!",
            message: "Group edited successfully",
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
        yield put(editGroupFailed(e));
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

export function* watchEditGroupSaga() {
    yield takeLatest(editGroupAction.requested, editGroupSaga);
}
