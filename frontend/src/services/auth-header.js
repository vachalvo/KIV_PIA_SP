import Constants from "../global/constants";

export default function authHeader() {
    const user = JSON.parse(sessionStorage.getItem(Constants.USER_SESSION_STORAGE));
    console.log(user);
    if (user && user.token) {
        return { Authorization: Constants.AUTH_TYPE + ' ' + user.token };
    } else {
        return {};
    }
}