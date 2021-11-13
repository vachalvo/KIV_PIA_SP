import Constants from "../global/constants";

export default function authHeader() {
    const user = JSON.parse(sessionStorage.getItem(Constants.USER_SESSION_STORAGE));

    if (user && user.accessToken) {
        return { Authorization: Constants.AUTH_TYPE + ' ' + user.accessToken };
    } else {
        return {};
    }
}