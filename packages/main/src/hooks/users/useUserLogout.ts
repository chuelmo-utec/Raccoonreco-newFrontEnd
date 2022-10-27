import { useMutation } from "react-query";
import { IAuth } from "../../@types/user";
import axios from "axios";

async function userLogout(args: IAuth) {
    const url = new URL(
        `${process.env.REACT_APP_BACKEND_URL ?? ""}/api/v1/logout`
    );

    const headers = {
        Authorization: `Bearer ${args.refresh_token}`,
        "Content-Type": "application/json",
    };

    const response = await axios.post<{ msg: string }>(url.toString(), args, {
        headers,
        data: { token: args.access_token },
    });
    return response.data;
}

function useUserLogout() {
    return useMutation<{ msg: string }, Error, IAuth>((mutationVars) =>
        userLogout(mutationVars)
    );
}

export default useUserLogout;
