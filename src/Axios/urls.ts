// const production = 'https://wessammohamed.com/';
const local = 'http://localhost:6100/';


const server = local;

export const loginUTR     = `${server}api/login`;
export const getAdminsURL = `${server}api/admin/get-admins`;
export const createAdminsURL = `${server}api/admin/create-admin`;
export const editAdminsURL = (id:string) => `${server}api/admin/update-admin/${id}`;

export const deleteAdminsURL = (id:string) => `${server}api/admin/delete-admin/${id}`;
export const getStudentsURL = `${server}api/Student/get-Students`;
export const createStudentURL = `${server}api/Student/create-Student`;
export const editStudentURL = (id:string) => `${server}api/Student/update-Student/${id}`;
export const deleteStudentURL = (id:string) => `${server}api/Student/delete-Student/${id}`;



export const getSliderItemsURL = `${server}api/slider/get-sliders`;
export const createSliderItemsURL = `${server}api/slider/add-slider`;
export const editSliderItemsURL = (id:string) => `${server}api/slider/update-slider/${id}`;
export const deleteSliderItemsURL = (id:string) => `${server}api/slider/delete-slider/${id}`;


export const getAboutURL = `${server}api/about/get-about`;
export const createAboutURL = `${server}api/about/create-about`;
export const editAboutURL = (id:string) => `${server}api/about/update-about/${id}`;
export const deleteAboutURL = (id:string) => `${server}api/about/delete-about/${id}`;

export const getStatisticsURL = `${server}api/statistic/get-statistics`;
export const createStatisticURL = `${server}api/statistic/add-statistic`;
export const editStatisticURL = (id:string) => `${server}api/statistic/update-statistic/${id}`;
export const deleteStatisticURL = (id:string) => `${server}api/statistic/delete-statistic/${id}`;



export const getGalleryImagesURL = `${server}api/gallery/get-gallery-images`;
export const createGalleryImageURL = `${server}api/gallery/add-gallery-image`;
export const editGalleryImageURL = (id:string) => `${server}api/gallery/update-gallery-image/${id}`;
export const deleteGalleryImageURL = (id:string) => `${server}api/gallery/delete-gallery-image/${id}`;


export const getProjectsURL = `${server}api/projects/get-projects`;
export const createProjectURL = `${server}api/projects/add-project`;
export const editProjectURL = (id:string) => `${server}api/projects/update-project/${id}`;
export const deleteProjectURL = (id:string) => `${server}api/projects/delete-project/${id}`;




export const getContactsURL = `${server}api/contact/get-contacts`;
export const creatContactURL = `${server}api/contact/create-contact`;
export const deleteContactURL = (id:string) => `${server}api/contact/delete-contact/${id}`;




export const getFeaturesURL = `${server}api/features/get-features`;
export const createFeatureURL = `${server}api/features/add-feature`;
export const editFeatureURL = (id:string) => `${server}api/features/update-feature/${id}`;
export const deleteFeatureURL = (id:string) => `${server}api/features/delete-feature/${id}`;




export const getValuesURL = `${server}api/values/get-values`;
export const createValueURL = `${server}api/values/add-value`;
export const deleteValueURL = (id:string) => `${server}api/values/delete-value/${id}`;
export const editValueURL = (id:string) => `${server}api/values/update-value/${id}`;




export const getPagesURL = `${server}api/pages/get-all-pages`;
export const editHighlightsURL = (id:string) => `${server}api/pages/update-highlights-page/${id}`;
export const editFeaturesURL = (id:string) => `${server}api/pages/update-Features-page/${id}`;
export const editBlogURL = (id:string) => `${server}api/pages/update-blog-page/${id}`;
export const editContactURL = (id:string) => `${server}api/pages/update-contact-page/${id}`;
export const editTestimonialURL = (id:string) => `${server}api/pages/update-Statistic-page/${id}`;


export const editInfoURL = (id:string) =>  `${server}api/info/update-info/${id}`;
export const getInfoURL =  `${server}api/info/get-info`;



// export const createFeatureURL = `${server}api/Features/create-Feature`;
// export const editFeatureURL = (id:string) => `${server}api/Features/update-Feature/${id}`;
// export const deleteFeatureURL = (id:string) => `${server}api/Features/delete-Feature/${id}`;


export const getHistoryURL = `${server}api/history/get-history`;
export const createHistoryURL = `${server}api/history/add-history`;
export const deleteHistoryURL = (id:string) => `${server}api/history/delete-history/${id}`;
export const editHistoryURL = (id:string) => `${server}api/history/update-history/${id}`;


export const getVisionURL = `${server}api/vision/get-visions`;
export const createVisionURL = `${server}api/vision/add-vision`;
export const deleteVisionURL = (id:string) => `${server}api/vision/delete-vision/${id}`;
export const editVisionURL = (id:string) => `${server}api/vision/update-vision/${id}`;

export const getTeamURL = `${server}api/team/get-teams`;
export const createTeamURL = `${server}api/team/add-team`;
export const deleteTeamURL = (id:string) => `${server}api/team/delete-team/${id}`;
export const editTeamURL = (id:string) => `${server}api/team/update-team/${id}`;

export const getTagURL = `${server}api/tag/get-tags`;
export const createTagURL = `${server}api/tag/create-tag`;
export const deleteTagURL = (id:string) => `${server}api/tag/delete-tag/${id}`;
export const editTagURL = (id:string) => `${server}api/tag/update-tag/${id}`;


export const getSizeURL = `${server}api/size/get-sizes`;
export const createSizeURL = `${server}api/size/create-size`;
export const deleteSizeURL = (id:string) => `${server}api/size/delete-size/${id}`;
export const editSizeURL = (id:string) => `${server}api/size/update-size/${id}`;

export const getColorURL = `${server}api/color/get-colors`;
export const createColorURL = `${server}api/color/create-color`;
export const deleteColorURL = (id:string) => `${server}api/color/delete-color/${id}`;
export const editColorURL = (id:string) => `${server}api/color/update-color/${id}`;

export const getCollectionURL = `${server}api/collection/get-collections`;
export const createCollectionURL = `${server}api/collection/add-collection`;
export const deleteCollectionURL = (id:string) => `${server}api/collection/delete-collection/${id}`;
export const editCollectionURL = (id:string) => `${server}api/collection/update-collection/${id}`;

export const getCategoryURL = `${server}api/category/get-categories`;
export const createCategoryURL = `${server}api/category/add-category`;
export const deleteCategoryURL = (id:string) => `${server}api/category/delete-category/${id}`;
export const editCategoryURL = (id:string) => `${server}api/category/update-category/${id}`;






















