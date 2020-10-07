import { reducer, on } from "ts-action";
import { getCategoriesSucceeded , createCategorySucceeded  , editCategorySucceeded, deleteCategorySucceeded,
getCollectionsSucceeded , createCollectionSucceeded,editCollectionSucceeded,deleteCollectionSucceeded,
getColorsSucceeded, createColorSucceeded, editColorSucceeded,deleteColorSucceeded,
getSizesSucceeded, createSizeSucceeded, editSizeSucceeded,deleteSizeSucceeded,
getTagsSucceeded, createTagSucceeded, editTagSucceeded,deleteTagSucceeded,} from "../Actions/itemInfo-action";
import {  ICategory, ICollection , IColor, ISize , ITag } from "../../lib/index";

interface IState{
    categories: ICategory[];
    categories_is_loading:boolean;

    collections: ICollection[];
    collections_is_loading:boolean;

    colors: IColor[];
    colors_is_loading:boolean;

    sizes: ISize[];
    sizes_is_loading:boolean;

    tags: ITag[];
    tags_is_loading:boolean;
    
}

export const itemInfoReducer = reducer<IState>(
    {
        categories: [],
        categories_is_loading:false,
        collections:[],
        collections_is_loading:false,
        colors:[],
        colors_is_loading:false,
        sizes:[],
        sizes_is_loading:false,
        tags:[],
        tags_is_loading:false
    },
    on(getCategoriesSucceeded, (state, { payload }) => ({
        ...state,
        categories: payload,
        categories_is_loading: true
    })),
    on(createCategorySucceeded, (state, { payload }) => ({
        ...state,
        categories: [...state.categories , payload],
        categories_is_loading: true
    })),
    on(editCategorySucceeded, (state, { payload }) => {
        const oldData = state.categories.filter((SliderItem) => SliderItem._id !== payload._id);
        const newAbout = payload;
        return{
            ...state,
            categories: [...oldData, newAbout],
            categories_is_loading: true
        }
    }),
    on(deleteCategorySucceeded, (state, { payload }) => {
        const oldData = state.categories.filter((SliderItem) => SliderItem._id !== payload._id);
        return{
            ...state,
            categories: [...oldData],
            categories_is_loading: true
        }
    }),



    on(getCollectionsSucceeded, (state, { payload }) => ({
        ...state,
        collections: payload,
        collections_is_loading: true
    })),
    on(createCollectionSucceeded, (state, { payload }) => ({
        ...state,
        collections: [...state.collections , payload],
        collections_is_loading: true
    })),
    on(editCollectionSucceeded, (state, { payload }) => {
        const oldData = state.collections.filter((SliderItem) => SliderItem._id !== payload._id);
        const newAbout = payload;
        return{
            ...state,
            collections: [...oldData, newAbout],
            collections_is_loading: true
        }
    }),
    on(deleteCollectionSucceeded, (state, { payload }) => {
        const oldData = state.collections.filter((SliderItem) => SliderItem._id !== payload._id);
        return{
            ...state,
            collections: [...oldData],
            collections_is_loading: true
        }
    }),


    on(getColorsSucceeded, (state, { payload }) => ({
        ...state,
        colors: payload,
        colors_is_loading: true
    })),
    on(createColorSucceeded, (state, { payload }) => ({
        ...state,
        colors: [...state.colors , payload],
        colors_is_loading: true
    })),
    on(editColorSucceeded, (state, { payload }) => {
        const oldData = state.colors.filter((SliderItem) => SliderItem._id !== payload._id);
        const newAbout = payload;
        return{
            ...state,
            colors: [...oldData, newAbout],
            colors_is_loading: true
        }
    }),
    on(deleteColorSucceeded, (state, { payload }) => {
        const oldData = state.colors.filter((SliderItem) => SliderItem._id !== payload._id);
        return{
            ...state,
            colors: [...oldData],
            colors_is_loading: true
        }
    }),


    on(getSizesSucceeded, (state, { payload }) => ({
        ...state,
        sizes: payload,
        sizes_is_loading: true
    })),
    on(createSizeSucceeded, (state, { payload }) => ({
        ...state,
        sizes: [...state.sizes , payload],
        sizes_is_loading: true
    })),
    on(editSizeSucceeded, (state, { payload }) => {
        const oldData = state.sizes.filter((SliderItem) => SliderItem._id !== payload._id);
        const newAbout = payload;
        return{
            ...state,
            sizes: [...oldData, newAbout],
            sizes_is_loading: true
        }
    }),
    on(deleteSizeSucceeded, (state, { payload }) => {
        const oldData = state.sizes.filter((SliderItem) => SliderItem._id !== payload._id);
        return{
            ...state,
            sizes: [...oldData],
            sizes_is_loading: true
        }
    }),



    on(getTagsSucceeded, (state, { payload }) => ({
        ...state,
        tags: payload,
        tags_is_loading: true
    })),
    on(createTagSucceeded, (state, { payload }) => ({
        ...state,
        tags: [...state.tags , payload],
        tags_is_loading: true
    })),
    on(editTagSucceeded, (state, { payload }) => {
        const oldData = state.tags.filter((SliderItem) => SliderItem._id !== payload._id);
        const newAbout = payload;
        return{
            ...state,
            tags: [...oldData, newAbout],
            tags_is_loading: true
        }
    }),
    on(deleteTagSucceeded, (state, { payload }) => {
        const oldData = state.tags.filter((SliderItem) => SliderItem._id !== payload._id);
        return{
            ...state,
            tags: [...oldData],
            tags_is_loading: true
        }
    }),
)