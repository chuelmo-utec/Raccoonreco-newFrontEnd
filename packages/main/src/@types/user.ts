export type IUserRole = "Admin" | "User" | "Guest";

export type IUser = {
    id: number;
    email: string;
    name: string;
    rol: IUserRole;
};

export type IUserForm = {
    id?: number;
    email: string;
    name: string;
    password: string;
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

export type IUserPasswordForm = {
    newPassword: string;
    oldPassword: string;
};
