import { reducer, on } from "ts-action";
import { getTeamsSucceeded , createTeamSucceeded  , editTeamSucceeded, deleteTeamSucceeded} from "../Actions/team-action";
import { ITeam } from "../../lib/index";

interface IState{
    Team: ITeam[];
    Team_is_loading:boolean
    
}

export const TeamReducer = reducer<IState>(
    {
        Team: [],
        Team_is_loading:false
    },
    on(getTeamsSucceeded, (state, { payload }) => ({
        ...state,
        Team: payload,
        Team_is_loading:true
    })),
    on(createTeamSucceeded, (state, { payload }) => ({
        ...state,
        Team: [...state.Team , payload],
        Team_is_loading:true
    })),
    on(editTeamSucceeded, (state, { payload }) => {
        const oldData = state.Team.filter((SliderItem) => SliderItem._id !== payload._id);
        const newTeam = payload;
        return{
            ...state,
            Team: [...oldData, newTeam],
            Team_is_loading:true
        }
    }),
    on(deleteTeamSucceeded, (state, { payload }) => {
        const oldData = state.Team.filter((SliderItem) => SliderItem._id !== payload._id);
        return{
            ...state,
            Team: [...oldData],
            Team_is_loading:true
        }
    }),
    // on(editTeamucceeded, (state, { payload }) => ({
    //     ...state,
    //     Team: [...state.Team , payload]
    // })),
    
)