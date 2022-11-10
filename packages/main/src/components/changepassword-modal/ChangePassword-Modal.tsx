import { useState } from "react";
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
} from "@doar/components";
import { StyledClose, StyledTitle } from "./style";
import { useForm, SubmitHandler } from "react-hook-form";
import { hasKey } from "@doar/shared/methods";
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/slices/auth";
import { IAuth, IUserPasswordForm, IUser } from "../../@types/user";
import { AxiosError } from "axios";
import ModalConfirmationPassword from "../token/ModalConfirmationPassword";
import useChangePassword from "../../hooks/users/useChangePassword";

interface IProps {
    show: boolean;
    onClose: () => void;
}

const ChangePasswordModal = ({ show, onClose }: IProps) => {
    const changePasswordMutation = useChangePassword();
    const accessToken = useSelector(selectAuth) as IAuth;
    const [error, setError] = useState<string | null>(null);
    const [confirmationOpen, setConfirmationOpen] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IUserPasswordForm>({});

    const onSubmit: SubmitHandler<IUserPasswordForm> = (userInfoSubmited) => {
        changePasswordMutation.mutate(
            {
                ...userInfoSubmited,
                accessToken: accessToken.access_token,
            },
            {
                onSuccess: (response: IUser) => {
                    if (response) {
                        setError(null);
                        reset();
                        onClose();
                    }
                },
                onError: (err: AxiosError) => {
                    if (err.response && err.response.status === 401) {
                        setConfirmationOpen(true);
                    } else if (err.response && err.response.status === 409) {
                        setError("Las contraseñas no coinciden.");
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
                <StyledTitle>Cambiar contraseña</StyledTitle>
                {error && (
                    <Alert color="danger" variant="outlined">
                        {error}
                    </Alert>
                )}
                <form action="#" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <FormGroup mb="20px">
                        <Label display="block" mb="5px" htmlFor="name">
                            Contraseña anterior
                        </Label>
                        <Input
                            type="password"
                            id="oldPassword"
                            placeholder="Contraseña Anterior"
                            feedbackText={errors?.oldPassword?.message}
                            state={
                                hasKey(errors, "oldPassword")
                                    ? "error"
                                    : "success"
                            }
                            showState={hasKey(errors, "oldPassword")}
                            {...register("oldPassword", {
                                required:
                                    "La contraseña anterior es obligatoria",
                            })}
                        />
                    </FormGroup>
                    <FormGroup mb="20px">
                        <Label display="block" mb="5px" htmlFor="document">
                            Nueva contraseña
                        </Label>
                        <Input
                            type="password"
                            id="newPassword"
                            placeholder="Contraseña Nueva"
                            feedbackText={errors?.newPassword?.message}
                            state={
                                hasKey(errors, "newPassword")
                                    ? "error"
                                    : "success"
                            }
                            showState={hasKey(errors, "newPassword")}
                            {...register("newPassword", {
                                required: "La nueva contraseña es obligatoria",
                            })}
                        />
                    </FormGroup>
                    <Button
                        hasIcon={changePasswordMutation.isLoading}
                        iconPosition="right"
                        type="submit"
                        color="brand2"
                        disabled={changePasswordMutation.isLoading}
                    >
                        {changePasswordMutation.isLoading
                            ? "Espere por favor..."
                            : "Guardar"}
                        {changePasswordMutation.isLoading && (
                            <Spinner size="sm" />
                        )}
                    </Button>
                </form>
            </ModalBody>
        </Modal>
    );
};

export default ChangePasswordModal;
