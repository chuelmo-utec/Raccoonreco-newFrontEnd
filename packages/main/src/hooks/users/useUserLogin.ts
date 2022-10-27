import { useMutation } from "react-query";
import { IUserLogin, IUserLoginData } from "../../@types/user";
import axios from "axios";

async function userLogin(args: IUserLogin) {
    const url = new URL(
        `${process.env.REACT_APP_BACKEND_URL ?? ""}/api/v1/login`
    );

    const headers = { "Content-Type": "application/json" };

    const response = await axios.post<IUserLoginData>(url.toString(), args, {
        headers,
    });
    return response.data;
}

function useUserLogin() {
    return useMutation<IUserLoginData, Error, IUserLogin>((mutationVars) =>
        userLogin(mutationVars)
    );
}

export default useUserLogin;
