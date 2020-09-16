import { reducer, on } from "ts-action";
import { getAdminsSucceeded , createAdminSucceeded , editAdminSucceeded, deleteAdminSucceeded} from "../Actions/admin-action";
import { IAdminUser } from "../../lib/index";

interface IState{
    admins: IAdminUser[];
    is_loading:boolean;
    admins_has_error:boolean
}

export const adminsReducer = reducer<IState>(
    {
        admins: [],
        is_loading:false,
        admins_has_error:false

    },

    on(getAdminsSucceeded, (state, { payload }) => ({
        ...state,
        admins: payload,
        is_loading:true
    })),
    on(createAdminSucceeded, (state, { payload }) => ({
        ...state,
        admins: [...state.admins , payload],
        is_loading:true
    })),
    on(editAdminSucceeded, (state, { payload }) => {
        const oldData = state.admins.filter((admin) => admin._id !== payload._id);
        const newAdmins = payload;
        return{
            ...state,
            admins: [...oldData, newAdmins],
            is_loading:true
        }
    }),
    on(deleteAdminSucceeded, (state, { payload }) => {
        const oldData = state.admins.filter((admin) => admin._id !== payload._id);
        return{
            ...state,
            admins: [...oldData],
            is_loading:true
        }
    }),
    // on(editAdminSucceeded, (state, { payload }) => ({
    //     ...state,
    //     admins: [...state.admins , payload]
    // })),
    
)