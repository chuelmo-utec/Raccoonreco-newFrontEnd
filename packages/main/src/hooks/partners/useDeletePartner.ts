import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";
import { IPartner, IPartnerForm } from "../../@types/partners";

async function deletePartner(args: IPartnerForm & { accessToken: string }) {
    const url = new URL(
        `${process.env.REACT_APP_BACKEND_URL ?? ""}/api/v1/partner`
    );

    const headers = {
        Authorization: `Bearer ${args.accessToken}`,
        "Content-Type": "application/json",
    };

    const body = {
        partnerId: args.partnerId.toString(),
    };

    const response = await axios.delete<{ partner: IPartner }>(url.toString(), {
        data: body,
        headers,
    });
    return response.data.partner;
}

function useDeletePartner() {
    return useMutation<
        IPartner,
        AxiosError,
        IPartnerForm & { accessToken: string }
    >((mutationVars) => deletePartner(mutationVars));
}

export default useDeletePartner;
