import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { editGalleryImageAction } from "../Actions";
import { editGalleryImageAPI } from "../../Axios/edit-gallery-image";
import { selectToken } from "../../helper";
import { editGalleryImageSucceeded , editGalleryImageFailed  , editGalleryImage} from "../Actions/gallery-action";
import { store } from "react-notifications-component";

const actionType = union(editGalleryImage);

function* editGalleryImageSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);
        const res = yield call(editGalleryImageAPI, token , action.payload.data,action.payload.id);
        yield put(editGalleryImageSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!",
            message: "gallery image edited successfully",
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
        yield put(editGalleryImageFailed(e));
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

export function* watchEditGalleryImageSaga() {
    yield takeLatest(editGalleryImageAction.requested, editGalleryImageSaga);
}
