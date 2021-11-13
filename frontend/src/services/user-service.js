import axios from "axios";
import authHeader from "./auth-header";
import Constants from "../global/constants";

const API_URL = Constants.BASE_URL + '/users';

const UserService = () => {
    const getUser = (id) => {
        return axios.get(API_URL + '/' + id, { headers: authHeader() });
    };
}


export default UserService;