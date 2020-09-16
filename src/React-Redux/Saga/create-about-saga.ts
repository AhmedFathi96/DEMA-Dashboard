import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { createAboutAction } from "../Actions";
import { createAboutAPI } from "../../Axios/create-about";
import { selectToken } from "../../helper";
import { createAboutSucceeded , createAboutFailed  , createAbout} from "../Actions/about-action";
import { store } from "react-notifications-component";


const actionType = union(createAbout);

function* createAboutSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(createAboutAPI, token , action.payload);
        yield put(createAboutSucceeded(res.data.data));
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
        yield put(createAboutFailed(e));
        store.addNotification({
            title: "Error Message!",
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
    } 
}

export function* watchCreateAboutSaga() {
    yield takeLatest(createAboutAction.requested, createAboutSaga);
}
