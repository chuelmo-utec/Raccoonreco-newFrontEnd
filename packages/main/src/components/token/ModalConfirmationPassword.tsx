import React, { useState } from "react";
import { X } from "react-feather";
import {
    Modal,
    ModalBody,
    Input,
    InputGroup,
    InputGroupAddon,
    Button,
    Alert,
} from "@doar/components";
import { StyledClose, StyledTitle, StyledText } from "./style";
import { useForm } from "react-hook-form";
import { hasKey } from "@doar/shared/methods";
import useFullRefreshToken from "../../hooks/token/useFullRefreshToken";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth, setToken } from "../../redux/slices/auth";
import { IAuth } from "../../@types/user";
import { AxiosError } from "axios";

interface IProps {
    show: boolean;
    onClose: () => void;
}

const ModalConfirmationPassword = ({ show, onClose }: IProps) => {
    const fullRefreshToken = useFullRefreshToken();
    const accessToken = useSelector(selectAuth) as IAuth;
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<{ password: string }>();

    const onSave = (data: { password: string }) => {
        fullRefreshToken.mutate(
            {
                password: data.password,
                refreshToken: accessToken.refresh_token,
            },
            {
                onSuccess: (response: IAuth) => {
                    dispatch(setToken({ auth: response }));
                    onClose();
                },
                onError: (err: AxiosError) => {
                    if (err.response && err.response.status === 401) {
                        setError("Contraseña incorrecta");
                    } else {
                        setError("Ocurrió un error, intente más tarde");
                    }
                },
            }
        );
    };

    return (
        <Modal show={show} onClose={onClose}>
            <ModalBody p={["20px", "30px"]}>
                <StyledClose onClose={onClose}>
                    <X size={20} />
                </StyledClose>
                <StyledTitle>Solicitar Permiso</StyledTitle>
                {error && (
                    <Alert color="danger" variant="outlined">
                        {error}
                    </Alert>
                )}
                <StyledText>
                    Ingresa tu contraseña para confirmar que sos tú.
                </StyledText>
                <form action="#" onSubmit={handleSubmit(onSave)} noValidate>
                    <InputGroup mb="5px">
                        <Input
                            type="password"
                            id="password"
                            placeholder="Contraseña"
                            feedbackText={errors?.password?.message}
                            state={
                                hasKey(errors, "password") ? "error" : "success"
                            }
                            showState={hasKey(errors, "password")}
                            {...register("password", {
                                required: "La contraseña es requerida",
                            })}
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

export default ModalConfirmationPassword;
