import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { editCategoryAction } from "../Actions";
import { editACategoryAPI } from "../../Axios/edit-itemInfo";
import { selectToken } from "../../helper";
import { editCategorySucceeded , editCategoryFailed  , editCategory} from "../Actions/itemInfo-action";
import { store } from "react-notifications-component";

const actionType = union(editCategory);

function* editCategorySaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(editACategoryAPI, token , action.payload.data,action.payload.id);
        console.log('===>' , res.data.data)
        yield put(editCategorySucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!",
            message: "Category edited successfully",
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
        yield put(editCategoryFailed(e));
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

export function* watchEditCategorySaga() {
    yield takeLatest(editCategoryAction.requested, editCategorySaga);
}
