import axios from "axios";
import authHeader from "./auth-header";
import Constants from "../global/constants";

const API_URL = Constants.BASE_URL + '/wsconnection';

const userConnect = (userName) => {
    return axios.post(API_URL + '/userConnect', {
        userName: userName
    }, { headers: authHeader() });
};

const userDisconnect = (userName) => {
    return axios.post(API_URL + '/userDisconnect', {
        userName: userName
    }, { headers: authHeader() });
};

const getActive = (userName) => {
    return axios.get(API_URL + '/getActive/' + userName, { headers: authHeader() });
}

export default { userConnect, userDisconnect, getActive };