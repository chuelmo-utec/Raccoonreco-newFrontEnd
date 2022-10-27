import { Users } from "react-feather";
import {
    Card,
    CardBody,
    Media,
    MediaBody,
    SectionTitle,
} from "@doar/components";
import {
    StyledHeader,
    StyledMediaWrap,
    StyledMedaLeft,
    StyledMediaTitle,
    StyledMediaSub,
} from "./style";
import { useSelector } from "react-redux";
import { selectAuth } from "../../../redux/slices/auth";
import useUsers from "../../../hooks/users/useUsers";
import { IAuth } from "../../../@types/user";
import usePartners from "../../../hooks/partners/usePartners";

const RecentEarnings = () => {
    const auth = useSelector(selectAuth) as IAuth;
    const { data: users } = useUsers({
        accessToken: auth.access_token,
    });
    const { data: partners } = usePartners({
        accessToken: auth.access_token,
    });
    return (
        <Card mb="10px">
            <StyledHeader>
                <div>
                    <SectionTitle title="Datos" />
                </div>
            </StyledHeader>
            <CardBody py={["30px", "30px"]}>
                <StyledMediaWrap>
                    <Media>
                        <StyledMedaLeft bg="teal">
                            <Users size="24" />
                        </StyledMedaLeft>
                        <MediaBody>
                            <StyledMediaTitle>Usuarios</StyledMediaTitle>
                            <StyledMediaSub>
                                {users && users.length}
                            </StyledMediaSub>
                        </MediaBody>
                    </Media>
                    <Media mt={["20px", "0px"]} ml={[null, "15px", "40px"]}>
                        <StyledMedaLeft bg="pink">
                            <Users size="24" />
                        </StyledMedaLeft>
                        <MediaBody>
                            <StyledMediaTitle>Socios</StyledMediaTitle>
                            <StyledMediaSub>
                                {partners && partners.length}
                            </StyledMediaSub>
                        </MediaBody>
                    </Media>
                </StyledMediaWrap>
            </CardBody>
        </Card>
    );
};

export default RecentEarnings;
