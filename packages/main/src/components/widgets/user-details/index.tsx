import { Button } from "@doar/components";
import { StyledName, StyledUserName, StyledBtnWrap } from "./style";

const UserDetails = () => {
    return (
        <>
            <StyledBtnWrap>
                <Button size="xs" color="white">
                    Message
                </Button>
                <Button size="xs" ml="10px">
                    Follow
                </Button>
            </StyledBtnWrap>
            <StyledName>Andrés Huelmo</StyledName>
            <StyledUserName>andres@gmail.com</StyledUserName>
        </>
    );
};

export default UserDetails;
