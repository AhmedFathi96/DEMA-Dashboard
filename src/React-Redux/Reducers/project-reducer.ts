import { reducer, on } from "ts-action";
import { getProjectSucceeded , createProjectSucceeded  , editProjectSucceeded, deleteProjectSucceeded} from "../Actions/projects-action";
import { IProject } from "../../lib/index";

interface IState{
    Project: IProject[];
    project_is_loading:boolean
    
}

export const projectsReducer = reducer<IState>(
    {
        Project: [],
        project_is_loading:false
    },
    on(getProjectSucceeded, (state, { payload }) => ({
        ...state,
        Project: payload,
        project_is_loading:true
    })),
    on(createProjectSucceeded, (state, { payload }) => ({
        ...state,
        Project: [...state.Project , payload],
        project_is_loading:true
    })),
    on(editProjectSucceeded, (state, { payload }) => {
        const oldData = state.Project.filter((SliderItem) => SliderItem._id !== payload._id);
        const newProject = payload;
        return{
            ...state,
            Project: [...oldData, newProject],
            project_is_loading:true
        }
    }),
    on(deleteProjectSucceeded, (state, { payload }) => {
        const oldData = state.Project.filter((SliderItem) => SliderItem._id !== payload._id);
        return{
            ...state,
            Project: [...oldData],
            project_is_loading:true
        }
    }),
    // on(editProjectucceeded, (state, { payload }) => ({
    //     ...state,
    //     Project: [...state.Project , payload]
    // })),
    
)