import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";
import { IPartner, IPartnerBatchForm } from "../../@types/partners";

async function createPartnerBatch(
    args: IPartnerBatchForm & { accessToken: string }
) {
    const url = new URL(
        `${process.env.REACT_APP_BACKEND_URL ?? ""}/api/v1/partner/batch`
    );

    const headers = {
        Authorization: `Bearer ${args.accessToken}`,
        "Content-Type": "multipart/form-data",
    };

    const response = await axios.post<{ partner: IPartner[] }>(
        url.toString(),
        args.csvFile,
        {
            headers,
        }
    );
    return response.data.partner;
}

function useCreatePartnerBatch() {
    return useMutation<
        IPartner[],
        AxiosError,
        IPartnerBatchForm & { accessToken: string }
    >((mutationVars) => createPartnerBatch(mutationVars));
}

export default useCreatePartnerBatch;
