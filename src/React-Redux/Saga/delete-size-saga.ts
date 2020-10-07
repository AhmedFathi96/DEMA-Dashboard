import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { deleteSizeAction } from "../Actions";
import { deleteSizeAPI } from "../../Axios/delete-itemInfo";
import { selectToken } from "../../helper";
import { deleteSizeSucceeded , deleteSizeFailed  , deleteSize} from "../Actions/itemInfo-action";
import { store } from "react-notifications-component";

const actionType = union(deleteSize);

function* deleteSizeSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(deleteSizeAPI, token , action.payload);
        console.log('===>' , res.data.data)
        yield put(deleteSizeSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!",
            message: "Size section added successfully",
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
        yield put(deleteSizeFailed(e));
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

export function* watchDeleteSizeSaga() {
    yield takeLatest(deleteSizeAction.requested, deleteSizeSaga);
}
