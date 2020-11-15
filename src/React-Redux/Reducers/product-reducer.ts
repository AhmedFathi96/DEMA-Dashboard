import { reducer, on } from "ts-action";
import { IProduct, IProductAdditionalInfo } from "../../lib";
import { createProductSucceeded , createProductItemAdditionalInfoSucceeded , createProductImageSucceeded,
getProductAdditionalInfoSucceeded , getProductsSucceeded,getProductImageSucceeded,
editProductAdditionalInfoSucceeded,editProductImageSucceeded,editProductSucceeded,
deleteProductAdditionalInfoSucceeded, deleteProductImageSucceeded,deleteProductSucceeded} from "../Actions/product-action";

interface IState{
    createdProduct: string;
    products:IProduct[],
    createdProductImages: string[];
    createdProductAdditionalInfo: IProductAdditionalInfo[];
    createdProductIsLoading: boolean;
    productImages:string[];
    productAdditionalInfo: IProductAdditionalInfo[];
}

export const productReducer = reducer<IState>(
    {
        createdProduct:  '',
        createdProductImages:[],
        createdProductIsLoading:false,
        createdProductAdditionalInfo:[],
        products:[],
        productImages: [],
        productAdditionalInfo:[]
        
    },
    on(getProductsSucceeded, (state, { payload }) => ({
        ...state,
        products: payload,
    })),
    on(createProductSucceeded, (state, { payload }) => ({
        ...state,
        createdProduct: payload,
        createdProductIsLoading: true
    })),

    on(createProductImageSucceeded, (state, { payload }) => ({
        ...state,
        createdProductImages: [...state.createdProductImages , payload]
    })),
    
    on(getProductImageSucceeded, (state, { payload }) => ({
        ...state,
        productImages: payload,
    })),


    on(createProductItemAdditionalInfoSucceeded, (state, { payload }) => ({
        ...state,
        createdProductAdditionalInfo: [...state.createdProductAdditionalInfo , payload],
        createdProductIsLoading: true
    })),
    on(getProductAdditionalInfoSucceeded, (state, { payload }) => ({
        ...state,
        productAdditionalInfo: payload,
    })),
    
    on(editProductSucceeded, (state, { payload }) => {
        const oldData = state.products.filter((pro) => pro._id !== payload._id);
        const newAbout = payload;
        return{
            ...state,
            products: [...oldData, newAbout],
        }
    }),

    on(editProductImageSucceeded, (state, { payload }) => {
        const oldData = state.productImages.filter((pro) => pro !== payload);
        const newAbout = payload;
        return{
            ...state,
            productImages: [...oldData, newAbout],
        }
    }),

    on(editProductAdditionalInfoSucceeded, (state, { payload }) => {
        const oldData = state.productAdditionalInfo.filter((pro) => pro._id !== payload._id);
        const newAbout = payload;
        return{
            ...state,
            productAdditionalInfo: [...oldData, newAbout],
        }
    }),
    on(deleteProductSucceeded, (state, { payload }) => {
        const oldData = state.products.filter((pro) => pro._id !== payload);
        return{
            ...state,
            products: [...oldData],
        }
    }),

    on(deleteProductAdditionalInfoSucceeded, (state, { payload }) => {
        const oldData = state.productAdditionalInfo.filter((pro) => pro._id !== payload);
        return{
            ...state,
            productAdditionalInfo: [...oldData],
        }
    }),

    on(deleteProductImageSucceeded, (state, { payload }) => {
        const oldData = state.productImages.filter((pro) => pro !== payload);
        return{
            ...state,
            productImages: [...oldData],
        }
    }),
)