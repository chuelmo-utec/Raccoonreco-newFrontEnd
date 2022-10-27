import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";
import { IPartner, IPartnerForm } from "../../@types/partners";

async function createPartner(args: IPartnerForm & { accessToken: string }) {
    const url = new URL(
        `${process.env.REACT_APP_BACKEND_URL ?? ""}/api/v1/partner`
    );

    const headers = {
        Authorization: `Bearer ${args.accessToken}`,
        "Content-Type": "application/json",
    };

    const body = {
        partnerId: args.partnerId.toString(),
        document: args.document,
        contactNumber: args.contactNumber,
        name: args.name,
    };

    const response = await axios.post<IPartner>(url.toString(), body, {
        headers,
    });
    return response.data;
}

function useCreatePartner() {
    return useMutation<
        IPartnerForm,
        AxiosError,
        IPartnerForm & { accessToken: string }
    >((mutationVars) => createPartner(mutationVars));
}

export default useCreatePartner;
