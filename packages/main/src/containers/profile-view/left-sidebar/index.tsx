import { Row, Col } from "@doar/components";
import UserAvatar from "../../../components/widgets/user-avatar";
import UserDetails from "../../../components/widgets/user-details";
import UserSkill from "../../../components/widgets/user-skills";
import UserWebsites from "../../../components/widgets/user-websites";
import UserContactInfo from "../../../components/widgets/user-contact-info";
import Explore from "../../../components/widgets/explore";
import { StyledWrap } from "./style";

const LeftSidebar = () => {
    return (
        <StyledWrap>
            <Row>
                <Col sm={3} md={2} lg={12}>
                    <UserAvatar />
                </Col>
                <Col sm={6} md={5} lg={12} mt="40px" mb="16px">
                    <UserContactInfo />
                </Col>
            </Row>
        </StyledWrap>
    );
};

export default LeftSidebar;
