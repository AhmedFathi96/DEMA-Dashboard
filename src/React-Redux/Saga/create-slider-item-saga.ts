import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { createSliderItemAction } from "../Actions";
import { createSliderItemAPI } from "../../Axios/create-slider-item";
import { selectToken } from "../../helper";
import { createSliderItemSucceeded , createSliderItemFailed  , createSliderItem} from "../Actions/slider-action";
import { store } from "react-notifications-component";

const actionType = union(createSliderItem);

function* createSliderItemSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(createSliderItemAPI, token , action.payload);
        
        yield put(createSliderItemSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!",
            message: "slider item added successfully",
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
        yield put(createSliderItemFailed(e));
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

export function* watchCreateSliderItemSaga() {
    yield takeLatest(createSliderItemAction.requested, createSliderItemSaga);
}
