import {combineReducers} from 'redux';
import { PersistConfig,persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import {authReducer} from './auth-reducer';
import {adminsReducer} from './admins-reducer';
import {sliderItemsReducer} from './slider-reducer';
import {aboutReducer} from './about-reducer';
import {statisticReducer} from './statistics-reducer';
import {galleryImagesReducer} from './gallery-reducer';
import {projectsReducer} from './project-reducer';
import {contactsReducer} from './contacts-reducer';
import {featuresReducer} from './features-reducer';
import {infoReducer} from './info-reducer';
import {valueReducer} from './values-reducer';
import {historyReducer} from './history-reducer';
import {visionsReducer} from './vision-reducer';
import {groupReducer} from './group-reducer';

const persistAuth: PersistConfig = {
    key: "authReducer",
    storage,
    blacklist: ["loadingStatus"]
};

export const rootReducer = combineReducers({
    authReducer: persistReducer(persistAuth, authReducer),
    adminsReducer,
    sliderItemsReducer,
    aboutReducer,
    statisticReducer,
    galleryImagesReducer,
    projectsReducer,
    contactsReducer,
    featuresReducer,
    valueReducer,
    infoReducer,
    historyReducer,
    visionsReducer,
    groupReducer
});

type rootReducer = typeof rootReducer;

type returnTypeInferrer<T> = T extends (state: any, action: any) => infer U
    ? U
    : never;
type rootState = returnTypeInferrer<rootReducer>;
export interface IRootReducerState extends rootState {}

export default rootReducer;



// export const saveToLocalStorage = (state:string) =>{
//     try{
//         const serializedState = JSON.stringify(state);
//         localStorage.setItem('token' , serializedState)
//     }catch(e){
//         console.log(e);
//     }
//     }
// }

// export const loadFromLocalStorage = () =>{
//     try{
//         const data = localStorage.getItem('token');
//         if(data === null)return undefined
//         return JSON.parse(data);
//     }catch(e){
//         console.log(e);
//     }
// }
