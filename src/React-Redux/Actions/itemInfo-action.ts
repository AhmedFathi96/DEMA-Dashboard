import {action , payload} from 'ts-action';
import { getCategoryAction , getCollectionAction , getColorAction , getSizeAction, getTagAction,
        createCategoryAction , createCollectionAction,createColorAction, createSizeAction,createTagAction,
        editCategoryAction, editColorAction,editCollectionAction , editSizeAction,editTagAction,
        deleteCategoryAction, deleteColorAction,deleteCollectionAction , deleteSizeAction,deleteTagAction,
    } from '.';
import { ICategory , ICollection , IColor , ISize , ITag} from '../../lib/index';


export const getCategories = action(getCategoryAction.requested);
export const getCategoriesSucceeded = action(getCategoryAction.fulfilled , payload<ICategory[]>());
export const getCategoriesFailed = action(getCategoryAction.rejected, payload<Error>());

export const createCategory = action(createCategoryAction.requested, payload<FormData>());
export const createCategorySucceeded = action(createCategoryAction.fulfilled , payload<ICategory>());
export const createCategoryFailed = action(createCategoryAction.rejected, payload<Error>());

export const editCategory = action(editCategoryAction.requested, payload<{data:FormData , id: string}>());
export const editCategorySucceeded = action(editCategoryAction.fulfilled , payload<ICategory>());
export const editCategoryFailed = action(editCategoryAction.rejected, payload<Error>());

export const deleteCategory = action(deleteCategoryAction.requested, payload<string>());
export const deleteCategorySucceeded = action(deleteCategoryAction.fulfilled , payload<ICategory>());
export const deleteCategoryFailed = action(deleteCategoryAction.rejected, payload<Error>());




export const getCollections = action(getCollectionAction.requested);
export const getCollectionsSucceeded = action(getCollectionAction.fulfilled , payload<ICollection[]>());
export const getCollectionsFailed = action(getCollectionAction.rejected, payload<Error>());

export const createCollection = action(createCollectionAction.requested, payload<FormData>());
export const createCollectionSucceeded = action(createCollectionAction.fulfilled , payload<ICollection>());
export const createCollectionFailed = action(createCollectionAction.rejected, payload<Error>());

export const editCollection = action(editCollectionAction.requested, payload<{data:FormData , id: string}>());
export const editCollectionSucceeded = action(editCollectionAction.fulfilled , payload<ICollection>());
export const editCollectionFailed = action(editCollectionAction.rejected, payload<Error>());

export const deleteCollection = action(deleteCollectionAction.requested, payload<string>());
export const deleteCollectionSucceeded = action(deleteCollectionAction.fulfilled , payload<ICollection>());
export const deleteCollectionFailed = action(deleteCollectionAction.rejected, payload<Error>());





export const getColors = action(getColorAction.requested);
export const getColorsSucceeded = action(getColorAction.fulfilled , payload<IColor[]>());
export const getColorsFailed = action(getColorAction.rejected, payload<Error>());

export const createColor = action(createColorAction.requested, payload<IColor>());
export const createColorSucceeded = action(createColorAction.fulfilled , payload<IColor>());
export const createColorFailed = action(createColorAction.rejected, payload<Error>());

export const editColor = action(editColorAction.requested, payload<{data:IColor , id: string}>());
export const editColorSucceeded = action(editColorAction.fulfilled , payload<IColor>());
export const editColorFailed = action(editColorAction.rejected, payload<Error>());

export const deleteColor = action(deleteColorAction.requested, payload<string>());
export const deleteColorSucceeded = action(deleteColorAction.fulfilled , payload<IColor>());
export const deleteColorFailed = action(deleteColorAction.rejected, payload<Error>());




export const getSizes = action(getSizeAction.requested);
export const getSizesSucceeded = action(getSizeAction.fulfilled , payload<ISize[]>());
export const getSizesFailed = action(getSizeAction.rejected, payload<Error>());

export const createSize = action(createSizeAction.requested, payload<ISize>());
export const createSizeSucceeded = action(createSizeAction.fulfilled , payload<ISize>());
export const createSizeFailed = action(createSizeAction.rejected, payload<Error>());

export const editSize = action(editSizeAction.requested, payload<{data:ISize , id: string}>());
export const editSizeSucceeded = action(editSizeAction.fulfilled , payload<ISize>());
export const editSizeFailed = action(editSizeAction.rejected, payload<Error>());

export const deleteSize = action(deleteSizeAction.requested, payload<string>());
export const deleteSizeSucceeded = action(deleteSizeAction.fulfilled , payload<ISize>());
export const deleteSizeFailed = action(deleteSizeAction.rejected, payload<Error>());




export const getTags = action(getTagAction.requested);
export const getTagsSucceeded = action(getTagAction.fulfilled , payload<ITag[]>());
export const getTagsFailed = action(getTagAction.rejected, payload<Error>());

export const createTag = action(createTagAction.requested, payload<ITag>());
export const createTagSucceeded = action(createTagAction.fulfilled , payload<ITag>());
export const createTagFailed = action(createTagAction.rejected, payload<Error>());

export const editTag = action(editTagAction.requested, payload<{data:ITag , id: string}>());
export const editTagSucceeded = action(editTagAction.fulfilled , payload<ITag>());
export const editTagFailed = action(editTagAction.rejected, payload<Error>());

export const deleteTag = action(deleteTagAction.requested, payload<string>());
export const deleteTagSucceeded = action(deleteTagAction.fulfilled , payload<ITag>());
export const deleteTagFailed = action(deleteTagAction.rejected, payload<Error>());