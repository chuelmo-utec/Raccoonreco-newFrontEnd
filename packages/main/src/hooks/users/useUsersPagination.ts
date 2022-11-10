import { useQuery, useQueryClient, UseQueryOptions } from "react-query";
import axios, { AxiosError } from "axios";
import { IAuth, IUser } from "../../@types/user";
import useRefreshToken from "../token/useRefreshToken";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth, setToken } from "../../redux/slices/auth";

async function fetchUsersPagination(args: {
    accessToken: string;
    filterByEmail?: string;
    offset: number;
}) {
    console.log(args?.filterByEmail);
    const url = args?.filterByEmail
        ? new URL(
              `${process.env.REACT_APP_BACKEND_URL ?? ""}/api/v1/users?offset=${
                  args.offset
              }&email=${args.filterByEmail}`
          )
        : new URL(
              `${process.env.REACT_APP_BACKEND_URL ?? ""}/api/v1/users?offset=${
                  args.offset
              }`
          );

    const headers = {
        Authorization: `Bearer ${args.accessToken}`,
        "Content-Type": "application/json",
    };

    const response = await axios.get<{ data: IUser[] }>(url.toString(), {
        headers,
    });
    return response.data.data;
}

function useUsersPagination<TQueryData = IUser[]>(args: {
    accessToken: string;
    offset: number;
    filterByEmail?: string;
    queryOptions?: UseQueryOptions<IUser[], AxiosError, TQueryData>;
}) {
    const queryClient = useQueryClient();
    const refreshTokenMutation = useRefreshToken();
    const dispatch = useDispatch();
    const auth = useSelector(selectAuth) as IAuth;

    return useQuery<IUser[], AxiosError, TQueryData>(
        "useUsersPagination",
        () =>
            fetchUsersPagination({
                accessToken: args.accessToken,
                filterByEmail: args.filterByEmail,
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
                                return queryClient.refetchQueries([
                                    "useUsersPagination",
                                ]);
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

export default useUsersPagination;
