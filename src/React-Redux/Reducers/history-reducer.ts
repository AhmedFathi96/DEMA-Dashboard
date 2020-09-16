import { reducer, on } from "ts-action";
import { getHistorySucceeded , createHistorySucceeded  , editHistorySucceeded, deleteHistorySucceeded} from "../Actions/history-action";
import { IHistory } from "../../lib/index";

interface IState{
    History: IHistory[];
    History_is_loading:boolean
    
}

export const historyReducer = reducer<IState>(
    {
        History: [],
        History_is_loading:false
    },
    on(getHistorySucceeded, (state, { payload }) => ({
        ...state,
        History: payload,
        History_is_loading:true
    })),
    on(createHistorySucceeded, (state, { payload }) => ({
        ...state,
        History: [...state.History , payload],
        History_is_loading:true
    })),
    on(editHistorySucceeded, (state, { payload }) => {
        const oldData = state.History.filter((SliderItem) => SliderItem._id !== payload._id);
        const newHistory = payload;
        return{
            ...state,
            History: [...oldData, newHistory],
            History_is_loading:true
        }
    }),
    on(deleteHistorySucceeded, (state, { payload }) => {
        const oldData = state.History.filter((SliderItem) => SliderItem._id !== payload._id);
        return{
            ...state,
            History: [...oldData],
            History_is_loading:true
        }
    }),
    // on(editHistoryucceeded, (state, { payload }) => ({
    //     ...state,
    //     History: [...state.History , payload]
    // })),
    
)