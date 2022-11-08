import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    FormGroup,
    Label,
    Input,
    Button,
    Alert,
    Spinner,
} from "@doar/components";
import { useForm, SubmitHandler } from "react-hook-form";
import { hasKey } from "@doar/shared/methods";
import { StyledWrap } from "./style";
import { IAuth } from "../../@types/user";
import { selectAuth } from "../../redux/slices/auth";
import { IPartner, IPartnerForm } from "../../@types/partners";
import useCreatePartner from "../../hooks/partners/useCreatePartner";
import ModalConfirmationPassword from "../token/ModalConfirmationPassword";
import { AxiosError } from "axios";
import { useQueryClient } from "react-query";

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
    const queryClient = useQueryClient();

    useEffect(() => {
        return () => {
            setError(null);
        };
    }, []);

    const onSubmit: SubmitHandler<IPartnerForm> = (partner) => {
        createPartnerMutation.mutate(
            {
                ...partner,
                accessToken: accessToken.access_token,
            },
            {
                onSuccess: (response: IPartner) => {
                    if (response) {
                        queryClient.setQueryData<IPartner[] | undefined>(
                            "usePartners",
                            (prevData: IPartner[] | undefined) => {
                                if (prevData) {
                                    return [...prevData, response];
                                } else {
                                    return [response];
                                }
                            }
                        );
                    }
                    reset();
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
                    <Label display="block" mb="5px" htmlFor="document">
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
                    {createPartnerMutation.isLoading
                        ? "Espere por favor..."
                        : "Guardar"}
                    {createPartnerMutation.isLoading && <Spinner size="sm" />}
                </Button>
            </form>
        </StyledWrap>
    );
};

export default PartnerForm;