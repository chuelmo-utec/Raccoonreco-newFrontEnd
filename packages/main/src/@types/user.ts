export type IUserRole = "Admin" | "User";

export type IUser = {
    id: number;
    email: string;
    name: string;
    rol: IUserRole;
};

export type IUserLogin = {
    email: string;
    password: string;
};

export type IUserLoginData = {
    access_token: string;
    refresh_token: string;
    msg: string;
};

export type IAuth = {
    access_token: string;
    refresh_token: string;
};
