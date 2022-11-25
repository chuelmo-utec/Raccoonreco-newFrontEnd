import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    FormGroup,
    Label,
    Input,
    Button,
    Alert,
    Select,
    Spinner,
} from "@doar/components";
import { useForm, SubmitHandler } from "react-hook-form";
import { hasKey } from "@doar/shared/methods";
import { StyledWrap } from "./style";
import { IAuth, IUser, IUserForm } from "../../@types/user";
import { selectAuth } from "../../redux/slices/auth";
import ModalConfirmationPassword from "../token/ModalConfirmationPassword";
import { AxiosError } from "axios";
import useCreateUser from "../../hooks/users/useCreateUser";
import { useQueryClient } from "react-query";

const UserForm = () => {
    const createUserMutation = useCreateUser();
    const queryClient = useQueryClient();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        getValues,
        setError,
    } = useForm<IUserForm & { confirmPassword: string }>();
    const [error, setErr] = useState<string | null>(null);
    const [confirmationOpen, setConfirmationOpen] = useState<boolean>(false);
    const accessToken = useSelector(selectAuth) as IAuth;

    useEffect(() => {
        return () => {
            setErr(null);
        };
    }, []);

    console.log(queryClient.getQueryData("useUsers"));

    const onSubmit: SubmitHandler<IUserForm> = (user) => {
        createUserMutation.mutate(
            {
                ...user,
                accessToken: accessToken.access_token,
            },
            {
                onSuccess: (response: IUser) => {
                    console.log("aca response", response);
                    if (response) {
                        queryClient.setQueryData<IUser[] | undefined>(
                            "useUsers",
                            (prevData: IUser[] | undefined) => {
                                if (prevData) {
                                    return [...prevData, response];
                                } else {
                                    return [response];
                                }
                            }
                        );
                    }
                    setErr(null);
                    reset();
                },
                onError: (err: AxiosError) => {
                    if (err.response && err.response.status === 401) {
                        setConfirmationOpen(true);
                    } else if (err.response && err.response.status === 409) {
                        setErr("El correo ingresado ya esta en uso.");
                        setError("email", {
                            message: "El correo ingresado ya esta en uso.",
                        });
                    } else {
                        setErr("Ocurrió un error, intente más tarde.");
                    }
                },
            }
        );
    };

    return (
        <StyledWrap>
            {confirmationOpen && (
                <ModalConfirmationPassword
                    onClose={() => setConfirmationOpen(false)}
                    show={confirmationOpen}
                />
            )}
            {error && (
                <Alert color="danger" variant="outlined">
                    {error}
                </Alert>
            )}
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
                        state={hasKey(errors, "email") ? "error" : "success"}
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
                    <Label display="block" mb="5px" htmlFor="password">
                        Contraseña
                    </Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="Ingresa tu contraseña"
                        feedbackText={errors?.password?.message}
                        state={hasKey(errors, "password") ? "error" : "success"}
                        showState={hasKey(errors, "password")}
                        {...register("password", {
                            required: "La contraseña es requerida",
                        })}
                    />
                </FormGroup>
                <FormGroup mb="20px">
                    <Label display="block" mb="5px" htmlFor="confirm-password">
                        Verificar Contraseña
                    </Label>
                    <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirma la contraseña"
                        feedbackText={errors?.confirmPassword?.message}
                        state={
                            hasKey(errors, "confirmPassword")
                                ? "error"
                                : "success"
                        }
                        showState={hasKey(errors, "confirmPassword")}
                        {...register("confirmPassword", {
                            required: "Debe verificar la contraseña",
                            validate: (value) => {
                                const { password } = getValues();
                                return (
                                    password === value ||
                                    "Las contraseñas no coinciden"
                                );
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
                    hasIcon={createUserMutation.isLoading}
                    iconPosition="right"
                    type="submit"
                    color="brand2"
                    disabled={createUserMutation.isLoading}
                >
                    {createUserMutation.isLoading
                        ? "Espere por favor..."
                        : "Guardar"}
                    {createUserMutation.isLoading && <Spinner size="sm" />}
                </Button>
            </form>
        </StyledWrap>
    );
};

export default UserForm;
