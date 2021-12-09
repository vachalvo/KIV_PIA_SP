import axios from "axios";
import Constants from "../global/constants";

const API_URL = Constants.BASE_URL + '/auth';

const signup = (data) => {
    return axios.post(API_URL + "/signup", {...data});
};

const login = (data) => {
    return axios.post(API_URL + "/login", data);
};

const logout = () => {
    sessionStorage.removeItem(Constants.SESSION_STORAGE_TOKEN);
    sessionStorage.removeItem(Constants.SESSION_STORAGE_USER_ID);
    sessionStorage.removeItem(Constants.SESSION_STORAGE_TOKEN);
};

const getToken = () => {
    return JSON.parse(sessionStorage.getItem(Constants.SESSION_STORAGE_TOKEN));
};

const getCurrentUserId = () => {
    return JSON.parse(sessionStorage.getItem(Constants.SESSION_STORAGE_USER_ID));
};

export default {
    signup, login, logout, getToken, getCurrentUserId
};