import loginImage from "@doar/shared/images/raccoons.jpeg";
import SigninForm from "../../components/signin-form";
import {
    StyledMedia,
    StyledMediaBody,
    StyledImage,
    StyledImgText,
    StyledSignin,
} from "./style";

const AuthContainer = () => {
    return (
        <StyledMedia>
            <StyledMediaBody>
                <StyledImage>
                    <img
                        style={{ borderRadius: "60px" }}
                        src={loginImage}
                        alt="Login"
                    />
                </StyledImage>
            </StyledMediaBody>
            <StyledSignin>
                <SigninForm />
            </StyledSignin>
        </StyledMedia>
    );
};

export default AuthContainer;
