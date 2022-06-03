import axios from "axios";
import Cookies from "universal-cookie";

export function isUserAutheticated() {
    const token = new Cookies().get("token");
    return token ? token : null;
}

export async function baseAPI(method, url, data) {
    setTimeout(function () {}, 5000);
    return await axios({
        method: method,
        url: process.env.REACT_APP_LOCAL_HOST + url,
        data: data,
        headers: {
            Authorization: `Token ${isUserAutheticated()}`,
        },
    });
}
