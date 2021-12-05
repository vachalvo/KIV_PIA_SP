import axios from "axios";
import authHeader from "./auth-header";
import Constants from "../global/constants";

const API_URL = Constants.BASE_URL + '/users';

const getUser = (id) => {
    return axios.get(API_URL + '/' + id, { headers: authHeader() });
};

const findUsersByName = (name) => {
    return axios.get(API_URL + "/findAll/" + name, { headers: authHeader() });
};

export default { getUser, findUsersByName };