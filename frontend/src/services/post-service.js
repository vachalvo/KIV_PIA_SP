import axios from "axios";
import authHeader from "./auth-header";
import Constants from "../global/constants";

const API_URL = Constants.BASE_URL + '/posts';

const create = (data) => {
    return axios.post(API_URL + '', data, { headers: authHeader() });
};

const findAll = (count = 5) => {
    const params = {
        size: count,
        page: 0
    };
    return axios.get(API_URL + '/find-all', {
        headers: authHeader(),
        params
    });
};

const findAllByUser = (count = 5) => {
    const params = {
        size: count,
        page: 0
    };
    return axios.get(API_URL + '/find-all-by-user', {
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

const PostService = {
    create,
    editPost,
    deletePost,
    findAll,
    findAllByUser
};
export default PostService;