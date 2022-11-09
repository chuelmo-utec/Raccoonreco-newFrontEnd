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
import { Edit, X } from "react-feather";
import EditUserModal from "../../components/edituser-modal/EditUser-Modal";
import { useEffect, useState } from "react";
import DeleteUserModal from "../../components/deleteuser-modal/DeleteUser-Modal";
import useUsersPagination from "../../hooks/users/useUsersPagination";

const Users = () => {
    const [openEditModal, setOpenEditModal] = useState<{
        open: boolean;
        user: IUser | undefined;
    }>({
        open: false,
        user: undefined,
    });

    const [openRemoveModal, setOpenRemoveModal] = useState<{
        open: boolean;
        user: IUser | undefined;
    }>({
        open: false,
        user: undefined,
    });
    const [offset, setOffset] = useState(0);
    const auth = useSelector(selectAuth) as IAuth;
    const currentUser = useSelector(selectCurrentUser) as IUser;
    const { data: users, refetch: refetchUsersPagination } = useUsersPagination(
        {
            accessToken: auth.access_token,
            offset,
        }
    );

    const { data: totalUsers, refetch: refetchTotalUsers } = useUsers({
        accessToken: auth.access_token,
    });

    useEffect(() => {
        refetchUsersPagination()
            .then()
            .catch((err) => {
                console.log(err);
            });
    }, [offset]);

    const refetchFunction = () => {
        refetchUsersPagination()
            .then()
            .catch((err) => {
                console.log(err);
            });

        refetchTotalUsers()
            .then()
            .catch((err) => {
                console.log(err);
            });
    };

    const modalHandlerEdit = (user?: IUser) => {
        if (user) {
            setOpenEditModal({ open: true, user: user });
        } else {
            setOpenEditModal({ open: false, user: undefined });
        }
    };

    const modalHandlerDelete = (user?: IUser) => {
        if (user) {
            setOpenRemoveModal({ open: true, user: user });
        } else {
            setOpenRemoveModal({ open: false, user: undefined });
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
                            modalHandlerEdit();
                        }}
                        user={openEditModal.user}
                        refresh={refetchFunction}
                    />
                    <DeleteUserModal
                        show={
                            currentUser.rol === "Admin" && openRemoveModal.open
                        }
                        onClose={() => {
                            modalHandlerDelete();
                        }}
                        user={openRemoveModal.user}
                        refresh={refetchFunction}
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
                                    {currentUser.rol === "Admin" && (
                                        <th scope="col">Editar</th>
                                    )}
                                    {currentUser.rol === "Admin" && (
                                        <th scope="col">Eliminar</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {users?.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.rol}</td>
                                        {currentUser.rol === "Admin" && (
                                            <td
                                                style={{
                                                    textAlign: "center",
                                                }}
                                            >
                                                <Button
                                                    color="primary"
                                                    onClick={() => {
                                                        modalHandlerEdit(user);
                                                    }}
                                                >
                                                    <Edit color="white" />
                                                </Button>
                                            </td>
                                        )}
                                        {currentUser.rol === "Admin" && (
                                            <td
                                                style={{
                                                    textAlign: "center",
                                                }}
                                            >
                                                <Button
                                                    color="primary"
                                                    onClick={() => {
                                                        modalHandlerDelete(
                                                            user
                                                        );
                                                    }}
                                                >
                                                    <X color="white" />
                                                </Button>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Row>
                    <div
                        style={{
                            textAlign: "center",
                        }}
                    >
                        <Button
                            disabled={offset === 0}
                            color="primary"
                            onClick={() => {
                                setOffset((prev) => prev - 5);
                            }}
                            mr={25}
                        >
                            Anterior
                        </Button>
                        <Button
                            disabled={
                                totalUsers &&
                                (offset + 5) / totalUsers?.length >= 1
                            }
                            color="primary"
                            onClick={() => {
                                setOffset((prev) => prev + 5);
                            }}
                        >
                            Siguiente
                        </Button>
                    </div>
                </ContentBody>
            </Content>
        </Layout>
    );
};

export default Users;
