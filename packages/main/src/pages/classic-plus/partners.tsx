import {
    Modal,
    ModalBody,
    ModalTitle,
    ModalClose,
    ModalFooter,
    Badge,
    Button,
    Row,
    Table,
    Alert,
    InputGroup,
    Input,
    InputGroupAddon,
    ModalHeader,
    Checkbox,
    Col,
    Radio,
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
import { hasKey } from "@doar/shared/methods";

const Partners = () => {
    const [confirmationOpen, setConfirmationOpen] = useState<boolean>(false);
    const auth = useSelector(selectAuth) as IAuth;
    const [show, setShow] = useState(false);
    const [showPhoto, setShowPhoto] = useState(false);
    const [showAttach, setShowAttach] = useState(false);
    const { data: partners } = usePartners({
        accessToken: auth.access_token,
    });

    const closeHandler = () => {
        setShow((prev) => !prev);
    };
    const attachHandler = (button: string) => {
        if (button === "attach") {
            setShowAttach(true);
            setShowPhoto(false);
        } else if (button === "photo") {
            setShowPhoto(true);
            setShowAttach(false);
        } else {
            setShowPhoto(false);
            setShowAttach(false);
        }
    };
    const clickHandler = (partner: IPartner): void => {
        const authorized = partner.authorized;

        const document = partner.document;
        console.log(document, authorized);
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
                                                    closeHandler();
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
            <Modal
                show={show}
                onClose={closeHandler}
                size={"md"}
                centered={true}
            >
                <ModalHeader>
                    <ModalTitle>Editar Socio</ModalTitle>
                    <br />
                </ModalHeader>
                <ModalBody>
                    <form
                        action="#"
                        onSubmit={() => {
                            console.log("llamar a endpoint");
                        }}
                        noValidate
                    >
                        <InputGroup mb="12px">
                            <Input
                                type="string"
                                id="nombre"
                                placeholder="Nombre"
                                name="nombre"
                            />
                        </InputGroup>
                        <InputGroup mb="12px">
                            <Input
                                type="string"
                                id="documento"
                                placeholder="Documento"
                                name="documento"
                            />
                        </InputGroup>
                        <InputGroup mb="12px">
                            <Input
                                type="text"
                                id="numeroContacto"
                                placeholder="Numero de Contacto"
                                name="numeroContacto"
                            />
                        </InputGroup>
                        <InputGroup mb="12px">
                            <Checkbox
                                label="Autorizado"
                                id="autorizado"
                                name="autorizado"
                            ></Checkbox>
                        </InputGroup>

                        <Row>
                            <Col col>
                                <Radio
                                    onClick={(value) => {
                                        console.log(value.currentTarget.id);
                                        attachHandler(value.currentTarget.id);
                                    }}
                                    id="attach"
                                    name="customRadio"
                                    label="Subir foto"
                                />
                            </Col>
                            <Col col>
                                <Radio
                                    onClick={(value) => {
                                        attachHandler(value.currentTarget.id);
                                        console.log(value.currentTarget.id);
                                    }}
                                    id="photo"
                                    name="customRadio"
                                    label="Tomar foto"
                                />
                            </Col>
                        </Row>

                        {showPhoto && (
                            <InputGroup mb="12px">
                                <Input
                                    type="file"
                                    id="attach"
                                    placeholder="Subir foto"
                                    name="attach"
                                />
                            </InputGroup>
                        )}

                        {showAttach && (
                            <InputGroup mb="12px">
                                <Input
                                    type="text"
                                    id="attach"
                                    placeholder="Subir foto"
                                    name="attach"
                                />
                            </InputGroup>
                        )}
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={closeHandler}>
                        Close
                    </Button>
                    <Button
                        color="primary"
                        onClick={() => {
                            console.log("llamar a endpoint");
                        }}
                    >
                        {" "}
                        Save changes
                    </Button>
                </ModalFooter>
            </Modal>
        </Layout>
    );
};

export default Partners;
