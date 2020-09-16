import { reducer, on } from "ts-action";
import { getGroupsSucceeded , createGroupSucceeded  , editGroupSucceeded, deleteGroupSucceeded} from "../Actions/group-action";
import { IGroup } from "../../lib/index";

interface IState{
    Group: IGroup[];
    Group_is_loading:boolean
    
}

export const groupReducer = reducer<IState>(
    {
        Group: [],
        Group_is_loading:false
    },
    on(getGroupsSucceeded, (state, { payload }) => ({
        ...state,
        Group: payload,
        Group_is_loading:true
    })),
    on(createGroupSucceeded, (state, { payload }) => ({
        ...state,
        Group: [...state.Group , payload],
        Group_is_loading:true
    })),
    on(editGroupSucceeded, (state, { payload }) => {
        const oldData = state.Group.filter((SliderItem) => SliderItem._id !== payload._id);
        const newGroup = payload;
        return{
            ...state,
            Group: [...oldData, newGroup],
            Group_is_loading:true
        }
    }),
    on(deleteGroupSucceeded, (state, { payload }) => {
        const oldData = state.Group.filter((SliderItem) => SliderItem._id !== payload._id);
        return{
            ...state,
            Group: [...oldData],
            Group_is_loading:true
        }
    }),
    // on(editGroupucceeded, (state, { payload }) => ({
    //     ...state,
    //     Group: [...state.Group , payload]
    // })),
    
)