import { reducer, on } from "ts-action";
import { getInfoSucceeded  , editInfoSucceeded, } from "../Actions/info-action";
import { IInfo } from "../../lib/index";

interface IState{
    Info: IInfo;
    info_is_loading:boolean
    
}

export const infoReducer = reducer<IState>(
    {
        Info: {
            _id: '',
            arabic_address:'',
            arabic_submitting_message:'',
            email:'',
            english_address:'',
            english_submitting_message:'',
            facebook_url:'',
            instagram_url:'',
            latitude:'',
            longitude:'',
            phone:'',
            twitter_url:'',
            whatsapp_number:'',
        },
        info_is_loading:false
    },
    on(getInfoSucceeded, (state, { payload }) => ({
        ...state,
        Info: payload,
        info_is_loading:true
    })),

    on(editInfoSucceeded, (state, { payload }) => {
        const oldData = state.Info;
        const newsInfo = payload;
        return{
            ...state,
            Info: {
                ...oldData, ...newsInfo
            },
            info_is_loading:true
        }
    }),
    
    
)