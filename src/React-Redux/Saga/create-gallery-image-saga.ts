import { union } from "ts-action";
import { call, put, takeLatest, select  } from "redux-saga/effects";
import { createGalleryImageAction } from "../Actions";
import { createGalleryImageAPI } from "../../Axios/create-gallery-image";
import { selectToken } from "../../helper";
import { createGalleryImageSucceeded , createGalleryImageFailed  , createGalleryImage} from "../Actions/gallery-action";
import { store } from "react-notifications-component";

const actionType = union(createGalleryImage);

function* createGalleryImageSaga(action: typeof actionType.actions) {
    try {
        const token = yield select(selectToken);

        const res = yield call(createGalleryImageAPI, token , action.payload);
        yield put(createGalleryImageSucceeded(res.data.data));
        store.addNotification({
            title: "Success Message!",
            message: "gallery image added successfully",
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
        yield put(createGalleryImageFailed(e));
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

export function* watchCreateGalleryImageSaga() {
    yield takeLatest(createGalleryImageAction.requested, createGalleryImageSaga);
}
