import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { editAboutAction } from "../Actions";
import { editAboutAPI } from "../../Axios/edit-about";
import { selectToken } from "../../helper";
import { editAboutSucceeded , editAboutFailed  , editAbout} from "../Actions/about-action";
import { store } from "react-notifications-component";

const actionType = union(editAbout);

function* editAboutSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(editAboutAPI, token , action.payload.data,action.payload.id);
        console.log('===>' , res.data.data)
        yield put(editAboutSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!",
            message: "about edited successfully",
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
        yield put(editAboutFailed(e));
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

export function* watchEditAboutSaga() {
    yield takeLatest(editAboutAction.requested, editAboutSaga);
}
