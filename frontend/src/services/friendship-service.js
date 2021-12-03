import axios from "axios";
import authHeader from "./auth-header";
import Constants from "../global/constants";

const API_URL = Constants.BASE_URL + '/friendship';
const TYPES = {

}
const newFriendship = (id) => {
    return axios.get(API_URL + '/' + id, { headers: authHeader() });
};

const interact = (id) => {
    return axios.get(API_URL + '/' + id, { headers: authHeader() });
};

const findFriendsByType = (type) => {
    return axios.get(API_URL + '/findAll/' + type, { headers: authHeader() });
}

const deleteFriendship = (id) => {
    return axios
        .delete(API_URL + "/", id)
        .then((response) => {
            console.log(response);
            return response.data;
        });
};

export default {newFriendship, deleteFriendship, interact};