import { Button, Row, Table } from "@doar/components";
import Layout from "../../layouts/layout";
import Content from "../../layouts/layout/content";
import ContentBody from "../../layouts/layout/content-body";
import WelcomeArea from "../../containers/dashboard-one/welcome-area";
import SEO from "../../components/seo";
import useUsers from "../../hooks/users/useUsers";
import { useSelector } from "react-redux";
import { selectAuth, selectCurrentUser } from "../../redux/slices/auth";
import { IAuth, IUser } from "../../@types/user";
import { Edit } from "react-feather";
import EditUserModal from "../../components/edituser-modal/EditUser-Modal";
import { useState } from "react";

const Users = () => {
    const [openEditModal, setOpenEditModal] = useState<{
        open: boolean;
        user: IUser | undefined;
    }>({
        open: false,
        user: undefined,
    });
    const auth = useSelector(selectAuth) as IAuth;
    const currentUser = useSelector(selectCurrentUser) as IUser;
    const { data: users } = useUsers({
        accessToken: auth.access_token,
    });

    const modalHandler = (user?: IUser) => {
        if (user) {
            setOpenEditModal({ open: true, user: user });
        } else {
            setOpenEditModal({ open: false, user: undefined });
        }
    };

    return (
        <Layout>
            <SEO
                title={"Raccoons"}
                titleTemplate={"Usuarios"}
                description={"Usuarios"}
            />
            <Content>
                <ContentBody>
                    <EditUserModal
                        show={currentUser.rol === "Admin" && openEditModal.open}
                        onClose={() => {
                            modalHandler();
                        }}
                        user={openEditModal.user}
                    />
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
                                    <th scope="col">Editar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users?.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.rol}</td>
                                        <td>
                                            <Button
                                                color="primary"
                                                onClick={() => {
                                                    modalHandler(user);
                                                }}
                                            >
                                                <Edit color="white" />
                                            </Button>
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

export default Users;
