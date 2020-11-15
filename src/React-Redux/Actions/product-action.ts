import {action , payload} from 'ts-action';
import {    createProductAction , createProductImageAction , createProductAdditionalInfoAction,
            getProductsAction , getProductAdditionalInfoAction, getProductImageAction,
            editProductAdditionalInfoAction , editProductAction, editProductImageAction,
deleteProductAction, deleteProductAdditionalInfoAction, deleteProductImageAction
    } from '.';
import { ICreateProduct, IProduct, IProductAdditionalInfo } from '../../lib/index';



export const createProduct = action(createProductAction.requested, payload<ICreateProduct>());
export const createProductSucceeded = action(createProductAction.fulfilled , payload<string>());
export const createProductFailed = action(createProductAction.rejected, payload<Error>());

export const getProducts = action(getProductsAction.requested);
export const getProductsSucceeded = action(getProductsAction.fulfilled , payload<IProduct[]>());
export const getProductsFailed = action(getProductsAction.rejected, payload<Error>());

export const editProduct = action(editProductAction.requested, payload<{data:IProduct , id: string}>());
export const editProductSucceeded = action(editProductAction.fulfilled , payload<IProduct>());
export const editProductFailed = action(editProductAction.rejected, payload<Error>());

export const deleteProduct = action(deleteProductAction.requested, payload<string>());
export const deleteProductSucceeded = action(deleteProductAction.fulfilled , payload<string>());
export const deleteProductFailed = action(deleteProductAction.rejected, payload<Error>());





export const createProductItemAdditionalInfo = action(createProductAdditionalInfoAction.requested, payload<IProductAdditionalInfo>());
export const createProductItemAdditionalInfoSucceeded = action(createProductAdditionalInfoAction.fulfilled , payload<IProductAdditionalInfo>());
export const createProductItemAdditionalInfoFailed = action(createProductAdditionalInfoAction.rejected, payload<Error>());

export const getProductAdditionalInfo = action(getProductAdditionalInfoAction.requested, payload<string>());
export const getProductAdditionalInfoSucceeded = action(getProductAdditionalInfoAction.fulfilled , payload<IProductAdditionalInfo[]>());
export const getProductAdditionalInfoFailed = action(getProductAdditionalInfoAction.rejected, payload<Error>());

export const editProductAdditionalInfo = action(editProductAdditionalInfoAction.requested, payload<{data:IProductAdditionalInfo , id: string}>());
export const editProductAdditionalInfoSucceeded = action(editProductAdditionalInfoAction.fulfilled , payload<IProductAdditionalInfo>());
export const editProductAdditionalInfoFailed = action(editProductAdditionalInfoAction.rejected, payload<Error>());

export const deleteProductAdditionalInfo = action(deleteProductAdditionalInfoAction.requested, payload<string>());
export const deleteProductAdditionalInfoSucceeded = action(deleteProductAdditionalInfoAction.fulfilled , payload<string>());
export const deleteProductAdditionalInfoFailed = action(deleteProductAdditionalInfoAction.rejected, payload<Error>());




export const createProductImage = action(createProductImageAction.requested, payload<FormData>());
export const createProductImageSucceeded = action(createProductImageAction.fulfilled , payload<string>());
export const createProductImageFailed = action(createProductImageAction.rejected, payload<Error>());

export const getProductImage = action(getProductImageAction.requested ,  payload<string>());
export const getProductImageSucceeded = action(getProductImageAction.fulfilled , payload<string[]>());
export const getProductImageFailed = action(getProductImageAction.rejected, payload<Error>());

export const editProductImage = action(editProductImageAction.requested, payload<{data:FormData , id: string}>());
export const editProductImageSucceeded = action(editProductImageAction.fulfilled , payload<string>());
export const editProductImageFailed = action(editProductImageAction.rejected, payload<Error>());

export const deleteProductImage = action(deleteProductImageAction.requested, payload<string>());
export const deleteProductImageSucceeded = action(deleteProductImageAction.fulfilled , payload<string>());
export const deleteProductImageFailed = action(deleteProductImageAction.rejected, payload<Error>());

