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
    english_header: string;
    arabic_header: string;

    english_sub_header:string;
    arabic_sub_header:string;

    arabic_content?: string;
    english_content?: string;

    order:string;
    sale?:string;
}

export interface ITeam{
    _id?:string;
    team_img?:File;
    english_name: string;
    arabic_name: string;
    english_job: string;
    arabic_job: string;
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
    english_header: string;
    english_sub_header: string;
    english_content: string;
    english_mission: string;
    english_mission_content: string;
    english_vision: string;
    english_vision_content: string;
    english_goal: string;
    english_goal_content:string;

    arabic_header: string;
    arabic_sub_header: string;
    arabic_content: string;
    arabic_mission: string;
    arabic_mission_content: string;
    arabic_vision: string;
    arabic_vision_content: string;
    arabic_goal: string;
    arabic_goal_content:string;
    
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
    _id?:string;
    email:string;
    phone:string;
    latitude:string;
    longitude:string;
    arabic_submitting_message:string;
    english_submitting_message:string;
    arabic_address:string;
    english_address:string;
    facebook_url:string;
    twitter_url:string;
    instagram_url:string;
    whatsapp_number:string;
}



export interface IStatistic{
    _id?:string;
    statistic_img?:File;
    count: string;
    arabic_desc:string;
    english_desc:string;
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

export interface ICategory{
    _id?:string;
    category_img?:File,
    english_name:string;
    arabic_name:string;
    starting_price:string;
}
export interface ICollection{
    _id?:string;
    category_img?:File,
    english_name:string;
    arabic_name:string;
    english_sub_header:string;
    arabic_sub_header:string;
}
export interface IName{
    english_name:string;
    arabic_name:string;
}
export interface IColor{
    _id?:string;
    english_name:string;
    arabic_name:string;
    value:string;
}

export interface IBadge{
    _id?:string;
    english_name:string;
    arabic_name:string;
}

export interface ISize{
    _id?:string;
    name:string;
}
export interface ITag{
    _id?:string;
    english_name:string;
    arabic_name:string;
}
export interface IProductAdditionalInfo{
    _id?:string,
    english_name:string,
    arabic_name:string,
    content:string,
    item?:string
}

export interface ICreateProduct{
    _id?:string,
    arabic_name:string,
    english_name:string,
    arabic_mini_description:string,
    english_mini_description:string,
    price_before_discount:string,
    price_after_discount:string,
    discount_percentage:string,
    color: string[],
    size: string[],
    collections: string[],
    category: string[],
    tag: string[],
    status:string,
    badge: string[]
}

export interface IProduct{
    _id?:string,
    arabic_name:string,
    english_name:string,
    arabic_mini_description:string,
    english_mini_description:string,
    price_before_discount:string,
    price_after_discount:string,
    discount_percentage:string,
    color?: IColor[],
    size?: ISize[],
    collections?: ICollection[],
    category?: ICategory[],
    tag?: ITag[],
    badge?: IBadge[],
    status:string,
    productAdditionalInfo:IProductAdditionalInfo[];
}