import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    CardBody,
    Heading,
    Text,
    Button,
    Modal,
    ModalBody,
    Alert,
    Checkbox,
    Input,
} from "@doar/components";
import Webcam from "react-webcam";
import Header from "../header";
import { StyledCard, StyledGrayBox } from "./style";
import { IPartner } from "../../../@types/partners";
import {
    StyledClose,
    StyledTitle,
} from "../../../components/editpartner-modal/style";
import { X } from "react-feather";
import useInsertFace from "../../../hooks/partners/useInsertFacePartner";
import { useSelector } from "react-redux";
import { selectAuth } from "../../../redux/slices/auth";
import { IAuth } from "../../../@types/user";

import { AxiosError } from "axios";
import { IRecognizeMsg } from "../../../@types/recognize";
import ModalConfirmationPassword from "../../../components/token/ModalConfirmationPassword";

interface IProps {
    show: boolean;
    onClose: () => void;
    partner?: IPartner;
}

const InsertFace = ({ show, onClose, partner }: IProps) => {
    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user",
    };
    const webcamRef = useRef<Webcam>(null);
    const insertFaceMutation = useInsertFace();
    const [error, setError] = useState<string | null>(null);
    const [confirmationOpen, setConfirmationOpen] = useState<boolean>(false);
    const [uploadedImage, setUploadedImage] = useState("");
    const [useWebcam, setUseWebcam] = useState(true);
    const accessToken = useSelector(selectAuth) as IAuth;

    const convertBase64 = (file: Blob) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (err) => {
                reject(err);
            };
        });
    };

    const handleFileRead = async (event: Blob) => {
        const file = event;
        const base64 = await convertBase64(file);
        setUploadedImage(String(base64));
    };

    const capture = useCallback(
        (ptr: IPartner | undefined) => {
            let imageSrc = "";
            if (webcamRef.current) {
                if (useWebcam) {
                    imageSrc = webcamRef.current.getScreenshot() || "";
                }
            } else if (uploadedImage !== "") {
                imageSrc = uploadedImage;
            }

            if (imageSrc && imageSrc !== "") {
                insertFaceMutation.mutate(
                    {
                        id: ptr?.id || 0,
                        imageEncoded: imageSrc,
                        name: ptr?.name || "",
                        accessToken: accessToken.access_token,
                    },
                    {
                        onSuccess: (response: IRecognizeMsg) => {
                            if (response) {
                                console.log(response);
                            }
                            onClose();
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
            } else {
                setError("Asegurate de ingresar una foto.");
            }
        },
        [webcamRef, uploadedImage, accessToken]
    );

    return (
        <Modal show={show} onClose={onClose} size={"xl"}>
            {confirmationOpen && (
                <ModalConfirmationPassword
                    onClose={() => setConfirmationOpen(false)}
                    show={confirmationOpen}
                />
            )}
            <ModalBody>
                <StyledClose onClose={onClose}>
                    <X size={20} />
                </StyledClose>
                <StyledTitle>Insertar Rostro</StyledTitle>
                {error && (
                    <Alert color="danger" variant="outlined">
                        {error}
                    </Alert>
                )}
                <CardBody
                    p={["20px", "20px", null, "25px"]}
                    textAlign={"center"}
                >
                    <Text mb="20px">Subir imagen</Text>
                    <StyledGrayBox>
                        <Checkbox
                            id="checkbox1"
                            name="checkbox1"
                            label="Utilizar Webcam"
                            checked={useWebcam}
                            onChange={(e) => {
                                setUseWebcam((prev) => !prev);
                            }}
                        />
                        {useWebcam && (
                            <Webcam
                                audio={false}
                                height="50%"
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                width="50%"
                                mirrored={false}
                                videoConstraints={videoConstraints}
                            />
                        )}
                        {!useWebcam && (
                            <input
                                type="file"
                                id="imageEncoded"
                                placeholder="Subir archivo"
                                accept="image/*"
                                onChange={async (e) => {
                                    if (!e.target.files) return;
                                    await handleFileRead(e.target.files[0]);
                                }}
                            />
                        )}
                    </StyledGrayBox>

                    <Button
                        mt={25}
                        onClick={() => {
                            capture(partner);
                        }}
                        color="brand2"
                    >
                        Tomar foto
                    </Button>
                </CardBody>
            </ModalBody>
        </Modal>
    );
};

export default InsertFace;
