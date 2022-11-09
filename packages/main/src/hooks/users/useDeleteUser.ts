import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";
import { IUser, IUserForm } from "../../@types/user";

async function deleteUser(args: IUserForm & { accessToken: string }) {
    const url = new URL(
        `${process.env.REACT_APP_BACKEND_URL ?? ""}/api/v1/user`
    );

    const headers = {
        Authorization: `Bearer ${args.accessToken}`,
        "Content-Type": "application/json",
    };

    const body = {
        id: args?.id?.toString(),
    };

    const response = await axios.delete<{ user: IUser }>(url.toString(), {
        data: body,
        headers,
    });
    return response.data.user;
}

function useDeleteUser() {
    return useMutation<IUser, AxiosError, IUserForm & { accessToken: string }>(
        (mutationVars) => deleteUser(mutationVars)
    );
}

export default useDeleteUser;
