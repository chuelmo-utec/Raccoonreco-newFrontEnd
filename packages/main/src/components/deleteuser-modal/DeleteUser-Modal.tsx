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
import { IAuth, IUser, IUserForm } from "../../@types/user";
import { AxiosError } from "axios";
import { useQueryClient } from "react-query";
import ModalConfirmationPassword from "../token/ModalConfirmationPassword";
import useDeleteUser from "../../hooks/users/useDeleteUser";

interface IProps {
    show: boolean;
    onClose: () => void;
    user?: IUser;
    refresh: () => void;
}

const DeleteModal = ({ show, onClose, user, refresh }: IProps) => {
    const deleteUserMutation = useDeleteUser();
    const accessToken = useSelector(selectAuth) as IAuth;
    const [error, setError] = useState<string | null>(null);
    const [confirmationOpen, setConfirmationOpen] = useState<boolean>(false);
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IUserForm>({});

    const onSubmit: SubmitHandler<IUserForm> = (userSubmited) => {
        deleteUserMutation.mutate(
            {
                id: user?.id,
                ...userSubmited,
                accessToken: accessToken.access_token,
            },
            {
                onSuccess: (response: IUser) => {
                    if (response) {
                        queryClient.setQueryData<IUser[] | undefined>(
                            "useUsers",
                            (prevData: IUser[] | undefined) => {
                                if (prevData) {
                                    return prevData.filter(
                                        (x) => x.id !== response?.id
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
                <StyledTitle>Eliminar Usuario</StyledTitle>
                {error && (
                    <Alert color="danger" variant="outlined">
                        {error}
                    </Alert>
                )}
                <StyledText>
                    ¿Realmente deseas eliminar al siguiente usuario?
                </StyledText>
                <form action="#" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <FormGroup mb="20px">
                        <Label display="block" mb="5px" htmlFor="partnerId">
                            ID
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
                            {...register("id", {
                                required: "El número de socio es requerido",
                            })}
                            value={user?.id || ""}
                        />
                    </FormGroup>
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
                            value={user?.name || ""}
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
                            {...register("email", {
                                required: "El documento es requerido",
                            })}
                            value={user?.email || ""}
                        />
                    </FormGroup>
                    <FormGroup mb="20px">
                        <Label display="block" mb="5px" htmlFor="contactNumber">
                            Rol
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
                            {...register("rol", {
                                required: "El número de contacto es requerido",
                            })}
                            value={user?.rol || ""}
                        />
                    </FormGroup>
                    <Button
                        hasIcon={deleteUserMutation.isLoading}
                        iconPosition="right"
                        type="submit"
                        color="brand2"
                        disabled={deleteUserMutation.isLoading}
                    >
                        {deleteUserMutation.isLoading
                            ? "Espere por favor..."
                            : "Eliminar"}
                        {deleteUserMutation.isLoading && <Spinner size="sm" />}
                    </Button>
                </form>
            </ModalBody>
        </Modal>
    );
};

export default DeleteModal;
