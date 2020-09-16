import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { editInfoAction } from "../Actions";
import { editInfoAPI } from "../../Axios/edit-info";
import { selectToken } from "../../helper";
import { editInfoSucceeded , editInfoFailed  , editInfo} from "../Actions/info-action";
import { store } from "react-notifications-component";

const actionType = union(editInfo);

function* editInfoSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(editInfoAPI, token , action.payload.data, action.payload.id);
        console.log('===>' , res.data.data)
        yield put(editInfoSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!",
            message: "Infos has been edited successfully",
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
        yield put(editInfoFailed(e));
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

export function* watchEditInfoSaga() {
    yield takeLatest(editInfoAction.requested, editInfoSaga);
}
