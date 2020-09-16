import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { deleteAdminAction } from "../Actions";
import { deleteAdminAPI } from "../../Axios/delete-admin";
import { selectToken } from "../../helper";
import { deleteAdminSucceeded , deleteAdminFailed  , deleteAdmin} from "../Actions/admin-action";
import { store } from "react-notifications-component";


const actionType = union(deleteAdmin);

function* deleteAdminSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(deleteAdminAPI, token , action.payload);
        yield put(deleteAdminSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!!",
            message: "Admin deleted successfully",
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
        store.addNotification({
            title: "Error Message!!",
            message: `Error happened ${e}`,
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
        yield put(deleteAdminFailed(e));

    } 
}

export function* watchDeleteAdminSaga() {
    yield takeLatest(deleteAdminAction.requested, deleteAdminSaga);
}
