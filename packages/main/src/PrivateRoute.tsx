import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
    selectAuth,
    selectCurrentUser,
    selectIsAuthenticated,
} from "./redux/slices/auth";
import { IUserRole } from "./@types/user";
import AccessDenied from "./pages/error-401";
import useSessionStatus from "./hooks/users/useSessionStatus";
import Preloader from "./components/preloader";

interface Props {
    component: React.ComponentType;
    path?: string;
    roles?: IUserRole[];
}

export const PrivateRoute: React.FC<Props> = ({
    component: RouteComponent,
    roles,
}) => {
    const auth = useSelector(selectAuth);
    const user = useSelector(selectCurrentUser);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const hasPermission = user && roles?.includes(user.rol);
    const { data, isLoading } = useSessionStatus({
        refreshToken: auth?.refresh_token ?? "",
        queryOptions: {
            enabled: true,
        },
    });

    if (isLoading) {
        return <Preloader />;
    }

    if (!isLoading && data?.alive === true) {
        if (isAuthenticated && hasPermission) {
            return <RouteComponent />;
        }

        if (isAuthenticated && !hasPermission) {
            return <AccessDenied />;
        }
    }

    return <Navigate to="/" />;
};
