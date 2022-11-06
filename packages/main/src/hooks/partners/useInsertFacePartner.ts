import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";
import { IPartner, IPartnerForm } from "../../@types/partners";
import { IFaceForm } from "../../@types/face";
import { IRecognizeMsg } from "../../@types/recognize";

async function InsertFace(args: IFaceForm & { accessToken: string }) {
    const url = new URL(
        `${process.env.REACT_APP_BACKEND_URL ?? ""}/api/v1/face`
    );

    const headers = {
        Authorization: `Bearer ${args.accessToken}`,
        "Content-Type": "application/json",
    };

    const body = {
        imageEncoded: args.imageEncoded,
        name: args.name,
        partnerId: args.id,
    };

    const response = await axios.post<IRecognizeMsg>(url.toString(), body, {
        headers,
    });
    return response.data;
}

function useInsertFace() {
    return useMutation<
        IRecognizeMsg,
        AxiosError,
        IFaceForm & { accessToken: string }
    >((mutationVars) => InsertFace(mutationVars));
}

export default useInsertFace;
