import axios from "axios";
import authHeader from "./auth-header";
import Constants from "../global/constants";

const API_URL = Constants.BASE_URL + '/wsconnection';

const userConnect = (userName) => {
    const params = {
        userName: userName,
    };
    return axios.post(API_URL + '/connect', null, { headers: authHeader(), params });
};

const userDisconnect = (userName) => {
    return axios.post(API_URL + '/disconnect', userName, { headers: authHeader() });
};

const getActive = (userName) => {
    return axios.get(API_URL + '/get-active/' + userName, { headers: authHeader() });
}

const addChatUser = (id) => {
    sessionStorage.setItem(Constants.SESSION_STORAGE_CHAT_USER_ID, JSON.stringify(id));
};

const addChatUserName = (name) => {
    sessionStorage.setItem(Constants.SESSION_STORAGE_CHAT_USER_NAME, JSON.stringify(name));
};

const getChatUserId = () => {
    return JSON.parse(sessionStorage.getItem(Constants.SESSION_STORAGE_CHAT_USER_ID));
};

const getChatUserName = () => {
    return JSON.parse(sessionStorage.getItem(Constants.SESSION_STORAGE_CHAT_USER_NAME));
};

const removeChatUserId = () => {
    sessionStorage.removeItem(Constants.SESSION_STORAGE_CHAT_USER_ID);
};

const WebSocketService = {
    userConnect, userDisconnect, getActive, addChatUser, addChatUserName, getChatUserName, getChatUserId, removeChatUserId
}
export default WebSocketService;