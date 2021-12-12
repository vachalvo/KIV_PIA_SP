import Constants from "../global/constants";

export default function authHeader() {
    const token = JSON.parse(sessionStorage.getItem(Constants.SESSION_STORAGE_TOKEN));
    const headers = {};

    if (token) {
        return {
            ...headers,
            Authorization: Constants.AUTH_TYPE + ' ' + token,
            'X-Authorization': Constants.AUTH_TYPE + ' ' + token,
        };
    }

    return headers;
}