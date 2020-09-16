import {action , payload} from 'ts-action';
import { getContactsAction, createContactAction  , deleteContactAction} from '.';
import { IContactMessage } from '../../lib/index';

export const getContacts = action(getContactsAction.requested);
export const getContactsSucceeded = action(getContactsAction.fulfilled , payload<IContactMessage[]>());
export const getContactsFailed = action(getContactsAction.rejected, payload<Error>());


export const createContact = action(createContactAction.requested, payload<IContactMessage>());
export const createContactSucceeded = action(createContactAction.fulfilled , payload<IContactMessage>());
export const createContactFailed = action(createContactAction.rejected, payload<Error>());

export const deleteContact = action(deleteContactAction.requested, payload<string>());
export const deleteContactSucceeded = action(deleteContactAction.fulfilled , payload<IContactMessage>());
export const deleteContactFailed = action(deleteContactAction.rejected, payload<Error>());