import { reducer, on } from "ts-action";
import { getFeaturesSucceeded , createFeatureSucceeded , deleteFeatureSucceeded} from "../Actions/features-action";
import { IFeature } from "../../lib/index";

interface IState{
    Features: IFeature[];
    Features_is_loading:boolean
}

export const featuresReducer = reducer<IState>(
    {
        Features: [],
        Features_is_loading:false
    },
    on(getFeaturesSucceeded, (state, { payload }) => ({
        ...state,
        Features: payload,
        Features_is_loading:true
    })),
    on(createFeatureSucceeded, (state, { payload }) => ({
        ...state,
        Features: [...state.Features , payload],
        Features_is_loading:true
    })),
    on(deleteFeatureSucceeded, (state, { payload }) => {
        const oldData = state.Features.filter((Course) => Course._id !== payload._id);
        return{
            ...state,
            Features: [...oldData],
            Features_is_loading:true
        }
    }),
    // on(editFeaturesucceeded, (state, { payload }) => ({
    //     ...state,
    //     Features: [...state.Features , payload]
    // })),
    
)