import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";

async function fetchRefreshToken(args: { refreshToken: string }) {
    const url = new URL(
        `${process.env.REACT_APP_BACKEND_URL ?? ""}/api/v1/refresh`
    );

    const headers = {
        Authorization: `Bearer ${args.refreshToken}`,
        "Content-Type": "application/json",
    };

    const response = await axios.put<{ access_token: string }>(
        url.toString(),
        args,
        {
            headers,
        }
    );
    return response.data;
}

function useRefreshToken() {
    return useMutation<
        { access_token: string },
        AxiosError,
        { refreshToken: string }
    >((mutationVars) => fetchRefreshToken(mutationVars));
}

export default useRefreshToken;
