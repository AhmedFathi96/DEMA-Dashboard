import { reducer, on } from "ts-action";
import { loginSucceeded } from "../Actions/login-action";
import { logoutSucceeded } from "../Actions/logout-action";

interface IState{
    token: string;
    role: string;
    is_logging: boolean; 
    
}

export const authReducer = reducer<IState>(
    {
        token: '',
        is_logging: false,
        role:''
    },
    on(loginSucceeded, (state, { payload }) => ({
        ...state,
        token: payload.token,
        role: payload.role,
        is_logging: true
    })),
    on(logoutSucceeded, (state) => ({
        ...state,
        token: '',
        role:'',
        is_logging: false
    })),
)