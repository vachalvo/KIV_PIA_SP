import axios from "axios";


const baseURL = 'http://localhost:8080'

export async function fetchData(){

}

export async function postData(useCase, data) {
    axios.post(baseURL + useCase, data).then((response) => {
        return response;
    });
}