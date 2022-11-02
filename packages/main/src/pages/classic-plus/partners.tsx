import {
    Modal,
    ModalBody,
    Badge,
    Button,
    Row,
    Table,
    Alert,
    InputGroup,
    Input,
    InputGroupAddon,
} from "@doar/components";
import Layout from "../../layouts/layout";
import Content from "../../layouts/layout/content";
import ContentBody from "../../layouts/layout/content-body";
import WelcomeArea from "../../containers/dashboard-one/welcome-area";
import SEO from "../../components/seo";
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/slices/auth";
import { IAuth } from "../../@types/user";
import { Edit, X } from "react-feather";
import usePartners from "../../hooks/partners/usePartners";
import { IPartner } from "../../../src/@types/partners";
import {
    StyledClose,
    StyledTitle,
    StyledText,
} from "../../../src/components/token/style";
import { useState } from "react";

const Partners = () => {
    const auth = useSelector(selectAuth) as IAuth;
    const [confirmationOpen, setConfirmationOpen] = useState<boolean>(false);
    const clickHandler = (partner: IPartner) => {
        const authorized = partner.authorized;

        const document = partner.document;
        console.log(document, authorized);

        return (
            <Modal
                show={confirmationOpen}
                onClose={() => setConfirmationOpen(true)}
            >
                <ModalBody p={["20px", "30px"]}>
                    <StyledClose onClose={() => setConfirmationOpen(true)}>
                        <X size={20} />
                    </StyledClose>
                    <StyledTitle>Solicitar Permiso</StyledTitle>
                    <StyledText>
                        Ingresa tu contraseña para confirmar que sos tú.
                    </StyledText>
                    <form action="#" noValidate>
                        <InputGroup mb="5px">
                            <Input
                                type="password"
                                id="password"
                                placeholder="Contraseña"
                                name="eee"
                            />
                            <InputGroupAddon>
                                <Button
                                    type="submit"
                                    variant="outlined"
                                    color="light"
                                >
                                    Confirmar
                                </Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </form>
                </ModalBody>
            </Modal>
        );
    };
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
                                    <th scope="col">Editar Socio</th>
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
                                        <td>
                                            <Button
                                                hasIcon={false}
                                                iconPosition="right"
                                                type="button"
                                                disabled={false}
                                                iconButton={true}
                                                onClick={() => {
                                                    clickHandler(partner);
                                                }}
                                            >
                                                <Edit size={12}></Edit>
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

export default Partners;
