/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useState, useEffect, useRef } from "react";
import cn from "clsx";
import { NavbarAside } from "@doar/components";
import { asideMenuData } from "@doar/shared/data";
import { IMenu, ISize } from "@doar/shared/types";
import Header from "../header";
import { useSelector } from "react-redux";
import { selectAuth, selectCurrentUser } from "../../../redux/slices/auth";
import Scrollbar from "../../../components/scrollbar";
import AsideUser from "../../../components/aside-layout/user";
import { useWindowSize } from "../../../hooks";
import {
    StyledAside,
    StyledBody,
    StyledBodyInner,
    StyledBackdrop,
} from "./style";
import ChangePasswordModal from "../../../components/changepassword-modal/ChangePassword-Modal";
import { IAuth, IUser } from "../../../../src/@types/user";
import { Icon } from "react-feather";

type TMaxText = "enter" | "leave";

interface IProps {
    layout?: "minimize";
    sidebarLayout?: 1 | 2;
}

const Aisde = ({ layout, sidebarLayout }: IProps) => {
    const auth = useSelector(selectAuth) as IAuth;
    const currentUser = useSelector(selectCurrentUser) as IUser;
    const [minimize, setMinimize] = useState(layout === "minimize");
    const [maximize, setMaximize] = useState(false);
    const [show, setShow] = useState(false);
    const size: ISize = useWindowSize();
    const maximized = useRef(false);
    const mdMinimize = useRef(true);

    const menuData = asideMenuData
        .map((menu) => {
            return {
                ...menu,
                submenu: menu.submenu.filter((a) =>
                    a.Rol.includes(currentUser.rol)
                ),
            };
        })
        .filter((menu) => menu.Rol.includes(currentUser.rol));

    const minimizeHandler = () => {
        setMinimize((prev) => !prev);
    };

    const displayHandler = () => {
        setMinimize(false);
        setShow((prev) => !prev);
    };

    useEffect(() => {
        if (!size.width) return;
        if (
            size.width > 991 &&
            size.width < 1200 &&
            !show &&
            layout !== "minimize"
        ) {
            setMinimize(true);
        }
        if (
            size.width >= 1200 &&
            maximized.current === false &&
            layout !== "minimize"
        ) {
            setMinimize(false);
            maximized.current = true;
        }
        if (size.width <= 1199) {
            maximized.current = false;
        }
        if (size.width <= 991) {
            setMinimize(false);
        }
    }, [size.width, show, layout]);

    const maximizeHandler = (e: React.MouseEvent, text: TMaxText) => {
        e.preventDefault();
        if (!minimize) return;
        if (text === "enter") {
            setMaximize(true);
        }
        if (text === "leave") {
            setMaximize(false);
        }
    };

    const minClass = minimize ? "minimize" : "";
    const maxClass = maximize ? "maximize" : "";

    const [showChangePasswordModal, setShowPasswordModal] = useState(false);

    const handleShowChangePasswordModal = () => {
        setShowPasswordModal((prev) => !prev);
    };

    return (
        <>
            <ChangePasswordModal
                show={showChangePasswordModal}
                onClose={handleShowChangePasswordModal}
            />
            <StyledBackdrop $show={show} onClick={displayHandler} />
            <StyledAside
                className={cn(minClass, maxClass)}
                $minimize={minimize}
                $mdMinimize={mdMinimize.current}
                $maximize={maximize}
                $show={show}
            >
                <Header
                    minimizeHandler={minimizeHandler}
                    displayHandler={displayHandler}
                    minimize={minimize}
                    mdMinimize={mdMinimize.current}
                    show={show}
                    sidebarLayout={sidebarLayout}
                />
                <StyledBody
                    $minimize={minimize}
                    $mdMinimize={mdMinimize.current}
                    $maximize={maximize}
                    $show={show}
                    className="aside-body"
                    onMouseEnter={(e) => maximizeHandler(e, "enter")}
                    onMouseLeave={(e) => maximizeHandler(e, "leave")}
                >
                    <Scrollbar>
                        <StyledBodyInner className="aside-body-inner">
                            <AsideUser
                                onClickChangePassword={
                                    handleShowChangePasswordModal
                                }
                            />
                            <NavbarAside menus={menuData} />
                        </StyledBodyInner>
                    </Scrollbar>
                </StyledBody>
            </StyledAside>
        </>
    );
};

export default Aisde;
