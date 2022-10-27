import image from "@doar/shared/images/img19.png";
import { StyledWrap, StyledImg, StyledTitle, StyledSubTitle } from "./style";

const ErrorContainer = () => {
    return (
        <StyledWrap>
            <StyledImg>
                <img src={image} alt="404" />
            </StyledImg>
            <StyledTitle>404 Página no encontrada</StyledTitle>
            <StyledSubTitle>
                Oopps. La página que estabas buscando no existe.
            </StyledSubTitle>
        </StyledWrap>
    );
};

export default ErrorContainer;
