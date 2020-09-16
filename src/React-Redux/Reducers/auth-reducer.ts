import { reducer, on } from "ts-action";
import { loginSucceeded } from "../Actions/login-action";
import { logoutSucceeded } from "../Actions/logout-action";

interface IState{
    token: string;
    is_logging: boolean; 
    
}

export const authReducer = reducer<IState>(
    {
        token: '',
        is_logging: false
    },
    on(loginSucceeded, (state, { payload }) => ({
        ...state,
        token: payload,
        is_logging: true
    })),
    on(logoutSucceeded, (state) => ({
        ...state,
        token: '',
        is_logging: false
    })),
)