export interface IAdminUser{
    _id?:string;
    name:string;
    email:string;
    phone:string;
    password:string;
    role:string;
}


export interface ISliderItem{
    _id?:string;
    slider_img?:File;
    header: string;
    sub_header:string;
    content: string;
    order:string;
}


export interface IProject{
    _id:string;
    project_image?:File;
    english_header: string;
    arabic_header: string;
    english_sub_header:string;
    arabic_sub_header: string;
    order:string;
}

export interface IAboutSection{
    _id?:string;
    header: string;
    sub_header: string;
    content: string;
    mission: string;
    mission_content: string;
    vision: string;
    vision_content: string;
    goal: string;
    goal_content:string;
    
}


export interface ITestimonialSection{
    _id:string;
    testimonial_img:File;
    content:string;
    author:string;
    about_author:string;
    order:string;
}


export interface IGalleryImage{
    _id:string;
    gallery_img?:File;
    english_header: string;
    arabic_header: string;
    order:string;
}

export interface IBlogPost{
    _id:string;
    blog_cover_img:string;
    blog_post_img:string;
    post_content:string;
    header:string;
    content_body:string;
    createdAt?:string;
}

export interface IContactMessage{
    _id?:string;
    name:string;
    email:string;
    phone:string;
    message:string;
    createdAt?:string;
}

export interface IFeature{
    _id?:string;
    feature_img?:File;
    english_header: string;
    arabic_header: string;
    english_sub_header:string;
    arabic_sub_header: string;
    order:string
}

export interface IGenericHeader{
    header_image:string;
    header:string;
    text:string;
}

export interface IPageHeaders{
    _id:string;
    highlights_header:string;
    highlights_text:string;
    courses_header:string;
    courses_text:string;
    blog_header:string;
    blog_text:string;
    contact_header:string;
    contact_text:string;
    testimonial_header:string;
    testimonial_text:string;
}

export interface IInfo{
    _id:string;
    contact_img?: File,
    whoAreWe_english_header:string,
    whoAreWe_arabic_header:string,

    vision_english_header:string,
    vision_arabic_header:string,
    history_english_header:string,
    history_arabic_header:string,
    values_english_header:string,
    values_arabic_header:string,
    gallery_english_header:string,
    gallery_arabic_header:string,
    projects_english_header:string,
    projects_arabic_header:string,
    group_english_header:string,
    group_arabic_header:string,
    group_english_sub_header:string,
    group_arabic_sub_header:string,
    group_english_content:string,
    group_arabic_content:string,
    companies_english_header:string,
    companies_arabic_header:string,
    contact_english_header:string,
    contact_arabic_header:string,
    contact_english_sub_header:string,
    contact_arabic_sub_header:string,
    english_address:string,
    arabic_address:string,
    email:string,
    phone:string,
    arabic_submitting_message:string,
    english_submitting_message:string,
    facebook_url:string,
    youtube_url:string,
    twitter_url:string,
    instagram_url:string,
    whatsapp_number:string,
    footer_copyrights:string,
}



export interface IStatistic{
    _id?:string;
    statistic_img?:File;
    header: string;
    
    english_sub_header:string;
    arabic_sub_header:string;

    order:string
}


export interface IValue{
    _id?:string;
    english_header: string;
    arabic_header: string;
    english_sub_header:string;
    arabic_sub_header:string;
    order:string
}
export interface IGroup{
    _id?:string;
    english_header: string;
    arabic_header: string;
    english_sub_header:string;
    arabic_sub_header:string;
    order:string
}

export interface ICreateValue{
    english_header: string;
    arabic_header: string;
    english_sub_header:string;
    arabic_sub_header:string;
    order:string
}

export interface IHistory{
    _id?:string;
    english_date: string;
    arabic_date: string;
    english_content:string;
    arabic_content:string;
    order:string
}



export interface IVision{
    _id:string;
    project_image?:File;
    english_header: string;
    arabic_header: string;
    english_sub_header:string;
    arabic_sub_header: string;
    order:string;
}