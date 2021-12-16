import axios from "axios";
import authHeader from "./auth-header";
import Constants from "../global/constants";

const API_URL = Constants.BASE_URL + '/messages';

const getMessages = (firstId, secondId) => {
    const params = {
        firstId: firstId,
        secondId: secondId
    };
    return axios.get(API_URL + '/find-all', {
        headers: authHeader(),
        params
    });
};

const ChatMessageService = {getMessages};
export default ChatMessageService;