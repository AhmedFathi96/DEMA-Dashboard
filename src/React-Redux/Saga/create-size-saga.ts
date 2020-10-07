import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { createSizeAction } from "../Actions";
import { createSizeAPI } from "../../Axios/create-itemInfo";
import { selectToken } from "../../helper";
import { createSizeSucceeded , createSizeFailed  , createSize} from "../Actions/itemInfo-action";
import { store } from "react-notifications-component";

const actionType = union(createSize);

function* createSizeSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(createSizeAPI, token , action.payload);
        console.log('===>' , res.data.data)
        yield put(createSizeSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!",
            message: "Sizes has been added successfully",
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
        yield put(createSizeFailed(e));
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

export function* watchCreateSizeSaga() {
    yield takeLatest(createSizeAction.requested, createSizeSaga);
}
