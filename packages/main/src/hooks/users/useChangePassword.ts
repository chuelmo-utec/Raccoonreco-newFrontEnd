import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";
import { IUser, IUserPasswordForm } from "../../@types/user";

async function changePassword(
    args: IUserPasswordForm & { accessToken: string }
) {
    const url = new URL(
        `${process.env.REACT_APP_BACKEND_URL ?? ""}/api/v1/user/password`
    );

    const headers = {
        Authorization: `Bearer ${args.accessToken}`,
        "Content-Type": "application/json",
    };

    const body = {
        newPassword: args.newPassword,
        oldPassword: args.oldPassword,
    };

    const response = await axios.patch<{ user: IUser }>(url.toString(), body, {
        headers,
    });
    return response.data.user;
}

function useChangePassword() {
    return useMutation<
        IUser,
        AxiosError,
        IUserPasswordForm & { accessToken: string }
    >((mutationVars) => changePassword(mutationVars));
}

export default useChangePassword;
