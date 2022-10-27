/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuth, IUser } from "../../@types/user";
import { RootState } from "../store";

export interface IAuthState {
    user: IUser | null;
    auth: IAuth | null;
    isAuthenticated: boolean;
}

const initialState: IAuthState = {
    user: null,
    auth: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action: PayloadAction<{ user: IUser }>) {
            const {
                payload: { user },
            } = action;

            state.user = user;
            state.isAuthenticated = true;
        },
        setToken(state, action: PayloadAction<{ auth: IAuth }>) {
            const {
                payload: { auth },
            } = action;

            state.auth = auth;
        },
        logout(state) {
            state.auth = null;
            state.user = null;
            state.isAuthenticated = false;
        },
    },
});

export const { login, setToken, logout } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectAuth = (state: RootState) => state.auth.auth;
export const selectIsAuthenticated = (state: RootState) =>
    state.auth.isAuthenticated;
