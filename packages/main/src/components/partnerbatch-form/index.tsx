import React, { useCallback, useEffect, useState } from "react";
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
import { IPartner, IPartnerBatchForm } from "../../@types/partners";
import ModalConfirmationPassword from "../token/ModalConfirmationPassword";
import { AxiosError } from "axios";
import { useQueryClient } from "react-query";
import useCreatePartnerBatch from "../../hooks/partners/useCreatePartnerBatch";

const PartnerForm = () => {
    const createPartnerBatchMutation = useCreatePartnerBatch();
    const [error, setErr] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [uploadFile, setUploadFile] = useState<Blob>();
    const [confirmationOpen, setConfirmationOpen] = useState<boolean>(false);
    const accessToken = useSelector(selectAuth) as IAuth;
    const queryClient = useQueryClient();

    useEffect(() => {
        return () => {
            setErr(null);
        };
    }, []);

    const submit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (uploadFile) {
                const bodyFormData = new FormData();
                bodyFormData.append("partners", uploadFile);
                createPartnerBatchMutation.mutate(
                    {
                        csvFile: bodyFormData,
                        accessToken: accessToken.access_token,
                    },
                    {
                        onSuccess: (response: IPartner[]) => {
                            if (response) {
                                setSuccess("Socios ingresados correctamente!");
                                queryClient.setQueryData<
                                    IPartner[] | undefined
                                >(
                                    "usePartners",
                                    (prevData: IPartner[] | undefined) => {
                                        if (prevData) {
                                            return [...prevData, ...response];
                                        } else {
                                            return [...response];
                                        }
                                    }
                                );
                            }
                            setErr(null);
                        },
                        onError: (err: AxiosError) => {
                            if (err.response && err.response.status === 401) {
                                setConfirmationOpen(true);
                            } else {
                                setSuccess(null);
                                setErr(
                                    "Ocurrió un error, por favor verifica que el CSV adjunto fue ingresado de la forma correcta."
                                );
                            }
                        },
                    }
                );
            } else {
                setErr("El archivo CSV es obligatorio.");
            }
        },
        [uploadFile]
    );

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
            {success && (
                <Alert color="success" variant="outlined">
                    {success}
                </Alert>
            )}
            <form
                encType="maltipart/form-data"
                action="#"
                onSubmit={(e) => {
                    submit(e);
                }}
                noValidate
            >
                <a href="/Template.csv" download>
                    Click para descargar template
                </a>
                <input
                    style={{ margin: 10, paddingTop: 5 }}
                    type="file"
                    id="imageEncoded"
                    placeholder="Subir archivo"
                    accept=".csv"
                    onChange={(e) => {
                        if (!e.target.files) return;
                        setUploadFile(e.target.files[0]);
                    }}
                />
                <Button
                    hasIcon={createPartnerBatchMutation.isLoading}
                    iconPosition="right"
                    type="submit"
                    color="brand2"
                    disabled={createPartnerBatchMutation.isLoading}
                >
                    {createPartnerBatchMutation.isLoading
                        ? "Espere por favor..."
                        : "Guardar"}
                    {createPartnerBatchMutation.isLoading && (
                        <Spinner size="sm" />
                    )}
                </Button>
            </form>
        </StyledWrap>
    );
};

export default PartnerForm;
