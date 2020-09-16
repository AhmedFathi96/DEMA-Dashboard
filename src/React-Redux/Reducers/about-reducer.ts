import { reducer, on } from "ts-action";
import { getAboutSucceeded , createAboutSucceeded  , editAboutSucceeded, deleteAboutSucceeded} from "../Actions/about-action";
import { IAboutSection } from "../../lib/index";

interface IState{
    About: IAboutSection[];
    about_is_loading:boolean
    
}

export const aboutReducer = reducer<IState>(
    {
        About: [],
        about_is_loading:false
    },
    on(getAboutSucceeded, (state, { payload }) => ({
        ...state,
        About: payload,
        about_is_loading: true
    })),
    on(createAboutSucceeded, (state, { payload }) => ({
        ...state,
        About: [...state.About , payload],
        about_is_loading: true
    })),
    on(editAboutSucceeded, (state, { payload }) => {
        const oldData = state.About.filter((SliderItem) => SliderItem._id !== payload._id);
        const newAbout = payload;
        return{
            ...state,
            About: [...oldData, newAbout],
            about_is_loading: true
        }
    }),
    on(deleteAboutSucceeded, (state, { payload }) => {
        const oldData = state.About.filter((SliderItem) => SliderItem._id !== payload._id);
        return{
            ...state,
            About: [...oldData],
            about_is_loading: true
        }
    }),
)