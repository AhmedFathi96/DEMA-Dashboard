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
import { watchCreateTeamSaga } from './create-team-saga';
import { watchDeleteTeamSaga } from './delete-team-saga';
import { watchEditTeamSaga } from './edit-team-saga';
import { watchGetTeamsSaga } from './get-team-saga';
import { watchCreateSizeSaga } from './create-size-saga';
import { watchCreateTagSaga } from './create-tag-saga';
import { watchCreateColorSaga } from './create-color-saga';
import { watchCreateCategorySaga } from './create-category-saga';
import { watchCreateCollectionSaga } from './create-collection-saga';
import { watchDeleteSizeSaga } from './delete-size-saga';
import { watchDeleteTagSaga } from './delete-tag-saga';
import { watchDeleteColorSaga } from './delete-color-saga';
import { watchDeleteCategorySaga } from './delete-category-saga';
import { watchDeleteCollectionSaga } from './delete-collection-saga';
import { watchGetSizeSaga } from './get-size-saga';
import { watchGetTagSaga } from './get-tag-saga';
import { watchGetColorSaga } from './get-color-saga';
import { watchGetCategoriesSaga } from './get-category-saga';
import { watchGetCollectionSaga } from './get-collection-saga';
import { watchEditSizeSaga } from './edit-size-saga';
import { watchEditTagSaga } from './edit-tag-saga';
import { watchEditColorSaga } from './edit-color-saga';
import { watchEditCategorySaga } from './edit-category-saga';
import { watchEditCollectionSaga } from './edit-collection-saga';
import { watchCreateProductItemSaga } from './create-product-saga';
import { watchCreateProductImageItemSaga } from './create-product-image-saga';
import { watchCreateProductAdditionalInfoItemSaga } from './create-product-additional-info-saga';
import { watchGetProductsSaga } from './get-products-saga';
import { watchGetProductImagesSaga } from './get-product-images-saga';
import { watchGetProductAdditionalInfosSaga } from './get-product-additional-info-saga';
import { watchEditProductSaga } from './edit-product-saga';
import { watchEditProductImageSaga } from './edit-product-image-saga';
import { watchEditProductAdditionalInfoSaga } from './edit-product-additional-info-saga';
import { watchDeleteProductSaga } from './delete-product-saga';
import { watchDeleteProductAdditionalInfoSaga } from './delete-product-additional-info-saga';
import { watchDeleteProductImageSaga } from './delete-product-image-saga';

import { watchGetBadgeSaga } from './get-badge-saga';
import { watchCreateBadgeSaga } from './create-badge-saga';
import { watchEditBadgeSaga } from './edit-badge-saga';
import { watchDeleteBadgeSaga } from './delete-badge-saga';


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
        watchCreateTeamSaga(),
        watchDeleteTeamSaga(),
        watchEditTeamSaga(),
        watchGetTeamsSaga(),
        watchCreateSizeSaga(),
        watchCreateTagSaga(),
        watchCreateColorSaga(),
        watchCreateCategorySaga(),
        watchCreateCollectionSaga(),
        watchDeleteSizeSaga(),
        watchDeleteTagSaga(),
        watchDeleteColorSaga(),
        watchDeleteCategorySaga(),
        watchDeleteCollectionSaga(),
        watchGetSizeSaga(),
        watchGetTagSaga(),
        watchGetColorSaga(),
        watchGetCategoriesSaga(),
        watchGetCollectionSaga(),
        watchEditSizeSaga(),
        watchEditTagSaga(),
        watchEditColorSaga(),
        watchEditCategorySaga(),
        watchEditCollectionSaga(),
        watchCreateProductItemSaga(),
        watchCreateProductImageItemSaga(),
        watchCreateProductAdditionalInfoItemSaga(),
        watchGetProductsSaga(),
        watchGetProductImagesSaga(),
        watchGetProductAdditionalInfosSaga(),
        watchEditProductSaga(),
        watchEditProductImageSaga(),
        watchEditProductAdditionalInfoSaga(),
        watchDeleteProductSaga(),
        watchDeleteProductAdditionalInfoSaga(),
        watchDeleteProductImageSaga(),

        watchGetBadgeSaga(),
        watchCreateBadgeSaga(),
        watchEditBadgeSaga(),
        watchDeleteBadgeSaga(),
    ]);
}
