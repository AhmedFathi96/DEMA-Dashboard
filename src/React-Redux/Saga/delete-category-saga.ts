import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { deleteCategoryAction } from "../Actions";
import { deleteCategoryAPI } from "../../Axios/delete-itemInfo";
import { selectToken } from "../../helper";
import { deleteCategorySucceeded , deleteCategoryFailed  , deleteCategory} from "../Actions/itemInfo-action";
import { store } from "react-notifications-component";

const actionType = union(deleteCategory);

function* deleteCategorySaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(deleteCategoryAPI, token , action.payload);
        console.log('===>' , res.data.data)
        yield put(deleteCategorySucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!",
            message: "Category section added successfully",
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
        yield put(deleteCategoryFailed(e));
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

export function* watchDeleteCategorySaga() {
    yield takeLatest(deleteCategoryAction.requested, deleteCategorySaga);
}
