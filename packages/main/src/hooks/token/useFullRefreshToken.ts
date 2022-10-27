import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";
import { IAuth } from "../../@types/user";

async function fetchFullRefreshToken(args: {
    password: string;
    refreshToken: string;
}) {
    const url = new URL(
        `${process.env.REACT_APP_BACKEND_URL ?? ""}/api/v1/fullRefresh`
    );

    const headers = {
        Authorization: `Bearer ${args.refreshToken}`,
        "Content-Type": "application/json",
    };

    const response = await axios.post<IAuth>(
        url.toString(),
        { password: args.password },
        {
            headers,
        }
    );
    return response.data;
}

function useFullRefreshToken() {
    return useMutation<
        IAuth,
        AxiosError,
        { password: string; refreshToken: string }
    >((mutationVars) => fetchFullRefreshToken(mutationVars));
}

export default useFullRefreshToken;
