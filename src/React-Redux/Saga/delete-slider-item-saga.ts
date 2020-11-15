import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { deleteSliderItemAction } from "../Actions";
import { deleteSliderItemAPI } from "../../Axios/delete-slider-item";
import { selectToken } from "../../helper";
import { deleteSliderItemSucceeded , deleteSliderItemFailed  , deleteSliderItem} from "../Actions/slider-action";
import { store } from "react-notifications-component";

const actionType = union(deleteSliderItem);

function* deleteSliderItemSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(deleteSliderItemAPI, token , action.payload);
        
        yield put(deleteSliderItemSucceeded(res.data.data));
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
        yield put(deleteSliderItemFailed(e));
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

export function* watchDeleteSliderItemSaga() {
    yield takeLatest(deleteSliderItemAction.requested, deleteSliderItemSaga);
}
