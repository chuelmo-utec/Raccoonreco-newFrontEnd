import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    FormGroup,
    Label,
    Input,
    Button,
    Spinner,
    Alert,
} from "@doar/components";
import { useForm, SubmitHandler } from "react-hook-form";
import { hasKey } from "@doar/shared/methods";
import { StyledWrap, StyledTitle, StyledDesc, StyledLabelWrap } from "./style";
import useUserLogin from "../../hooks/users/useUserLogin";
import { IAuth, IUserLogin } from "../../@types/user";
import { login, selectAuth, setToken } from "../../redux/slices/auth";
import useUserMe from "../../hooks/users/useUserMe";
import { useNavigate } from "react-router-dom";

const SigninForm = () => {
    const loginUser = useUserLogin();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IUserLogin>();
    const [error, setError] = useState<string | null>(null);
    const accessToken = useSelector(selectAuth);
    const {
        refetch,
        data,
        isLoading: isLoadingInfoUser,
    } = useUserMe({
        accessToken: accessToken?.access_token ?? "",
        queryOptions: {
            enabled: false,
        },
    });

    useEffect(() => {
        if (accessToken?.access_token) {
            refetch()
                .then(() => {
                    if (data) {
                        dispatch(login({ user: data }));
                        navigate("/home");
                    }
                })
                .catch(() => {
                    setError("Ocurrió un error, intente más tarde.");
                });
        }
    }, [accessToken?.access_token, refetch, dispatch, data, navigate]);

    const onSubmit: SubmitHandler<IUserLogin> = (user) => {
        loginUser.mutate(user, {
            onSuccess: (response: IAuth) => {
                dispatch(setToken({ auth: response }));
            },
            onError: () => {
                setError("Usuario y/o contraseña incorrectos.");
            },
        });
    };

    return (
        <StyledWrap>
            <StyledTitle>Iniciar Sesión</StyledTitle>
            <StyledDesc>
                ¡Bienvenido! Por favor, inicie sesión para continuar.
            </StyledDesc>
            {error && (
                <Alert color="danger" variant="outlined">
                    {error}
                </Alert>
            )}
            <form action="#" onSubmit={handleSubmit(onSubmit)} noValidate>
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
                    <StyledLabelWrap>
                        <Label display="block" mb="5px" htmlFor="password">
                            Contraseña
                        </Label>
                    </StyledLabelWrap>
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
                <Button
                    hasIcon={loginUser.isLoading}
                    iconPosition="right"
                    type="submit"
                    color="brand2"
                    fullwidth
                    disabled={loginUser.isLoading || isLoadingInfoUser}
                >
                    {loginUser.isLoading || isLoadingInfoUser
                        ? "Espere por favor..."
                        : "Ingresar"}
                    {loginUser.isLoading ||
                        (isLoadingInfoUser && <Spinner size="sm" />)}
                </Button>
            </form>
        </StyledWrap>
    );
};

export default SigninForm;
