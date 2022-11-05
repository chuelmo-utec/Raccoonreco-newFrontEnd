import {
    Edit3,
    User,
    HelpCircle,
    LifeBuoy,
    Settings,
    LogOut,
} from "react-feather";
import {
    DropdownToggle,
    Dropdown,
    Avatar,
    AvatarInitial,
} from "@doar/components";
import {
    StyledDropMenu,
    StyledAuthorName,
    StyledAuthorRole,
    StyledDropItem,
    StyledDivider,
    StyledAvatar,
} from "./style";

const ProfileDropdown = () => {
    return (
        <Dropdown direction="down" className="dropdown-profile">
            <DropdownToggle variant="texted">
                <StyledAvatar size="sm" shape="circle">
                    <AvatarInitial>CH</AvatarInitial>
                </StyledAvatar>
            </DropdownToggle>
            <StyledDropMenu>
                <Avatar size="lg" shape="circle">
                    <AvatarInitial>CH</AvatarInitial>
                </Avatar>
                <StyledAuthorName>Christian Huelmo</StyledAuthorName>
                <StyledAuthorRole>Administrador</StyledAuthorRole>
                <StyledDropItem path="/profile-view" mt="10px">
                    <User size="24" />
                    Mi Perfil
                </StyledDropItem>
                <StyledDivider />
                <StyledDropItem path="/signin" mt="10px">
                    <LogOut size="24" />
                    Salir
                </StyledDropItem>
            </StyledDropMenu>
        </Dropdown>
    );
};

export default ProfileDropdown;
