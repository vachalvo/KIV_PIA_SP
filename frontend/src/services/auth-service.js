import axios from "axios";
import Constants from "../global/constants";

const API_URL = Constants.BASE_URL + '/auth';

const signup = (data) => {
    return axios.post(API_URL + "/signup", data);
};

const login = (data) => {
    return axios
        .post(API_URL + "/login", data)
        .then((response) => {
            console.log(response);
            if (response.data.token) {
                sessionStorage.setItem(Constants.USER_SESSION_STORAGE, JSON.stringify(response.data));
            }

            return response.data;
        });
};

const logout = () => {
    sessionStorage.removeItem(Constants.USER_SESSION_STORAGE);
};

const getCurrentUser = () => {
    return JSON.parse(sessionStorage.getItem(Constants.USER_SESSION_STORAGE));
};


export default {
    signup, login, logout, getCurrentUser
};