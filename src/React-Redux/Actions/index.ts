export const genericAction = (action:string) => ({
    fulfilled: `${action}_FULFILLED`,
    rejected: `${action}_REJECTED`,
    requested: `${action}_REQUESTED`
})

const LOGIN = 'LOGIN';
export const loginAction = genericAction(LOGIN);


const LOGOUT = 'LOGOUT';
export const logoutAction = genericAction(LOGOUT);


// Admin Actions

const getAdmins = 'GET-ADMINS';
export const getAdminsAction = genericAction(getAdmins);

const createAdmins = 'CREATE-ADMINS';
export const createAdminAction = genericAction(createAdmins);

const editAdmins = 'EDIT-ADMINS';
export const editAdminAction = genericAction(editAdmins);

const deleteAdmins = 'DELETE-ADMINS';
export const deleteAdminAction = genericAction(deleteAdmins);


// Student Actions

const getStudents = 'GET-STUDENTS';
export const getStudentsAction = genericAction(getStudents);

const createStudent = 'CREATE-STUDENT';
export const createStudentAction = genericAction(createStudent);

const editStudent = 'EDIT-STUDENT';
export const editStudentAction = genericAction(editStudent);

const deleteStudent = 'DELETE-STUDENT';
export const deleteStudentAction = genericAction(deleteStudent);


// Grades Actions

const getGrades = 'GET-GRADES';
export const getGradesAction = genericAction(getGrades);



// Slider Actions

const getSliderItems = 'GET-SLIDER-ITEM';
export const getSliderItemsAction = genericAction(getSliderItems);

const createSliderItem = 'CREATE-SLIDER-ITEM';
export const createSliderItemAction = genericAction(createSliderItem);

const editSliderItem = 'EDIT-SLIDER-ITEM';
export const editSliderItemAction = genericAction(editSliderItem);

const deleteSliderItem = 'DELETE-SLIDER-ITEM';
export const deleteSliderItemAction = genericAction(deleteSliderItem);


// ABOUT Actions

const getAbout = 'GET-ABOUT';
export const getAboutAction = genericAction(getAbout);

const createAbout = 'CREATE-ABOUT';
export const createAboutAction = genericAction(createAbout);

const editAbout = 'EDIT-ABOUT';
export const editAboutAction = genericAction(editAbout);

const deleteAbout = 'DELETE-ABOUT';
export const deleteAboutAction = genericAction(deleteAbout);



// Testimonial Actions

const getStatistics = 'GET-STATISTICS';
export const getStatisticsAction = genericAction(getStatistics);

const createStatistic = 'CREATE-STATISTIC';
export const createStatisticAction = genericAction(createStatistic);

const editStatistic = 'EDIT-STATISTIC';
export const editStatisticAction = genericAction(editStatistic);

const deleteStatistic = 'DELETE-STATISTIC';
export const deleteStatisticAction = genericAction(deleteStatistic);


// Gallery Actions

const getGalleryImages = 'GET-GALLERY-IMAGES';
export const getGalleryImagesAction = genericAction(getGalleryImages);

const createGalleryImage = 'CREATE-GALLERY-IMAGES';
export const createGalleryImageAction = genericAction(createGalleryImage);

const editGalleryImage = 'EDIT-GALLERY-IMAGES';
export const editGalleryImageAction = genericAction(editGalleryImage);

const deleteGalleryImage = 'DELETE-GALLERY-IMAGES';
export const deleteGalleryImageAction = genericAction(deleteGalleryImage);


// Blog posts Actions

const getProjects = 'GET-PROJECT';
export const getProjectsAction = genericAction(getProjects);

const createProject = 'CREATE-PROJECT';
export const createProjectAction = genericAction(createProject);

const editProject = 'EDIT-PROJECT';
export const editProjectAction = genericAction(editProject);

const deleteProject = 'DELETE-PROJECT';
export const deleteProjectAction = genericAction(deleteProject);



// Contact Actions

const getContacts = 'GET-CONTACTS';
export const getContactsAction = genericAction(getContacts);

const createContact = 'CREATE-CONTACT';
export const createContactAction = genericAction(createContact);

const deleteContact = 'DELETE-CONTACT';
export const deleteContactAction = genericAction(deleteContact);



// Features Actions

const getFeatures = 'GET-FEATURES';
export const getFeaturesAction = genericAction(getFeatures);

const createFeature = 'CREATE-FEATURES';
export const createFeatureAction = genericAction(createFeature);

const editFeature = 'EDIT-FEATURES';
export const editFeatureAction = genericAction(editFeature);

const deleteFeature = 'DELETE-FEATURES';
export const deleteFeatureAction = genericAction(deleteFeature);

// Page headers Action

// Features Actions

const getPagesHeaders = 'GET-PAGES-HEADERS';
export const getPagesHeadersAction = genericAction(getPagesHeaders);


const editHighlightsPageHeader = 'EDIT-HIGHLIGHT-HEADER';
export const editHighlightsPageHeaderAction = genericAction(editHighlightsPageHeader);

const editBlogPageHeader = 'EDIT-BLOG-HEADER';
export const editBlogPageHeaderAction = genericAction(editBlogPageHeader);

const editFeaturesPageHeader = 'EDIT-FeatureS-HEADER';
export const editFeaturesPageHeaderAction = genericAction(editFeaturesPageHeader);

const editContactsPageHeader = 'EDIT-CONTACTS-HEADER';
export const editContactsPageHeaderAction = genericAction(editContactsPageHeader);

const editTestimonialPageHeader = 'EDIT-TESTIMONIALS-HEADER';
export const editTestimonialPageHeaderAction = genericAction(editTestimonialPageHeader);




const getInfo = 'GET-INFO';
export const getInfoAction = genericAction(getInfo);

const editInfo = 'EDIT-INFO';
export const editInfoAction = genericAction(editInfo);




const getValues = 'GET-VALUE';
export const getValuesAction = genericAction(getValues);

const editValue = 'EDIT-VALUE';
export const editValueAction = genericAction(editValue);

const createValue = 'CREATE-VALUE';
export const createValueAction = genericAction(createValue);

const deleteValue = 'DELETE-VALUE';
export const deleteValueAction = genericAction(deleteValue);



const getHistory = 'GET-HISTORY';
export const getHistoryAction = genericAction(getHistory);

const editHistory = 'EDIT-HISTORY';
export const editHistoryAction = genericAction(editHistory);

const createHistory = 'CREATE-HISTORY';
export const createHistoryAction = genericAction(createHistory);

const deleteHistory = 'DELETE-HISTORY';
export const deleteHistoryAction = genericAction(deleteHistory);



const getVision = 'GET-VISION';
export const getVisionAction = genericAction(getVision);

const editVision = 'EDIT-VISION';
export const editVisionAction = genericAction(editVision);

const createVision = 'CREATE-VISION';
export const createVisionAction = genericAction(createVision);

const deleteVision = 'DELETE-VISION';
export const deleteVisionAction = genericAction(deleteVision);




const getTeam = 'GET-TEAM';
export const getTeamAction = genericAction(getTeam);

const editTeam = 'EDIT-TEAM';
export const editTeamAction = genericAction(editTeam);

const createTeam = 'CREATE-TEAM';
export const createTeamAction = genericAction(createTeam);

const deleteTeam = 'DELETE-TEAM';
export const deleteTeamAction = genericAction(deleteTeam);





const getTag = 'GET-TAG';
export const getTagAction = genericAction(getTag);

const editTag = 'EDIT-TAG';
export const editTagAction = genericAction(editTag);

const createTag = 'CREATE-TAG';
export const createTagAction = genericAction(createTag);

const deleteTag = 'DELETE-TAG';
export const deleteTagAction = genericAction(deleteTag);



const getSize = 'GET-SIZE';
export const getSizeAction = genericAction(getSize);

const editSize = 'EDIT-SIZE';
export const editSizeAction = genericAction(editSize);

const createSize = 'CREATE-SIZE';
export const createSizeAction = genericAction(createSize);

const deleteSize = 'DELETE-SIZE';
export const deleteSizeAction = genericAction(deleteSize);



const getColor = 'GET-COLOR';
export const getColorAction = genericAction(getColor);

const editColor = 'EDIT-COLOR';
export const editColorAction = genericAction(editColor);

const createColor = 'CREATE-COLOR';
export const createColorAction = genericAction(createColor);

const deleteColor = 'DELETE-COLOR';
export const deleteColorAction = genericAction(deleteColor);



const getCollection = 'GET-COLLECTION';
export const getCollectionAction = genericAction(getCollection);

const editCollection = 'EDIT-COLLECTION';
export const editCollectionAction = genericAction(editCollection);

const createCollection = 'CREATE-COLLECTION';
export const createCollectionAction = genericAction(createCollection);

const deleteCollection = 'DELETE-COLLECTION';
export const deleteCollectionAction = genericAction(deleteCollection);



const getCategory = 'GET-CATEGORY';
export const getCategoryAction = genericAction(getCategory);

const editCategory = 'EDIT-CATEGORY';
export const editCategoryAction = genericAction(editCategory);

const createCategory = 'CREATE-CATEGORY';
export const createCategoryAction = genericAction(createCategory);

const deleteCategory = 'DELETE-CATEGORY';
export const deleteCategoryAction = genericAction(deleteCategory);