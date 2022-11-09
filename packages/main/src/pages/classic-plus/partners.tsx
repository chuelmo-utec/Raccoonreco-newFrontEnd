import { Badge, Button, Row, Table } from "@doar/components";
import Layout from "../../layouts/layout";
import Content from "../../layouts/layout/content";
import ContentBody from "../../layouts/layout/content-body";
import WelcomeArea from "../../containers/dashboard-one/welcome-area";
import SEO from "../../components/seo";
import { useSelector } from "react-redux";
import { selectAuth, selectCurrentUser } from "../../redux/slices/auth";
import { IAuth, IUser } from "../../@types/user";
import usePartners from "../../hooks/partners/usePartners";
import { IPartner } from "../../@types/partners";
import { useEffect, useState } from "react";
import { Edit, X, UserPlus } from "react-feather";
import EditPartnerModal from "../../components/editpartner-modal/EditPartner-Modal";
import DeletePartnerModal from "../../components/deletepartner-modal/DeletePartner-Modal";
import InsertFace from "../../components/profile-view/insert-face/InsertFace";
import usePartnersPagination from "../../hooks/partners/usePartnersPagination";

const Partners = () => {
    const auth = useSelector(selectAuth) as IAuth;
    const [offset, setOffset] = useState(0);
    const { data: partners, refetch: refetchPartnersPagination } =
        usePartnersPagination({
            accessToken: auth.access_token,
            offset,
        });

    const { data: totalPartners, refetch: refetchTotalPartners } = usePartners({
        accessToken: auth.access_token,
    });

    useEffect(() => {
        refetchPartnersPagination()
            .then()
            .catch((err) => {
                console.log(err);
            });
    }, [offset]);

    const currentUser = useSelector(selectCurrentUser) as IUser;

    const [openEditModal, setOpenEditModal] = useState<{
        open: boolean;
        partner: IPartner | undefined;
    }>({
        open: false,
        partner: undefined,
    });

    const [openDeleteModal, setOpenDeleteModal] = useState<{
        open: boolean;
        partner: IPartner | undefined;
    }>({
        open: false,
        partner: undefined,
    });

    const [openInsertFaceModal, setOpenInsertFaceModal] = useState<{
        open: boolean;
        partner: IPartner | undefined;
    }>({
        open: false,
        partner: undefined,
    });

    const modalEditPartnerHandler = (partner?: IPartner) => {
        if (partner) {
            setOpenEditModal({ open: true, partner: partner });
        } else {
            setOpenEditModal({ open: false, partner: undefined });
        }
    };

    const modalDeletePartnerHandler = (partner?: IPartner) => {
        if (partner) {
            setOpenDeleteModal({ open: true, partner: partner });
        } else {
            setOpenDeleteModal({ open: false, partner: undefined });
        }
    };

    const modalInsertFacePartnerHandler = (partner?: IPartner) => {
        if (partner) {
            setOpenInsertFaceModal({ open: true, partner: partner });
        } else {
            setOpenInsertFaceModal({ open: false, partner: undefined });
        }
    };

    const refreshFunction = () => {
        refetchTotalPartners()
            .then()
            .catch((err) => {
                console.log(err);
            });
        refetchPartnersPagination()
            .then()
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Layout>
            <SEO
                title={"Raccoons"}
                titleTemplate={"Socios"}
                description={"Socios"}
            />
            <Content>
                <ContentBody>
                    <InsertFace
                        show={openInsertFaceModal.open}
                        partner={openInsertFaceModal.partner}
                        onClose={() => {
                            modalInsertFacePartnerHandler();
                        }}
                    />
                    <EditPartnerModal
                        show={currentUser.rol === "Admin" && openEditModal.open}
                        onClose={() => {
                            modalEditPartnerHandler();
                        }}
                        partner={openEditModal.partner}
                        refresh={refreshFunction}
                    />
                    <DeletePartnerModal
                        show={
                            currentUser.rol === "Admin" && openDeleteModal.open
                        }
                        onClose={() => {
                            modalDeletePartnerHandler();
                        }}
                        partner={openDeleteModal.partner}
                        refresh={refreshFunction}
                    />
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
                                    {currentUser.rol === "Admin" && (
                                        <th scope="col">Editar</th>
                                    )}
                                    {currentUser.rol === "Admin" && (
                                        <th scope="col">Eliminar</th>
                                    )}
                                    <th scope="col">Insertar Rostro</th>
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
                                        {currentUser.rol === "Admin" && (
                                            <td
                                                style={{
                                                    textAlign: "center",
                                                }}
                                            >
                                                <Button
                                                    color="primary"
                                                    onClick={() => {
                                                        modalEditPartnerHandler(
                                                            partner
                                                        );
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
                                                        modalDeletePartnerHandler(
                                                            partner
                                                        );
                                                    }}
                                                >
                                                    <X color="white" />
                                                </Button>
                                            </td>
                                        )}
                                        <td
                                            style={{
                                                textAlign: "center",
                                            }}
                                        >
                                            <Button
                                                color="primary"
                                                onClick={() => {
                                                    modalInsertFacePartnerHandler(
                                                        partner
                                                    );
                                                }}
                                            >
                                                <UserPlus color="white" />
                                            </Button>
                                        </td>
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
                                totalPartners &&
                                (offset + 5) / totalPartners?.length >= 1
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

export default Partners;
