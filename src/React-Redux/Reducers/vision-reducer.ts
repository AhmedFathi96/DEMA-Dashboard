import { reducer, on } from "ts-action";
import { getVisionSucceeded , createVisionSucceeded  , editVisionSucceeded, deleteVisionSucceeded} from "../Actions/vision-action";
import { IVision } from "../../lib/index";

interface IState{
    Vision: IVision[];
    Vision_is_loading:boolean
    
}

export const visionsReducer = reducer<IState>(
    {
        Vision: [],
        Vision_is_loading:false
    },
    on(getVisionSucceeded, (state, { payload }) => ({
        ...state,
        Vision: payload,
        Vision_is_loading:true
    })),
    on(createVisionSucceeded, (state, { payload }) => ({
        ...state,
        Vision: [...state.Vision , payload],
        Vision_is_loading:true
    })),
    on(editVisionSucceeded, (state, { payload }) => {
        const oldData = state.Vision.filter((SliderItem) => SliderItem._id !== payload._id);
        const newVision = payload;
        return{
            ...state,
            Vision: [...oldData, newVision],
            Vision_is_loading:true
        }
    }),
    on(deleteVisionSucceeded, (state, { payload }) => {
        const oldData = state.Vision.filter((SliderItem) => SliderItem._id !== payload._id);
        return{
            ...state,
            Vision: [...oldData],
            Vision_is_loading:true
        }
    }),
    // on(editVisionucceeded, (state, { payload }) => ({
    //     ...state,
    //     Vision: [...state.Vision , payload]
    // })),
    
)