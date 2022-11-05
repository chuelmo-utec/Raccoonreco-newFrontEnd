import React, { useCallback, useMemo, useRef, useState } from "react";
import { CardBody, Heading, Text, Button } from "@doar/components";
import Webcam from "react-webcam";
import Header from "../header";
import { StyledCard, StyledGrayBox } from "./style";

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
};

const LatestActivity = () => {
    const webcamRef = useRef<Webcam>(null);
    const [prevImage, setPrevImage] = useState<string | null>();

    const capture = useCallback(() => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            setPrevImage(imageSrc);
            console.log(imageSrc);
        }
    }, [webcamRef]);

    return (
        <StyledCard mb={["20px", null, null, "25px"]}>
            <Header>
                <Heading tt="uppercase" fontWeight="600" mb="0px">
                    Latest Activity
                </Heading>
            </Header>
            <CardBody p={["20px", "20px", null, "25px"]}>
                <Text mb="20px">Subir imagen de partner</Text>
                <StyledGrayBox>
                    <Webcam
                        audio={false}
                        height="50%"
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width="50%"
                        mirrored={false}
                        videoConstraints={videoConstraints}
                    />
                </StyledGrayBox>
                <StyledGrayBox>
                    {prevImage && <img src={prevImage} alt="Red dot" />}
                </StyledGrayBox>
                <Button onClick={capture} color="brand2">
                    Tomar foto
                </Button>
            </CardBody>
        </StyledCard>
    );
};

export default LatestActivity;
