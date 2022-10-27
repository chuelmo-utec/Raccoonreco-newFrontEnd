import { useState } from "react";
import { Settings } from "react-feather";
import { Row, Col } from "@doar/components";
import { TTheme } from "@doar/shared/types";
import { SkinModes } from "./data";
import Mode from "./mode";
import {
    StyledSettings,
    StyledSettingsBtn,
    StyledSettingsBody,
    StyledCard,
    StyledLogo,
    StyledNote,
    StyledLabel,
} from "./style";

interface IProps {
    themeHandler: (el: TTheme) => void;
    curTheme: TTheme;
}

const SettingsCard = ({ themeHandler, curTheme }: IProps) => {
    const [show, setShow] = useState(false);

    return (
        <StyledSettings $show={show}>
            <StyledSettingsBtn
                $show={show}
                onClick={() => setShow((prev) => !prev)}
            >
                <Settings width={20} height={20} />
            </StyledSettingsBtn>
            <StyledSettingsBody>
                <StyledCard>
                    <StyledLogo>
                        RACCOO<span>NS</span>
                    </StyledLogo>
                    <StyledNote>Elegir Plantilla</StyledNote>
                </StyledCard>

                <StyledCard $hasBorder>
                    <StyledLabel>Diseños</StyledLabel>
                    <Row gutters={10}>
                        {SkinModes.map((el, i) => (
                            <Col xs={4} sm={4} key={el} mt={i > 2 ? "10px" : 0}>
                                <Mode
                                    mode={el}
                                    onClick={() => themeHandler(el)}
                                    active={curTheme === el}
                                />
                            </Col>
                        ))}
                    </Row>
                </StyledCard>
            </StyledSettingsBody>
        </StyledSettings>
    );
};

export default SettingsCard;
