import axios from "axios";

const baseURL = 'http://localhost:8080'

export async function post (useCase, data) {
    const response = await axios.post(baseURL + useCase, data);
    console.log(response);
    return response;
}
