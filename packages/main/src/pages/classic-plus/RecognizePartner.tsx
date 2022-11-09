import { Row } from "@doar/components";
import Layout from "../../layouts/layout";
import Content from "../../layouts/layout/content";
import ContentBody from "../../layouts/layout/content-body";
import WelcomeArea from "../../containers/dashboard-one/welcome-area";
import SEO from "../../components/seo";
import PartnerForm from "../../components/partner-form";
import RecognizeFace from "../../components/recognize-face/RecognizeFace";

const CreatePartner = () => {
    return (
        <Layout>
            <SEO
                title={"Raccoons"}
                titleTemplate={"Socios"}
                description={"Crear Socio"}
            />
            <Content>
                <ContentBody>
                    <WelcomeArea
                        prev={[{ text: "Inicio", link: "/home" }]}
                        title="Socios"
                        wcText="Reconocer socio"
                    />
                    <Row gutters={10}>
                        <RecognizeFace />
                    </Row>
                </ContentBody>
            </Content>
        </Layout>
    );
};

export default CreatePartner;
