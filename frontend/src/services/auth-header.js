import Constants from "../global/constants";

export default function authHeader() {
    const token = JSON.parse(sessionStorage.getItem(Constants.SESSION_STORAGE_TOKEN));

    if (token) {
        return { Authorization: Constants.AUTH_TYPE + ' ' + token };
    } else {
        return {};
    }
}