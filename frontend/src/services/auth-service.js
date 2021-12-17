import axios from "axios";
import Constants from "../global/constants";

const API_URL = Constants.BASE_URL + '/auth';

const signup = (data) => {
    return axios.post(API_URL + "/signup", {...data}, { headers: Constants.HEADERS });
};

const login = (data) => {
    return axios.post(API_URL + "/login", data, { headers: Constants.HEADERS });
};

const logout = () => {
    sessionStorage.removeItem(Constants.SESSION_STORAGE_TOKEN);
    sessionStorage.removeItem(Constants.SESSION_STORAGE_USER_ID);
    sessionStorage.removeItem(Constants.SESSION_STORAGE_ADMIN);
    sessionStorage.removeItem(Constants.SESSION_STORAGE_USER);
    sessionStorage.removeItem(Constants.SESSION_STORAGE_CHAT_USER_ID);
    sessionStorage.removeItem(Constants.SESSION_STORAGE_CHAT_USER_NAME);
};

const getToken = () => {
    return JSON.parse(sessionStorage.getItem(Constants.SESSION_STORAGE_TOKEN));
};

const getCurrentUserId = () => {
    return JSON.parse(sessionStorage.getItem(Constants.SESSION_STORAGE_USER_ID));
};

const getCurrentUser = () => {
    return JSON.parse(sessionStorage.getItem(Constants.SESSION_STORAGE_USER));
};

const AuthService = {
    signup, login, logout, getToken, getCurrentUserId, getCurrentUser
};
export default AuthService;