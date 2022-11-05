import { useEffect, useState } from "react";
import { X } from "react-feather";
import {
    Modal,
    ModalBody,
    Input,
    Button,
    Alert,
    FormGroup,
    Label,
    Spinner,
    Select,
} from "@doar/components";
import { StyledClose, StyledTitle, StyledText } from "./style";
import { useForm, SubmitHandler } from "react-hook-form";
import { hasKey } from "@doar/shared/methods";
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/slices/auth";
import { IAuth } from "../../@types/user";
import { AxiosError } from "axios";
import { useQueryClient } from "react-query";
import ModalConfirmationPassword from "../token/ModalConfirmationPassword";
import { IPartner, IPartnerForm } from "../../@types/partners";
import useEditPartner from "../../hooks/partners/useEditPartner";

interface IProps {
    show: boolean;
    onClose: () => void;
    partner?: IPartner;
}

const EditModal = ({ show, onClose, partner }: IProps) => {
    const editPartnerMutation = useEditPartner();
    const accessToken = useSelector(selectAuth) as IAuth;
    const [error, setError] = useState<string | null>(null);
    const [confirmationOpen, setConfirmationOpen] = useState<boolean>(false);
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IPartnerForm>({});

    useEffect(() => {
        reset({
            document: partner?.document,
            partnerId: partner?.partnerId,
            name: partner?.name,
            contactNumber: partner?.contactNumber,
            authorized: partner?.authorized,
        });
    }, [partner]);

    const onSubmit: SubmitHandler<IPartnerForm> = (partnerSubmited) => {
        editPartnerMutation.mutate(
            {
                id: partner?.id,
                ...partnerSubmited,
                accessToken: accessToken.access_token,
            },
            {
                onSuccess: (response: IPartner) => {
                    if (response) {
                        queryClient.setQueryData<IPartner[] | undefined>(
                            "usePartners",
                            (prevData: IPartner[] | undefined) => {
                                if (prevData) {
                                    return prevData.map((x) => {
                                        if (
                                            x.partnerId === response.partnerId
                                        ) {
                                            return response;
                                        } else {
                                            return x;
                                        }
                                    });
                                } else {
                                    return [response];
                                }
                            }
                        );
                    }
                    reset();
                    onClose();
                },
                onError: (err: AxiosError) => {
                    if (err.response && err.response.status === 401) {
                        setConfirmationOpen(true);
                    } else {
                        setError("Ocurrió un error, intente más tarde.");
                    }
                },
            }
        );
    };

    return (
        <Modal show={show} onClose={onClose}>
            {confirmationOpen && (
                <ModalConfirmationPassword
                    onClose={() => setConfirmationOpen(false)}
                    show={confirmationOpen}
                />
            )}
            <ModalBody p={["20px", "30px"]}>
                <StyledClose onClose={onClose}>
                    <X size={20} />
                </StyledClose>
                <StyledTitle>Editar Socio</StyledTitle>
                {error && (
                    <Alert color="danger" variant="outlined">
                        {error}
                    </Alert>
                )}
                <StyledText>Modifica los campos deseados.</StyledText>
                <form action="#" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <FormGroup mb="20px">
                        <Label display="block" mb="5px" htmlFor="name">
                            Nombre
                        </Label>
                        <Input
                            type="text"
                            id="name"
                            placeholder="Nombre"
                            feedbackText={errors?.name?.message}
                            state={hasKey(errors, "name") ? "error" : "success"}
                            showState={hasKey(errors, "name")}
                            {...register("name", {
                                required: "El nombre es requerido",
                            })}
                        />
                    </FormGroup>
                    <FormGroup mb="20px">
                        <Label display="block" mb="5px" htmlFor="document">
                            Documento
                        </Label>
                        <Input
                            type="text"
                            id="document"
                            placeholder="Documento"
                            feedbackText={errors?.name?.message}
                            state={
                                hasKey(errors, "document") ? "error" : "success"
                            }
                            showState={hasKey(errors, "document")}
                            {...register("document", {
                                required: "El documento es requerido",
                            })}
                        />
                    </FormGroup>
                    <FormGroup mb="20px">
                        <Label display="block" mb="5px" htmlFor="contactNumber">
                            Número de Contacto
                        </Label>
                        <Input
                            type="text"
                            id="contactNumber"
                            placeholder="Número de Contacto"
                            feedbackText={errors?.name?.message}
                            state={
                                hasKey(errors, "contactNumber")
                                    ? "error"
                                    : "success"
                            }
                            showState={hasKey(errors, "contactNumber")}
                            {...register("contactNumber", {
                                required: "El número de contacto es requerido",
                            })}
                        />
                    </FormGroup>
                    <FormGroup mb="20px">
                        <Label display="block" mb="5px" htmlFor="partnerId">
                            Número de Socio
                        </Label>
                        <Input
                            type="number"
                            id="partnerId"
                            placeholder="Número de Socio"
                            feedbackText={errors?.name?.message}
                            disabled={true}
                            state={
                                hasKey(errors, "partnerId")
                                    ? "error"
                                    : "success"
                            }
                            showState={hasKey(errors, "partnerId")}
                            {...register("partnerId", {
                                required: "El número de socio es requerido",
                            })}
                        />
                    </FormGroup>
                    <FormGroup mb="20px">
                        <Label display="block" mb="5px" htmlFor="authorized">
                            Autorizado
                        </Label>
                        <Select
                            id="rol"
                            state={
                                hasKey(errors, "authorized")
                                    ? "error"
                                    : "success"
                            }
                            showState={hasKey(errors, "authorized")}
                            feedbackText={errors?.authorized?.message}
                            {...register("authorized", {
                                required: "El campo autorizado es requerido",
                            })}
                        >
                            <option value="true">Autorizado</option>
                            <option value="false">Bloqueado</option>
                        </Select>
                    </FormGroup>
                    <Button
                        hasIcon={editPartnerMutation.isLoading}
                        iconPosition="right"
                        type="submit"
                        color="brand2"
                        disabled={editPartnerMutation.isLoading}
                    >
                        {editPartnerMutation.isLoading
                            ? "Espere por favor..."
                            : "Guardar"}
                        {editPartnerMutation.isLoading && <Spinner size="sm" />}
                    </Button>
                </form>
            </ModalBody>
        </Modal>
    );
};

export default EditModal;
