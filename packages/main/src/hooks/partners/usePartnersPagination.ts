import { useQuery, useQueryClient, UseQueryOptions } from "react-query";
import axios, { AxiosError } from "axios";
import { IPartner } from "../../@types/partners";
import { selectAuth, setToken } from "../../redux/slices/auth";
import useRefreshToken from "../token/useRefreshToken";
import { useDispatch, useSelector } from "react-redux";
import { IAuth } from "../../@types/user";

async function fetchPartnersPagination(args: {
    accessToken: string;
    offset: number;
}) {
    const url = new URL(
        `${process.env.REACT_APP_BACKEND_URL ?? ""}/api/v1/partners?offset=${
            args.offset
        }`
    );

    const headers = {
        Authorization: `Bearer ${args.accessToken}`,
        "Content-Type": "application/json",
    };

    const response = await axios.get<{ data: IPartner[] }>(url.toString(), {
        headers,
    });
    return response.data.data;
}

function usePartnersPagination<TQueryData = IPartner[]>(args: {
    accessToken: string;
    offset: number;
    queryOptions?: UseQueryOptions<IPartner[], AxiosError, TQueryData>;
}) {
    const queryClient = useQueryClient();
    const refreshTokenMutation = useRefreshToken();
    const dispatch = useDispatch();
    const auth = useSelector(selectAuth) as IAuth;

    return useQuery<IPartner[], AxiosError, TQueryData>(
        "usePartnersPagination",
        () =>
            fetchPartnersPagination({
                accessToken: args.accessToken,
                offset: args.offset,
            }),
        {
            onError: (error: AxiosError) => {
                if (error.response && error.response.status === 401) {
                    refreshTokenMutation.mutate(
                        { refreshToken: auth.refresh_token },
                        {
                            onSuccess: (response) => {
                                dispatch(
                                    setToken({
                                        auth: {
                                            ...auth,
                                            access_token: response.access_token,
                                        },
                                    })
                                );
                                queryClient.clear();
                                return queryClient.refetchQueries(["useUsers"]);
                            },
                        }
                    );
                }
            },
            retry: 1,
            ...args.queryOptions,
        }
    );
}

export default usePartnersPagination;
