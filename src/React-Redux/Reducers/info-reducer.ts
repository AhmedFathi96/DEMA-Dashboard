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
            companies_arabic_header:'',
            companies_english_header:'',
            contact_arabic_header:'',
            contact_arabic_sub_header:'',
            contact_english_header:'',
            contact_english_sub_header:'',
            email:'',
            english_address:'',
            english_submitting_message:'',
            facebook_url:'',
            footer_copyrights:'',
            gallery_arabic_header:'',
            gallery_english_header:'',
            group_arabic_content:'',
            group_arabic_header:'',
            group_arabic_sub_header:'',
            group_english_content:'',
            group_english_header:'',
            group_english_sub_header:'',
            history_arabic_header:'',
            history_english_header:'',
            instagram_url:'',
            phone:'',
            projects_arabic_header:'',
            projects_english_header:'',
            twitter_url:'',
            values_arabic_header:'',
            values_english_header:'',
            vision_arabic_header:'',
            vision_english_header:'',
            whatsapp_number:'',
            whoAreWe_arabic_header:'',
            whoAreWe_english_header:'',
            youtube_url:'',
    
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