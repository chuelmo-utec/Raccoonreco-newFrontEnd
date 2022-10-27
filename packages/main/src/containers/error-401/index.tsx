import image from "@doar/shared/images/img19.png";
import { StyledWrap, StyledImg, StyledTitle, StyledSubTitle } from "./style";

const ErrorContainer = () => {
    return (
        <StyledWrap>
            <StyledImg>
                <img src={image} alt="401" />
            </StyledImg>
            <StyledTitle>401 Permiso Denegado</StyledTitle>
            <StyledSubTitle>
                Oopps. Usted no tiene permisos para acceder a este sitio.
            </StyledSubTitle>
        </StyledWrap>
    );
};

export default ErrorContainer;
