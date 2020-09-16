import { reducer, on } from "ts-action";
import { getStatisticsSucceeded , createStatisticSucceeded  , editStatisticSucceeded, deleteStatisticSucceeded} from "../Actions/statistic-action";
import { IStatistic } from "../../lib/index";

interface IState{
    Statistic: IStatistic[];
    Statistic_is_loading:boolean
    
}

export const statisticReducer = reducer<IState>(
    {
        Statistic: [],
        Statistic_is_loading:false
    },
    on(getStatisticsSucceeded, (state, { payload }) => ({
        ...state,
        Statistic: payload,
        Statistic_is_loading:true
    })),
    on(createStatisticSucceeded, (state, { payload }) => ({
        ...state,
        Statistic: [...state.Statistic , payload],
        Statistic_is_loading:true
    })),
    on(editStatisticSucceeded, (state, { payload }) => {
        const oldData = state.Statistic.filter((SliderItem) => SliderItem._id !== payload._id);
        const newStatistic = payload;
        return{
            ...state,
            Statistic: [...oldData, newStatistic],
            Statistic_is_loading:true
        }
    }),
    on(deleteStatisticSucceeded, (state, { payload }) => {
        const oldData = state.Statistic.filter((SliderItem) => SliderItem._id !== payload._id);
        return{
            ...state,
            Statistic: [...oldData],
            Statistic_is_loading:true
        }
    }),
    // on(editStatisticucceeded, (state, { payload }) => ({
    //     ...state,
    //     Statistic: [...state.Statistic , payload]
    // })),
    
)