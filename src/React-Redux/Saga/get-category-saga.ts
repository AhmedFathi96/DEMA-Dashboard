import { call, put, takeLatest, select  } from "redux-saga/effects";
import { getCategoryAction } from "../Actions";
import { getCategories } from "../../Axios/get-itemInfo";
import { selectToken } from "../../helper";
import { getCategoriesSucceeded , getCategoriesFailed } from "../Actions/itemInfo-action";
import { store } from "react-notifications-component";

function* getCategoriesSaga() {

    try {
        const token = yield select(selectToken);
        const res = yield call(getCategories, token);
        console.log('===>' , res.data.data)
        yield put(getCategoriesSucceeded(res.data.data));
    } catch (e) {
        yield put(getCategoriesFailed(e));
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

export function* watchGetCategoriesSaga() {
    yield takeLatest(getCategoryAction.requested, getCategoriesSaga);
}
