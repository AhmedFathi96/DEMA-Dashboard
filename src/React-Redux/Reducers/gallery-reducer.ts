import { reducer, on } from "ts-action";
import { getGalleryImageSucceeded , createGalleryImageSucceeded  , editGalleryImageSucceeded, deleteGalleryImageSucceeded} from "../Actions/gallery-action";
import { IGalleryImage } from "../../lib/index";

interface IState{
    GalleryImages: IGalleryImage[];
    gallery_is_loading:boolean
}

export const galleryImagesReducer = reducer<IState>(
    {
        GalleryImages: [],
        gallery_is_loading:false
    },
    on(getGalleryImageSucceeded, (state, { payload }) => ({
        ...state,
        GalleryImages: payload,
        gallery_is_loading:true
    })),
    on(createGalleryImageSucceeded, (state, { payload }) => ({
        ...state,
        GalleryImages: [...state.GalleryImages , payload],
        gallery_is_loading:true
    })),
    on(editGalleryImageSucceeded, (state, { payload }) => {
        const oldData = state.GalleryImages.filter((date) => date._id !== payload._id);
        const newGalleryImage = payload;
     
        return{
            ...state,
            GalleryImages: [...oldData, newGalleryImage],
            gallery_is_loading:true
        }
    }),
    on(deleteGalleryImageSucceeded, (state, { payload }) => {
        const oldData = state.GalleryImages.filter((SliderItems) => SliderItems._id !== payload._id);
        return{
            ...state,
            GalleryImages: [...oldData],
            gallery_is_loading:true
        }
    }),
    // on(editGalleryImageucceeded, (state, { payload }) => ({
    //     ...state,
    //     GalleryImage: [...state.GalleryImage , payload]
    // })),
    
)