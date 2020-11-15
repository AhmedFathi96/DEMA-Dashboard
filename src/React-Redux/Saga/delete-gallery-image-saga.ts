import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { deleteGalleryImageAction } from "../Actions";
import { deleteGalleryImageAPI } from "../../Axios/delete-gallery-image";
import { selectToken } from "../../helper";
import { deleteGalleryImageSucceeded , deleteGalleryImageFailed  , deleteGalleryImage} from "../Actions/gallery-action";
import { store } from "react-notifications-component";

const actionType = union(deleteGalleryImage);

function* deleteGalleryImageSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(deleteGalleryImageAPI, token , action.payload);
        
        yield put(deleteGalleryImageSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!",
            message: "gallery added successfully",
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
        yield put(deleteGalleryImageFailed(e));
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

export function* watchDeleteGalleryImageSaga() {
    yield takeLatest(deleteGalleryImageAction.requested, deleteGalleryImageSaga);
}
