import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";
import { IPartner, IPartnerForm } from "../../@types/partners";

async function editPartner(args: IPartnerForm & { accessToken: string }) {
    const url = new URL(
        `${process.env.REACT_APP_BACKEND_URL ?? ""}/api/v1/partner`
    );

    const headers = {
        Authorization: `Bearer ${args.accessToken}`,
        "Content-Type": "application/json",
    };

    const body = {
        id: args.id,
        partnerId: args.partnerId.toString(),
        document: args.document,
        contactNumber: args.contactNumber,
        name: args.name,
        authorized: args.authorized,
    };

    const response = await axios.patch<{ partner: IPartner }>(
        url.toString(),
        body,
        {
            headers,
        }
    );
    return response.data.partner;
}

function useEditPartner() {
    return useMutation<
        IPartner,
        AxiosError,
        IPartnerForm & { accessToken: string }
    >((mutationVars) => editPartner(mutationVars));
}

export default useEditPartner;
