import { call, put, takeLatest, select  } from "redux-saga/effects";
import { getGalleryImagesAction } from "../Actions";
import { getGalleryImage } from "../../Axios/get-gallery-images";
import { selectToken } from "../../helper";
import { getGalleryImageSucceeded , getGalleryImageFailed } from "../Actions/gallery-action";
import { store } from 'react-notifications-component';

function* getGalleryImageSaga() {

    try {
        const token = yield select(selectToken);
        const res = yield call(getGalleryImage, token);
        console.log('===>' , res.data.data)
        yield put(getGalleryImageSucceeded(res.data.data));
    } catch (e) {
        yield put(getGalleryImageFailed(e));
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

export function* watchGetGalleryImageSaga() {
    yield takeLatest(getGalleryImagesAction.requested, getGalleryImageSaga);
}
