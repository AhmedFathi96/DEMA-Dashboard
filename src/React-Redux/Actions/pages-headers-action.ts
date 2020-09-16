import {action , payload} from 'ts-action';
import { getPagesHeadersAction , editHighlightsPageHeaderAction ,editBlogPageHeaderAction,
    editContactsPageHeaderAction,editTestimonialPageHeaderAction} from '.';
import { IPageHeaders, IGenericHeader } from '../../lib/index';

export const getPagesHeaders = action(getPagesHeadersAction.requested);
export const getPagesHeadersSucceeded = action(getPagesHeadersAction.fulfilled , payload<IPageHeaders>());
export const getPagesHeadersFailed = action(getPagesHeadersAction.rejected, payload<Error>());

export const editHighlightsPageHeader = action(editHighlightsPageHeaderAction.requested, payload<{data:FormData , id: string}>());
export const editHighlightsPageHeaderSucceeded = action(editHighlightsPageHeaderAction.fulfilled , payload<IGenericHeader>());
export const editHighlightsPageHeaderFailed = action(editHighlightsPageHeaderAction.rejected, payload<Error>());

export const editBlogPageHeader = action(editBlogPageHeaderAction.requested, payload<{data:FormData , id: string}>());
export const editBlogPageHeaderSucceeded = action(editBlogPageHeaderAction.fulfilled , payload<IGenericHeader>());
export const editBlogPageHeaderFailed = action(editBlogPageHeaderAction.rejected, payload<Error>());


// export const editCoursesPageHeader = action(editCoursesPageHeaderAction.requested, payload<{data:FormData , id: string}>());
// export const editCoursesPageHeaderSucceeded = action(editCoursesPageHeaderAction.fulfilled , payload<IGenericHeader>());
// export const editCoursesPageHeaderFailed = action(editCoursesPageHeaderAction.rejected, payload<Error>());


export const editContactsPageHeader = action(editContactsPageHeaderAction.requested, payload<{data:FormData , id: string}>());
export const editContactsPageHeaderSucceeded = action(editContactsPageHeaderAction.fulfilled , payload<IGenericHeader>());
export const editContactsPageHeaderFailed = action(editContactsPageHeaderAction.rejected, payload<Error>());


export const editTestimonialPageHeader = action(editTestimonialPageHeaderAction.requested, payload<{data:FormData , id: string}>());
export const editTestimonialPageHeaderSucceeded = action(editTestimonialPageHeaderAction.fulfilled , payload<IGenericHeader>());
export const editTestimonialPageHeaderFailed = action(editTestimonialPageHeaderAction.rejected, payload<Error>());
