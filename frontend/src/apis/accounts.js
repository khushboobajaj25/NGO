import { baseAPI } from "apis/common";

export async function userRegisterAPI(username, password) {
    return await baseAPI("POST", "/user/register/", {
        username: username,
        password: password,
    });
}

export async function userLoginAPI(username, password) {
    return await baseAPI("POST", "/user/auth/", {
        username: username,
        password: password,
    });
}

