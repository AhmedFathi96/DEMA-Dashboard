import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { editSizeAction } from "../Actions";
import { editSizeAPI } from "../../Axios/edit-itemInfo";
import { selectToken } from "../../helper";
import { editSizeSucceeded , editSizeFailed  , editSize} from "../Actions/itemInfo-action";
import { store } from "react-notifications-component";

const actionType = union(editSize);

function* editSizeSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(editSizeAPI, token , action.payload.data,action.payload.id);
        console.log('===>' , res.data.data)
        yield put(editSizeSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!",
            message: "Size edited successfully",
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
        yield put(editSizeFailed(e));
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

export function* watchEditSizeSaga() {
    yield takeLatest(editSizeAction.requested, editSizeSaga);
}
