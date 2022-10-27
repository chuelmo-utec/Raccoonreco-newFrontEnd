import { Badge, Row, Table } from "@doar/components";
import Layout from "../../layouts/layout";
import Content from "../../layouts/layout/content";
import ContentBody from "../../layouts/layout/content-body";
import WelcomeArea from "../../containers/dashboard-one/welcome-area";
import SEO from "../../components/seo";
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/slices/auth";
import { IAuth } from "../../@types/user";
import usePartners from "../../hooks/partners/usePartners";

const Partners = () => {
    const auth = useSelector(selectAuth) as IAuth;
    const { data: partners } = usePartners({
        accessToken: auth.access_token,
    });

    return (
        <Layout>
            <SEO
                title={"Raccoons"}
                titleTemplate={"Socios"}
                description={"Socios"}
            />
            <Content>
                <ContentBody>
                    <WelcomeArea
                        prev={[{ text: "Inicio", link: "/home" }]}
                        title="Socios"
                        wcText="Listado de Socios"
                    />
                    <Row gutters={10}>
                        <Table bordered={true}>
                            <thead>
                                <tr>
                                    <th scope="col">Número de socio</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Documento</th>
                                    <th scope="col">Número de Contacto</th>
                                    <th scope="col">Autorizado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {partners?.map((partner) => (
                                    <tr key={partner.id}>
                                        <th scope="row">{partner.partnerId}</th>
                                        <td>{partner.name}</td>
                                        <td>{partner.document}</td>
                                        <td>{partner.contactNumber}</td>
                                        <td>
                                            <Badge
                                                color={
                                                    partner.authorized
                                                        ? "success"
                                                        : "danger"
                                                }
                                            >
                                                {partner.authorized
                                                    ? "Autorizado"
                                                    : "Bloqueado"}
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Row>
                </ContentBody>
            </Content>
        </Layout>
    );
};

export default Partners;
