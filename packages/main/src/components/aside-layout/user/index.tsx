import { Avatar, AvatarInitial } from "@doar/components";
import LoggedinUser from "./loggedin-user";
import { StyledUser, StyledAvatarWrap } from "./style";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/slices/auth";
import { getInitialAvatar } from "../../../utils/utils";
import { useMemo } from "react";

interface IProps {
    onClickChangePassword: () => void;
}

const AsideUser = ({ onClickChangePassword }: IProps) => {
    const user = useSelector(selectCurrentUser);
    const avatar = useMemo(() => {
        if (user?.name) {
            return getInitialAvatar(user.name);
        }
        return null;
    }, [user?.name]);

    return (
        <StyledUser className="aside-user">
            <StyledAvatarWrap>
                <Avatar size="md">
                    <AvatarInitial>{avatar}</AvatarInitial>
                </Avatar>
            </StyledAvatarWrap>
            <LoggedinUser onClickChangePassword={onClickChangePassword} />
        </StyledUser>
    );
};

export default AsideUser;
