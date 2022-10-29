/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import { Menu, X, ArrowLeft } from "react-feather";
import AsideLogo from "../../../components/aside-layout/logo";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { toggleSidebar } from "../../../redux/slices/ui";
import { StyledHeader, StyledMenuBtn, StyledSidebarBtn } from "./style";

interface IProps {
    minimizeHandler: () => void;
    displayHandler: () => void;
    minimize: boolean;
    mdMinimize: boolean;
    show: boolean;
    sidebarLayout?: 1 | 2;
}

const Header = ({
    minimizeHandler,
    displayHandler,
    minimize,
    mdMinimize,
    show,
    sidebarLayout,
}: IProps) => {
    const dispatch = useAppDispatch();
    const { sidebar } = useAppSelector((state) => state.ui);
    const sidebarHandler = useCallback(
        (_: any, isOpen?: "open") => {
            dispatch(toggleSidebar({ isOpen }));
        },
        [dispatch]
    );

    const menuHandler = useCallback(() => {
        displayHandler();
        if (show) {
            sidebarHandler(undefined, "open");
        }
    }, [show, sidebarHandler, displayHandler]);

    return (
        <StyledHeader
            $minimize={minimize}
            $mdMinimize={mdMinimize}
            $show={show}
            className="aside-header"
        >
            <AsideLogo />

            <StyledMenuBtn className="minimize-btn" onClick={minimizeHandler}>
                <Menu size={18} strokeWidth="2.5px" />
            </StyledMenuBtn>

            {sidebarLayout === 1 && (
                <>
                    <StyledMenuBtn
                        className="display-btn"
                        onClick={menuHandler}
                    >
                        <Menu size={18} strokeWidth="2.5px" />
                        <X size={18} strokeWidth="2.5px" />
                    </StyledMenuBtn>
                </>
            )}
            {sidebarLayout === 2 && (
                <>
                    <StyledMenuBtn
                        className="display-btn"
                        onClick={menuHandler}
                    >
                        <Menu size={18} strokeWidth="2.5px" />
                        <X size={18} strokeWidth="2.5px" />
                    </StyledMenuBtn>
                    <StyledSidebarBtn
                        onClick={sidebarHandler}
                        $sidebarOpen={!sidebar}
                    >
                        <ArrowLeft size={20} strokeWidth="2.5px" />
                    </StyledSidebarBtn>
                </>
            )}
        </StyledHeader>
    );
};

export default Header;
