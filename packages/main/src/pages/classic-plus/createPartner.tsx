import { Row, Table } from "@doar/components";
import Layout from "../../layouts/layout";
import Content from "../../layouts/layout/content";
import ContentBody from "../../layouts/layout/content-body";
import WelcomeArea from "../../containers/dashboard-one/welcome-area";
import SEO from "../../components/seo";
import PartnerForm from "../../components/partners";

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
                        wcText="Dar de alta un socio"
                    />
                    <Row gutters={10}>
                        <PartnerForm />
                    </Row>
                </ContentBody>
            </Content>
        </Layout>
    );
};

export default CreatePartner;
