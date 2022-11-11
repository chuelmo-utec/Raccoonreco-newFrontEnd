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
import useDeletePartner from "../../hooks/partners/useDeletePartner";

interface IProps {
    show: boolean;
    onClose: () => void;
    partner?: IPartner;
    refresh: () => void;
}

const DeleteModal = ({ show, onClose, partner, refresh }: IProps) => {
    const deletePartnerMutation = useDeletePartner();
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

    const onSubmit: SubmitHandler<IPartnerForm> = (partnerSubmited) => {
        deletePartnerMutation.mutate(
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
                                    return prevData.filter(
                                        (x) =>
                                            x.partnerId !== response?.partnerId
                                    );
                                } else {
                                    return [];
                                }
                            }
                        );
                    }
                    reset();
                    refresh();
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
                <StyledTitle>Eliminar Socio</StyledTitle>
                {error && (
                    <Alert color="danger" variant="outlined">
                        {error}
                    </Alert>
                )}
                <StyledText>
                    ¿Realmente deseas eliminar al siguiente socio?
                </StyledText>
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
                            value={partner?.name || ""}
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
                            value={partner?.document || ""}
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
                            value={partner?.contactNumber || ""}
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
                            state={
                                hasKey(errors, "partnerId")
                                    ? "error"
                                    : "success"
                            }
                            showState={hasKey(errors, "partnerId")}
                            {...register("partnerId", {
                                required: "El número de socio es requerido",
                            })}
                            value={partner?.partnerId || ""}
                        />
                    </FormGroup>
                    <Button
                        hasIcon={deletePartnerMutation.isLoading}
                        iconPosition="right"
                        type="submit"
                        color="brand2"
                        disabled={deletePartnerMutation.isLoading}
                    >
                        {deletePartnerMutation.isLoading
                            ? "Espere por favor..."
                            : "Eliminar"}
                        {deletePartnerMutation.isLoading && (
                            <Spinner size="sm" />
                        )}
                    </Button>
                </form>
            </ModalBody>
        </Modal>
    );
};

export default DeleteModal;
