import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { editSliderItemAction } from "../Actions";
import { editSliderItemAPI } from "../../Axios/edit-slider-item";
import { selectToken } from "../../helper";
import { editSliderItemSucceeded , editSliderItemFailed  , editSliderItem} from "../Actions/slider-action";
import { store } from "react-notifications-component";

const actionType = union(editSliderItem);

function* editSliderItemSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(editSliderItemAPI, token , action.payload.data,action.payload.id);
        
        yield put(editSliderItemSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!",
            message: "slider item edited successfully",
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
        yield put(editSliderItemFailed(e));
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

export function* watchEditSliderItemSaga() {
    yield takeLatest(editSliderItemAction.requested, editSliderItemSaga);
}
