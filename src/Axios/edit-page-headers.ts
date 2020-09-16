import axios from 'axios';
import * as Requests from './urls'

export const editHighlightsAPI = (token:string , data: FormData , id:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.put(Requests.editHighlightsURL(id) , data, 
    {
        headers,
    });
}

// export const editCoursesAPI = (token:string , data: FormData , id:string) =>{
//     const headers = { Authorization: `Bearer ${token}` };
//     return axios.put(Requests.editCoursesURL(id) , data, 
//     {
//         headers,
//     });
// }


export const editBlogAPI = (token:string , data: FormData , id:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.put(Requests.editBlogURL(id) , data, 
    {
        headers,
    });
}

export const editContactAPI = (token:string , data: FormData , id:string) =>{
    const headers = { Authorization: `Bearer ${token}` };
    return axios.put(Requests.editContactURL(id) , data, 
    {
        headers,
    });
}

// export const editTestimonialsAPI = (token:string , data: FormData , id:string) =>{
//     const headers = { Authorization: `Bearer ${token}` };
//     return axios.put(Requests.editTestimonialsURL(id) , data, 
//     {
//         headers,
//     });
// }

