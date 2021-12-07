import axios from "axios";
import authHeader from "./auth-header";
import Constants from "../global/constants";

const API_URL = Constants.BASE_URL + '/posts';
const PAGE_SIZE = 3;

const create = (data) => {
    return axios.post(API_URL + '/create', data, { headers: authHeader() });
};

const findAll = (page = 0) => {
    const params = {
        size: PAGE_SIZE,
        page: page
    };
    return axios.get(API_URL + '/findAll', {
        headers: authHeader(),
        params
    });
};

const findAllByUser = (page = 0) => {
    const params = {
        size: PAGE_SIZE,
        page: page
    };
    return axios.get(API_URL + '/findAllByUser', {
        headers: authHeader(),
        params
    });
};

const editPost = (id, header, content) => {
    return axios.put(API_URL + '/' + id, {
        header,
        content
    }, {
        headers: authHeader()
    });
};

const deletePost = (id) => {
    return axios.delete(API_URL + '/' + id, { headers: authHeader() });
};

export default {create, editPost, deletePost, findAll, findAllByUser};