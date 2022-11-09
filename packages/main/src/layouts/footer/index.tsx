import { Heart } from "react-feather";
import {
    StyledFooter,
    StyledFooterLeft,
    StyledFooterRight,
    StyledFooterNav,
    StyledFotterNavLink,
} from "./style";

const Footer = () => {
    return (
        <StyledFooter>
            <StyledFooterLeft>
                <span>&copy; {new Date().getFullYear()} </span>
                <span className="copright-link">
                    HECHO CON <Heart size="24" />
                    <p>POR RACCOONS</p>
                </span>
            </StyledFooterLeft>
        </StyledFooter>
    );
};

export default Footer;
