import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FormGroup, Label, Input, Button, Alert } from "@doar/components";
import { useForm, SubmitHandler } from "react-hook-form";
import { hasKey } from "@doar/shared/methods";
import { StyledWrap } from "./style";
import { IAuth } from "../../@types/user";
import { selectAuth } from "../../redux/slices/auth";
import { IPartnerForm } from "../../@types/partners";
import useCreatePartner from "../../hooks/partners/useCreatePartner";
import ModalConfirmationPassword from "../token/ModalConfirmationPassword";
import { AxiosError } from "axios";

const PartnerForm = () => {
    const createPartnerMutation = useCreatePartner();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IPartnerForm>();
    const [error, setError] = useState<string | null>(null);
    const [confirmationOpen, setConfirmationOpen] = useState<boolean>(false);
    const accessToken = useSelector(selectAuth) as IAuth;

    useEffect(() => {
        return () => {
            setError(null);
        };
    }, []);

    const onSubmit: SubmitHandler<IPartnerForm> = (partner) => {
        console.log(partner);
        createPartnerMutation.mutate(
            {
                ...partner,
                accessToken: accessToken.access_token,
            },
            {
                onSuccess: () => {
                    reset();
                },
                onError: (err: AxiosError) => {
                    if (err.response && err.response.status === 401) {
                        setConfirmationOpen(true);
                    } else {
                        setError("Ocurrió un error, intente más tarde.");
                    }
                    console.log("aca error", err);
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
                    <Label display="block" mb="5px" htmlFor="email">
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
                        Documento
                    </Label>
                    <Input
                        type="text"
                        id="document"
                        placeholder="Documento"
                        feedbackText={errors?.name?.message}
                        state={hasKey(errors, "document") ? "error" : "success"}
                        showState={hasKey(errors, "document")}
                        {...register("document", {
                            required: "El documento es requerido",
                        })}
                    />
                </FormGroup>
                <FormGroup mb="20px">
                    <Label display="block" mb="5px" htmlFor="email">
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
                    <Label display="block" mb="5px" htmlFor="email">
                        Número de Socio
                    </Label>
                    <Input
                        type="number"
                        id="partnerId"
                        placeholder="Número de Socio"
                        feedbackText={errors?.name?.message}
                        state={
                            hasKey(errors, "partnerId") ? "error" : "success"
                        }
                        showState={hasKey(errors, "partnerId")}
                        {...register("partnerId", {
                            required: "El número de socio es requerido",
                        })}
                    />
                </FormGroup>
                <Button
                    hasIcon={createPartnerMutation.isLoading}
                    iconPosition="right"
                    type="submit"
                    color="brand2"
                    disabled={createPartnerMutation.isLoading}
                >
                    Guardar
                </Button>
            </form>
        </StyledWrap>
    );
};

export default PartnerForm;
