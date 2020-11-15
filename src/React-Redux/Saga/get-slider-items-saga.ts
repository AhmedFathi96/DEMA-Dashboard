import { call, put, takeLatest, select  } from "redux-saga/effects";
import { getSliderItemsAction } from "../Actions";
import { getSliderItems } from "../../Axios/get-slider-items";
import { selectToken } from "../../helper";
import { getSliderItemsSucceeded , getSliderItemsFailed } from "../Actions/slider-action";
import { store } from "react-notifications-component";

function* getSliderItemsSaga() {

    try {
        const token = yield select(selectToken);
        const res = yield call(getSliderItems, token);
        
        yield put(getSliderItemsSucceeded(res.data.data));
    } catch (e) {
        yield put(getSliderItemsFailed(e));
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

export function* watchGetSliderItemsSaga() {
    yield takeLatest(getSliderItemsAction.requested, getSliderItemsSaga);
}
