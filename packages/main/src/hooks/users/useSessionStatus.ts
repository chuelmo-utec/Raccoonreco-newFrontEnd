import { useQuery, UseQueryOptions } from "react-query";
import axios from "axios";

async function sessionStatus(args: { refreshToken: string }) {
    const url = new URL(
        `${process.env.REACT_APP_BACKEND_URL ?? ""}/api/v1/status`
    );

    const headers = {
        Authorization: `Bearer ${args.refreshToken}`,
        "Content-Type": "application/json",
    };

    const response = await axios.get<{ alive: boolean }>(url.toString(), {
        headers,
    });
    return response.data;
}

function useSessionStatus<TQueryData = { alive: boolean }>(args: {
    refreshToken: string;
    queryOptions?: UseQueryOptions<{ alive: boolean }, Error, TQueryData>;
}) {
    return useQuery<{ alive: boolean }, Error, TQueryData>(
        "useSessionStatus",
        () => sessionStatus({ refreshToken: args.refreshToken }),
        args.queryOptions
    );
}

export default useSessionStatus;
