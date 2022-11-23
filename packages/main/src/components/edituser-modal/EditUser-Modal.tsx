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
import useEditUser from "../../hooks/users/useEditUser";
import ModalConfirmationPassword from "../token/ModalConfirmationPassword";

interface IProps {
    show: boolean;
    onClose: () => void;
    user?: IUser;
    refresh: () => void;
}

const EditModal = ({ show, onClose, user, refresh }: IProps) => {
    const editUserMutation = useEditUser();
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

    useEffect(() => {
        reset({ rol: user?.rol, email: user?.email, name: user?.name });
    }, [user]);

    const onSubmit: SubmitHandler<IUserForm> = (userSubmited) => {
        editUserMutation.mutate(
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
                                    return prevData.map((x) => {
                                        if (x.id === response.id) {
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
                <StyledTitle>Editar Usuario</StyledTitle>
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
                        <Label display="block" mb="5px" htmlFor="email">
                            Email
                        </Label>
                        <Input
                            type="email"
                            id="email"
                            placeholder="yourname@yourmail.com"
                            feedbackText={errors?.email?.message}
                            state={
                                hasKey(errors, "email") ? "error" : "success"
                            }
                            showState={hasKey(errors, "email")}
                            {...register("email", {
                                required: "El email es requerido",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: "El email no es válido",
                                },
                            })}
                        />
                    </FormGroup>
                    <FormGroup mb="20px">
                        <Label display="block" mb="5px" htmlFor="rol">
                            Rol
                        </Label>
                        <Select
                            id="rol"
                            state={hasKey(errors, "rol") ? "error" : "success"}
                            showState={hasKey(errors, "rol")}
                            feedbackText={errors?.rol?.message}
                            {...register("rol", {
                                required: "El rol es requerido",
                            })}
                        >
                            <option value="Admin">Admin</option>
                            <option value="User">User</option>
                            <option value="Guest">Guest</option>
                        </Select>
                    </FormGroup>
                    <Button
                        hasIcon={editUserMutation.isLoading}
                        iconPosition="right"
                        type="submit"
                        color="brand2"
                        disabled={editUserMutation.isLoading}
                    >
                        {editUserMutation.isLoading
                            ? "Espere por favor..."
                            : "Guardar"}
                        {editUserMutation.isLoading && <Spinner size="sm" />}
                    </Button>
                </form>
            </ModalBody>
        </Modal>
    );
};

export default EditModal;
