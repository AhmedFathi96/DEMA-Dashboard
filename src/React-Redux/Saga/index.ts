import { all } from "redux-saga/effects";
import { watchLoginSaga } from "./login-saga";
import { watchGetAdminsSaga } from "./get-admins-saga";
import { watchCreateAdminSaga } from "./create-admin-saga";
import { watchEditAdminSaga } from './edit-admin-saga';
import { watchDeleteAdminSaga } from "./delete-admins-saga";

import { watchCreateSliderItemSaga } from "./create-slider-item-saga";
import { watchEditSliderItemSaga } from "./edit-slider-item-saga";
import { watchDeleteSliderItemSaga } from "./delete-slider-item-saga";
import { watchGetSliderItemsSaga } from "./get-slider-items-saga";
import { watchCreateAboutSaga } from "./create-about-saga";
import { watchDeleteAboutSaga } from "./delete-about-saga";
import { watchEditAboutSaga } from "./edit-about-saga";
import { watchGetAboutSaga } from "./get-about-saga";
import { watchCreateStatisticSaga } from "./create-statistic-saga";
import { watchEditStatisticSaga } from "./edit-statistics-saga";
import { watchDeleteStatisticSaga } from "./delete-statistic-saga";
import { watchGetStatisticsSaga } from "./get-statistics-saga";
import { watchDeleteGalleryImageSaga } from "./delete-gallery-image-saga";
import { watchCreateGalleryImageSaga } from "./create-gallery-image-saga";
import { watchEditGalleryImageSaga } from "./edit-gallery-image-saga";
import { watchGetGalleryImageSaga } from "./get-gallery-images-saga";
import { watchCreateProjectSaga } from "./create-project-saga";
import { watchDeleteProjectSaga } from "./delete-project-saga";
import { watchGetProjectsSaga } from "./get-project-saga";
import { watchEditProjectSaga } from "./edit-project-saga";
import { watchCreateContactSaga } from "./create-contact-saga";
import { watchDeleteContactSaga } from "./delete-contact-saga";
import { watchGetContactsSaga } from "./get-contacts-saga";
import { watchCreateFeatureSaga } from "./create-feature-saga";
import { watchDeleteFeatureSaga } from "./delete-feature-saga ";
import { watchEditFeatureSaga } from "./edit-feature-saga";
import { watchGetFeaturesSaga } from "./get-features-saga";
import { watchGetPagesHeadersSaga } from "./get-pages-header-saga";
import { watchEditHighlightsSaga } from "./edit-highlights-saga";
import { watchEditBlogSaga } from "./edit-blog-saga";
import { watchEditContactsSaga } from "./edit-contacts-saga";
import { watchEditInfoSaga } from "./edit-info-saga";
import { watchGetInfoSaga } from "./get-info-saga";
import { watchEditValueSaga } from './edit-value-saga';
import { watchGetValuesSaga } from './get-values-saga'
import { watchDeleteValueSaga } from './delete-value-saga';
import { watchCreateValueSaga } from './create-value-saga';
import { watchCreateHistorySaga } from './create-history-saga';
import { watchDeleteHistorySaga } from './delete-history-saga';
import { watchEditHistorySaga } from './edit-history-saga';
import { watchGetHistorySaga } from './get-history-saga'

import { watchCreateVisionSaga } from './create-vision-saga';
import { watchDeleteVisionSaga } from './delete-vision-saga';
import { watchEditVisionSaga } from './edit-vision-saga';
import { watchGetVisionSaga } from './get-vision-saga';


import { watchCreateGroupSaga } from './create-group-saga';
import { watchDeleteGroupSaga } from './delete-group-saga';
import { watchEditGroupSaga } from './edit-group-saga';
import { watchGetGroupsSaga } from './get-group-saga'
export default function* rootSaga() {
    yield all([
        watchLoginSaga(),
        watchGetAdminsSaga(),
        watchCreateAdminSaga(),
        watchEditAdminSaga(),
        watchDeleteAdminSaga(),
        watchCreateSliderItemSaga(),
        watchEditSliderItemSaga(),
        watchDeleteSliderItemSaga(),
        watchGetSliderItemsSaga(),
        watchCreateAboutSaga(),
        watchDeleteAboutSaga(),
        watchEditAboutSaga(),
        watchGetAboutSaga(),
        watchCreateStatisticSaga(),
        watchEditStatisticSaga(),
        watchDeleteStatisticSaga(),
        watchGetStatisticsSaga(),
        watchCreateGalleryImageSaga(),
        watchEditGalleryImageSaga(),
        watchDeleteGalleryImageSaga(),
        watchGetGalleryImageSaga(),
        watchEditProjectSaga(),
        watchDeleteProjectSaga(),
        watchCreateProjectSaga(),
        watchGetProjectsSaga(),
        watchCreateContactSaga(),
        watchDeleteContactSaga(),
        watchGetContactsSaga(),
        watchCreateFeatureSaga(),
        watchDeleteFeatureSaga(),
        watchEditFeatureSaga(),
        watchGetFeaturesSaga(),
        watchGetPagesHeadersSaga(),
        watchEditHighlightsSaga(),
        watchEditBlogSaga(),
        watchEditContactsSaga(),
        watchGetAdminsSaga(),
        watchGetInfoSaga(),
        watchEditInfoSaga(),
        watchEditValueSaga(),
        watchGetValuesSaga(),
        watchDeleteValueSaga(),
        watchCreateValueSaga(),
        watchCreateHistorySaga(),
        watchDeleteHistorySaga(),
        watchEditHistorySaga(),
        watchGetHistorySaga(),


        watchCreateVisionSaga(),
        watchDeleteVisionSaga(),
        watchEditVisionSaga(),
        watchGetVisionSaga(),

        watchCreateGroupSaga(),
        watchDeleteGroupSaga(),
        watchEditGroupSaga(),
        watchGetGroupsSaga()
    ]);
}
