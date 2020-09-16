import { reducer, on } from "ts-action";
import { getSliderItemsSucceeded , createSliderItemSucceeded  , editSliderItemSucceeded, deleteSliderItemSucceeded} from "../Actions/slider-action";
import { ISliderItem } from "../../lib/index";

interface IState{
    SliderItems: ISliderItem[];
    slider_is_loading:boolean
    
}

export const sliderItemsReducer = reducer<IState>(
    {
        SliderItems: [],
        slider_is_loading:false
    },
    on(getSliderItemsSucceeded, (state, { payload }) => ({
        ...state,
        SliderItems: payload,
        slider_is_loading:true
    })),
    on(createSliderItemSucceeded, (state, { payload }) => ({
        ...state,
        SliderItems: [...state.SliderItems , payload],
        slider_is_loading:true
    })),
    on(editSliderItemSucceeded, (state, { payload }) => {
        const oldData = state.SliderItems.filter((SliderItem) => SliderItem._id !== payload._id);
        const newSliderItems = payload;
        return{
            ...state,
            SliderItems: [...oldData, newSliderItems],
            slider_is_loading:true
        }
    }),
    on(deleteSliderItemSucceeded, (state, { payload }) => {
        const oldData = state.SliderItems.filter((SliderItem) => SliderItem._id !== payload._id);
        return{
            ...state,
            SliderItems: [...oldData],
            slider_is_loading:true
        }
    }),
    // on(editSliderItemSucceeded, (state, { payload }) => ({
    //     ...state,
    //     SliderItems: [...state.SliderItems , payload]
    // })),
    
)