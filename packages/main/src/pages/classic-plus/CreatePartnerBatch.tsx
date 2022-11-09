import { Row } from "@doar/components";
import Layout from "../../layouts/layout";
import Content from "../../layouts/layout/content";
import ContentBody from "../../layouts/layout/content-body";
import WelcomeArea from "../../containers/dashboard-one/welcome-area";
import SEO from "../../components/seo";
import PartnerBatchForm from "../../components/partnerbatch-form";

const CreatePartner = () => {
    return (
        <Layout>
            <SEO
                title={"Raccoons"}
                titleTemplate={"Socios"}
                description={"Crear Varios Socios"}
            />
            <Content>
                <ContentBody>
                    <WelcomeArea
                        prev={[{ text: "Inicio", link: "/home" }]}
                        title="Socios"
                        wcText="Dar de alta varios socios"
                    />
                    <Row gutters={10}>
                        <PartnerBatchForm />
                    </Row>
                </ContentBody>
            </Content>
        </Layout>
    );
};

export default CreatePartner;
