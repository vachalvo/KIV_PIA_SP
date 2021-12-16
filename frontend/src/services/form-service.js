import axios from "axios";
import authHeader from "./auth-header";
import Constants from "../global/constants";

const API_URL = Constants.BASE_URL + '/forms';

const validateRegistrationEmail = (email) => {
    const url = API_URL + '/registration/email';
    return axios.get(url, {
        params: {
            email: email
        },
        headers: authHeader()
    });
};

const validateLoginEmail = (email) => {
    const url = API_URL + '/login/email';

    return axios.get(url, {
        params: {
            email: email
        },
        headers: authHeader()
    });
};

const validateFirstName = (firstName) => {
    const url = API_URL + '/firstName';
    return axios.get(url, {
        params: {
            firstName: firstName
        },
        headers: authHeader()
    });
};

const validateLastName = (lastName) => {
    const url = API_URL + '/lastName';
    return axios.get(url, {
        params: {
            lastName: lastName
        },
        headers: authHeader()
    });
};

const validateGender = (gender) => {
    const url = API_URL + '/gender';
    return axios.get(url, {
        params: {
            gender: gender
        },
        headers: authHeader()
    });
};

const validatePassword = (password) => {
    const url = API_URL + '/password';
    return axios.get(url, {
        params: {
            password: password
        },
        headers: authHeader()
    });
};

const validateReEnterPassword = (reEnterPassword) => {
    const url = API_URL + '/reEnterPassword';
    return axios.get(url, {
        params: {
            reEnterPassword: reEnterPassword
        },
        headers: authHeader()
    });
};

const validateRegistrationPasswords = (password, reEnterPassword) => {
    const url = API_URL + '/passwords';
    return axios.get(url, {
        params: {
            password: password,
            reEnterPassword: reEnterPassword
        },
        headers: authHeader()
    });
};

const FormService = {
    validateLoginEmail,
    validateRegistrationEmail,
    validateGender,
    validatePassword,
    validateLastName,
    validateReEnterPassword,
    validateFirstName,
    validateRegistrationPasswords
};
export default FormService;