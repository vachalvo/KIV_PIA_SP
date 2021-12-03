import axios from "axios";
import authHeader from "./auth-header";
import Constants from "../global/constants";

const API_URL = Constants.BASE_URL + '/posts';

const findAll = () => {
    return axios.get(API_URL + '/findAll', { headers: authHeader() });
};

export default {findAll};