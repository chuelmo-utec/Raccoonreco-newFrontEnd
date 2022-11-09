import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";
import { IPartner, IPartnerForm } from "../../@types/partners";
import { IFaceForm } from "../../@types/face";
import { IRecognizeMsg } from "../../@types/recognize";

async function RecognizeFace(args: IFaceForm & { accessToken: string }) {
    const url = new URL(
        `${process.env.REACT_APP_BACKEND_URL ?? ""}/api/v1/face`
    );

    const headers = {
        Authorization: `Bearer ${args.accessToken}`,
        "Content-Type": "application/json",
    };

    const body = {
        imageEncoded: args.imageEncoded,
    };

    const response = await axios.put<IRecognizeMsg>(url.toString(), body, {
        headers,
    });
    return response.data;
}

function useRecognizeFace() {
    return useMutation<
        IRecognizeMsg,
        AxiosError,
        IFaceForm & { accessToken: string }
    >((mutationVars) => RecognizeFace(mutationVars));
}

export default useRecognizeFace;
