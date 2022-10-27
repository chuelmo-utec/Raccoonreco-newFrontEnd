import { Row } from "@doar/components";
import Layout from "../../layouts/layout";
import Content from "../../layouts/layout/content";
import ContentBody from "../../layouts/layout/content-body";
import WelcomeArea from "../../containers/dashboard-one/welcome-area";
import RowThree from "../../containers/dashboard-one/row-three";
import SEO from "../../components/seo";

const DashboardOne = () => {
    return (
        <Layout>
            <SEO
                title={"Raccoons"}
                titleTemplate={"Página Principal"}
                description={"Página Principal"}
            />
            <Content>
                <ContentBody>
                    <WelcomeArea
                        prev={[{ text: "Inicio", link: "/home" }]}
                        title="Página principal"
                        wcText="Bienvenido"
                    />
                    <Row gutters={10}>
                        <RowThree />
                    </Row>
                </ContentBody>
            </Content>
        </Layout>
    );
};

export default DashboardOne;
