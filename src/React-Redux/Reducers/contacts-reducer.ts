import { reducer, on } from "ts-action";
import { getContactsSucceeded , createContactSucceeded , deleteContactSucceeded} from "../Actions/contact-action";
import { IContactMessage } from "../../lib/index";

interface IState{
    Contacts: IContactMessage[];
    contacts_is_loading:boolean
}

export const contactsReducer = reducer<IState>(
    {
        Contacts: [],
        contacts_is_loading: false
    },
    on(getContactsSucceeded, (state, { payload }) => ({
        ...state,
        Contacts: payload,
        contacts_is_loading:true
    })),
    on(createContactSucceeded, (state, { payload }) => ({
        ...state,
        Contacts: [...state.Contacts , payload],
        contacts_is_loading:true
    })),
    on(deleteContactSucceeded, (state, { payload }) => {
        const oldData = state.Contacts.filter((Contact) => Contact._id !== payload._id);
        return{
            ...state,
            Contacts: [...oldData],
            contacts_is_loading:true
        }
    }),
    // on(editContactSucceeded, (state, { payload }) => ({
    //     ...state,
    //     Contacts: [...state.Contacts , payload]
    // })),
    
)