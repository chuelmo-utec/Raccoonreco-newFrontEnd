import { Row, Table } from "@doar/components";
import Layout from "../../layouts/layout";
import Content from "../../layouts/layout/content";
import ContentBody from "../../layouts/layout/content-body";
import WelcomeArea from "../../containers/dashboard-one/welcome-area";
import SEO from "../../components/seo";
import useUsers from "../../hooks/users/useUsers";
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/slices/auth";
import { IAuth } from "../../@types/user";

const Users = () => {
    const auth = useSelector(selectAuth) as IAuth;
    const { data: users } = useUsers({
        accessToken: auth.access_token,
    });

    return (
        <Layout>
            <SEO
                title={"Raccoons"}
                titleTemplate={"Usuarios"}
                description={"Usuarios"}
            />
            <Content>
                <ContentBody>
                    <WelcomeArea
                        prev={[{ text: "Inicio", link: "/home" }]}
                        title="Usuarios"
                        wcText="Listado de Usuarios"
                    />
                    <Row gutters={10}>
                        <Table bordered={true}>
                            <thead>
                                <tr>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Rol</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users?.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.rol}</td>
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

export default Users;
