import Breadcrumb from "../../../components/breadcrumb";
import { StyledWelcomeArea, StyledWelcomeLeft } from "./style";

const WelcomeArea = (props: {
    prev: {
        text: string;
        link: string;
    }[];
    title: string;
    wcText: string;
}) => {
    return (
        <>
            <StyledWelcomeArea>
                <StyledWelcomeLeft>
                    <Breadcrumb
                        prev={props.prev}
                        title={props.title}
                        wcText={props.wcText}
                    />
                </StyledWelcomeLeft>
            </StyledWelcomeArea>
        </>
    );
};

export default WelcomeArea;
