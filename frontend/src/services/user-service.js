import axios from "axios";
import authHeader from "./auth-header";
import Constants from "../global/constants";

const API_URL = Constants.BASE_URL + '/users';

const getUser = (id) => {
    return axios.get(API_URL + '/' + id, { headers: authHeader() });
};

const promote = (id) => {
    return axios.put(API_URL + '/promote/' + id, null, { headers: authHeader() });
};

const demote = (id) => {
    return axios.put(API_URL + '/demote/' + id, null, { headers: authHeader() });
};

const isAdmin = () => {
    return axios.get(API_URL + '/isAdmin', { headers: authHeader() });
};

const findUsersByName = (name) => {
    return axios.get(API_URL + "/findAll/" + name, { headers: authHeader() });
};

const isUserAdmin = () => {
    return JSON.parse(sessionStorage.getItem(Constants.SESSION_STORAGE_ADMIN));
};

export default { getUser, findUsersByName, promote, demote, isUserAdmin, isAdmin };