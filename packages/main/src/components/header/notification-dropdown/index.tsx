import { Bell } from "react-feather";
import { DropdownToggle, Dropdown } from "@doar/components";
import Notification from "../dropdown-item";
import {
    StyledDropMenu,
    StyledDropHeader,
    StyledDropItem,
    StyledBadge,
} from "../header-dropdown-elements";

const NotificationDropdown = () => {
    return (
        <Dropdown direction="down">
            <DropdownToggle variant="texted">
                <Bell className="header-icon" />
                <StyledBadge>1</StyledBadge>
            </DropdownToggle>
            <StyledDropMenu>
                <StyledDropHeader>NOTIFICACIONES</StyledDropHeader>
                <StyledDropItem path="/profile-view">
                    <Notification />
                </StyledDropItem>
            </StyledDropMenu>
        </Dropdown>
    );
};

export default NotificationDropdown;
