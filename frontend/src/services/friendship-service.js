import axios from "axios";
import authHeader from "./auth-header";
import Constants from "../global/constants";

const API_URL = Constants.BASE_URL + '/friendship';
const TYPES = {
    request_waiting: "REQUEST_WAITING",
    friends: "FRIENDS",
    blocked: "BLOCKED"
};
const STATES = {
    accept: "ACCEPTED",
    reject: "REJECTED",
    blocked: "BLOCKED"
};

const newFriendship = (id) => {
    return axios.post(API_URL + '/new/' + id, null, { headers: authHeader() });
};

const interact = (id, state) => {
    const body = {
        friendshipId: id,
        friendshipState: state
    }
    return axios.post(API_URL + '/interact', body, { headers: authHeader() });
};

const findFriendsByType = (type, bySource = true) => {
    const params = {
        bySource: bySource
    }
    return axios.get(API_URL + '/findAll/' + type, { headers: authHeader(), params });
}

const cancel = (id) => {
    return axios
        .delete(API_URL + '/' + id, { headers: authHeader() })
        .then((response) => {
            return response.data;
        });
};

export default { STATES, TYPES, newFriendship, cancel, interact, findFriendsByType};