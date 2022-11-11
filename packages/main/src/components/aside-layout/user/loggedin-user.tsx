import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Key, LogOut } from "react-feather";
import { Heading, Text, Nav, NavLink } from "@doar/components";
import {
    StyledLoggedInUser,
    StyledUserBtn,
    StyledUserCollapse,
    StyledUserData,
} from "./style";
import {
    logout,
    selectAuth,
    selectCurrentUser,
} from "../../../redux/slices/auth";
import useUserLogout from "../../../hooks/users/useUserLogout";
import { IAuth } from "../../../@types/user";

interface IProps {
    onClickChangePassword: () => void;
}

const LoggedinUser = ({ onClickChangePassword }: IProps) => {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);
    const auth = useSelector(selectAuth) as IAuth;
    const logoutMutation = useUserLogout();

    const logoutUser = () => {
        logoutMutation.mutate(
            {
                access_token: auth.access_token,
                refresh_token: auth.refresh_token,
            },
            {
                onSuccess: () => {
                    dispatch(logout());
                    window.location.replace("/");
                },
            }
        );
    };

    return (
        <StyledLoggedInUser className="aside-loggedin-user">
            <StyledUserData className="aside-loggedin-user-data">
                <StyledUserBtn
                    type="button"
                    onClick={() => setShow((prev) => !prev)}
                >
                    <Heading fontWeight={600} mb="0px">
                        {user && user.name}
                    </Heading>
                    <ChevronDown size={16} strokeWidth="2.3px" />
                </StyledUserBtn>
                <Text color="text3" fontSize="12px">
                    {user && user.rol}
                </Text>
            </StyledUserData>

            <StyledUserCollapse
                className="aside-loggedin-user-nav"
                $show={show}
            >
                <Nav vertical customStyle="aside">
                    <NavLink path="#!" onClick={onClickChangePassword}>
                        <Key /> <span>Cambiar contraseña</span>
                    </NavLink>
                    <NavLink path="#!" onClick={logoutUser}>
                        <LogOut /> <span>Salir</span>
                    </NavLink>
                </Nav>
            </StyledUserCollapse>
        </StyledLoggedInUser>
    );
};

export default LoggedinUser;
