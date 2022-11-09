import React, { useCallback, useMemo, useRef, useState } from "react";
import {
    CardBody,
    Heading,
    Text,
    Button,
    Alert,
    Table,
} from "@doar/components";
import Webcam from "react-webcam";
import Header from "../../../src/layouts/header";
import { StyledCard, StyledGrayBox } from "./style";
import useRecognizeFace from "../../hooks/partners/useRecognizeFacePartner";
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/slices/auth";
import { IAuth } from "../../@types/user";
import { AxiosError } from "axios";
import { IRecognizeMsg } from "../../@types/recognize";
import ModalConfirmationPassword from "../token/ModalConfirmationPassword";

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
};

const LatestActivity = () => {
    const webcamRef = useRef<Webcam>(null);
    const recognizeFaceMutation = useRecognizeFace();
    const [error, setError] = useState<string | null>(null);
    const [response, setResponse] = useState<{
        id: number;
        proximity: number;
        name: string;
    } | null>(null);
    const [confirmationOpen, setConfirmationOpen] = useState<boolean>(false);
    const accessToken = useSelector(selectAuth) as IAuth;

    const capture = useCallback(() => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            recognizeFaceMutation.mutate(
                {
                    imageEncoded: imageSrc || "",
                    accessToken: accessToken.access_token,
                },
                {
                    onSuccess: (rsp: IRecognizeMsg) => {
                        setError(null);
                        if (rsp) {
                            console.log(rsp);

                            if (
                                rsp.proximity &&
                                rsp.proximity < 0.45 &&
                                rsp.authorized
                            ) {
                                setResponse({
                                    id: rsp.id || 0,
                                    proximity: rsp.proximity,
                                    name: rsp.name || "",
                                });
                            } else {
                                setResponse({ id: 0, proximity: 1, name: "" });
                            }
                        }
                    },
                    onError: (err: AxiosError) => {
                        if (err.response && err.response.status === 401) {
                            setConfirmationOpen(true);
                        } else {
                            setError(
                                "Ocurrió un error, asegurate de que haya un rostro."
                            );
                        }
                    },
                }
            );
        }
    }, [webcamRef, accessToken]);

    return (
        <StyledCard mb={["20px", null, null, "25px"]}>
            {confirmationOpen && (
                <ModalConfirmationPassword
                    onClose={() => setConfirmationOpen(false)}
                    show={confirmationOpen}
                />
            )}
            <CardBody p={["20px", "20px", null, "25px"]} textAlign={"center"}>
                <StyledGrayBox style={{ marginBottom: "25px" }}>
                    {error && (
                        <Alert color="danger" variant="outlined">
                            {error}
                        </Alert>
                    )}
                    <Webcam
                        audio={false}
                        height="50%"
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width="80%"
                        mirrored={false}
                        videoConstraints={videoConstraints}
                    />
                </StyledGrayBox>

                <Button mb={"25px"} onClick={capture} color="brand2">
                    Reconocer
                </Button>
                {!error && response && response.proximity < 0.45 && (
                    <CardBody>
                        <Alert color="success" variant="outlined">
                            Acceso Autorizado
                        </Alert>
                        <Table>
                            <thead>
                                <tr>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Proximidad</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">{response.name}</th>
                                    <th scope="row">{response.proximity}</th>
                                </tr>
                            </tbody>
                        </Table>
                    </CardBody>
                )}

                {response && response.proximity > 0.45 && (
                    <Alert color="danger" variant="outlined">
                        Ingreso no autorizado
                    </Alert>
                )}
            </CardBody>
        </StyledCard>
    );
};

export default LatestActivity;
