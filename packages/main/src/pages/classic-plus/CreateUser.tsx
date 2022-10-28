import { Row } from "@doar/components";
import Layout from "../../layouts/layout";
import Content from "../../layouts/layout/content";
import ContentBody from "../../layouts/layout/content-body";
import WelcomeArea from "../../containers/dashboard-one/welcome-area";
import SEO from "../../components/seo";
import UserForm from "../../components/user-form";

const CreateUser = () => {
    return (
        <Layout>
            <SEO
                title={"Raccoons"}
                titleTemplate={"Usuarios"}
                description={"Crear Usuario"}
            />
            <Content>
                <ContentBody>
                    <WelcomeArea
                        prev={[{ text: "Inicio", link: "/home" }]}
                        title="Usuarios"
                        wcText="Dar de alta un usuario"
                    />
                    <Row gutters={10}>
                        <UserForm />
                    </Row>
                </ContentBody>
            </Content>
        </Layout>
    );
};

export default CreateUser;
