import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { deleteValueAction } from "../Actions";
import { deleteValueAPI } from "../../Axios/delete-value";
import { selectToken } from "../../helper";
import { deleteValueSucceeded , deleteValueFailed  , deleteValue} from "../Actions/values-action";
import { store } from "react-notifications-component";

const actionType = union(deleteValue);

function* deleteValueSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(deleteValueAPI, token , action.payload);
        
        yield put(deleteValueSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!",
            message: "Value deleted successfully",
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
        yield put(deleteValueFailed(e));
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

export function* watchDeleteValueSaga() {
    yield takeLatest(deleteValueAction.requested, deleteValueSaga);
}
