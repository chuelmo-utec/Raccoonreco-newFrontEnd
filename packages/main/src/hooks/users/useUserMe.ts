import { useQuery, UseQueryOptions } from "react-query";
import axios from "axios";
import { IUser } from "../../@types/user";

async function userMe(args: { accessToken: string }) {
    const url = new URL(
        `${process.env.REACT_APP_BACKEND_URL ?? ""}/api/v1/user`
    );

    const headers = {
        Authorization: `Bearer ${args.accessToken}`,
        "Content-Type": "application/json",
    };

    const response = await axios.get<IUser>(url.toString(), {
        headers,
    });
    return response.data;
}

function useUserMe<TQueryData = IUser>(args: {
    accessToken: string;
    queryOptions?: UseQueryOptions<IUser, Error, TQueryData>;
}) {
    return useQuery<IUser, Error, TQueryData>(
        "useUserMe",
        () => userMe({ accessToken: args.accessToken }),
        args.queryOptions
    );
}

export default useUserMe;
