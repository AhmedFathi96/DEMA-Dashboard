import { reducer, on } from "ts-action";
import { getValuesSucceeded , createValueSucceeded  , editValueSucceeded, deleteValueSucceeded} from "../Actions/values-action";
import { IValue } from "../../lib/index";

interface IState{
    Value: IValue[];
    Value_is_loading:boolean
    
}

export const valueReducer = reducer<IState>(
    {
        Value: [],
        Value_is_loading:false
    },
    on(getValuesSucceeded, (state, { payload }) => ({
        ...state,
        Value: payload,
        Value_is_loading:true
    })),
    on(createValueSucceeded, (state, { payload }) => ({
        ...state,
        Value: [...state.Value , payload],
        Value_is_loading:true
    })),
    on(editValueSucceeded, (state, { payload }) => {
        const oldData = state.Value.filter((SliderItem) => SliderItem._id !== payload._id);
        const newValue = payload;
        return{
            ...state,
            Value: [...oldData, newValue],
            Value_is_loading:true
        }
    }),
    on(deleteValueSucceeded, (state, { payload }) => {
        const oldData = state.Value.filter((SliderItem) => SliderItem._id !== payload._id);
        return{
            ...state,
            Value: [...oldData],
            Value_is_loading:true
        }
    }),
    // on(editValueucceeded, (state, { payload }) => ({
    //     ...state,
    //     Value: [...state.Value , payload]
    // })),
    
)