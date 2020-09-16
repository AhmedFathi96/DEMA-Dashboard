export interface ILoginInfo{
    email: string;
    password: string;
}

export interface IAdmin{
    name: string;
    email: string;
    password: string;
    role:string;
    _id:string;
}

export interface IGrade{
    name: string;
    _id:string;

}
export interface ITeacher{
    name: string;
    email: string;
    password: string;
    subject:string;
    grade: IGrade[];
    _id:string;
}