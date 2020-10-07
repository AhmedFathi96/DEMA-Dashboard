import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { createCategoryAction } from "../Actions";
import { createCategoryAPI } from "../../Axios/create-itemInfo";
import { selectToken } from "../../helper";
import { createCategorySucceeded , createCategoryFailed  , createCategory} from "../Actions/itemInfo-action";
import { store } from "react-notifications-component";

const actionType = union(createCategory);

function* createCategorySaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(createCategoryAPI, token , action.payload);
        console.log('===>' , res.data.data)
        yield put(createCategorySucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!",
            message: "Categorys has been added successfully",
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
        yield put(createCategoryFailed(e));
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

export function* watchCreateCategorySaga() {
    yield takeLatest(createCategoryAction.requested, createCategorySaga);
}
