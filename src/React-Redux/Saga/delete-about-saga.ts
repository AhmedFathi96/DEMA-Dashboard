import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { deleteAboutAction } from "../Actions";
import { deleteAboutAPI } from "../../Axios/delete-about";
import { selectToken } from "../../helper";
import { deleteAboutSucceeded , deleteAboutFailed  , deleteAbout} from "../Actions/about-action";
import { store } from "react-notifications-component";

const actionType = union(deleteAbout);

function* deleteAboutSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(deleteAboutAPI, token , action.payload);
        console.log('===>' , res.data.data)
        yield put(deleteAboutSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!",
            message: "about section added successfully",
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
        yield put(deleteAboutFailed(e));
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

export function* watchDeleteAboutSaga() {
    yield takeLatest(deleteAboutAction.requested, deleteAboutSaga);
}
