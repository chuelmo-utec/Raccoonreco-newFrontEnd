import ReactTooltip from "react-tooltip";
import { LogOut } from "react-feather";
import { StyledAlerts, StyledAlert } from "./style";

const Alerts = () => {
    return (
        <StyledAlerts className="aside-alerts">
            <ReactTooltip place="top" effect="solid" id="tooltip-sign-out" />
            <StyledAlert
                path="#!"
                data-for="tooltip-sign-out"
                data-tip="Sign out"
            >
                <LogOut size={16} strokeWidth="2.3px" />
            </StyledAlert>
        </StyledAlerts>
    );
};

export default Alerts;
