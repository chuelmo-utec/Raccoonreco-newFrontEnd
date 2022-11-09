import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";
import { IUser, IUserForm } from "../../@types/user";

async function editUser(args: IUserForm & { accessToken: string }) {
    const url = new URL(
        `${process.env.REACT_APP_BACKEND_URL ?? ""}/api/v1/user`
    );

    const headers = {
        Authorization: `Bearer ${args.accessToken}`,
        "Content-Type": "application/json",
    };

    const body = {
        id: args.id,
        name: args.name,
        email: args.email,
        password: args.password,
        rol: args.rol,
    };

    const response = await axios.patch<{ user: IUser }>(url.toString(), body, {
        headers,
    });
    return response.data.user;
}

function useEditUser() {
    return useMutation<IUser, AxiosError, IUserForm & { accessToken: string }>(
        (mutationVars) => editUser(mutationVars)
    );
}

export default useEditUser;
