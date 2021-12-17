import Constants from "../global/constants";

export default function authHeader() {
    const token = JSON.parse(sessionStorage.getItem(Constants.SESSION_STORAGE_TOKEN));
    const headers = Constants.HEADERS;

    return token ? {
        ...headers,
        Authorization: Constants.AUTH_TYPE + ' ' + token,
    } :
        headers;
}