import axios from 'axios';

const API_URL = 'http://0.0.0.0:5000/';
const login = 'letscode';
const senha = 'lets@123';

class AuthService {
    auth() {
        return axios({
                method: 'post',
                url: API_URL + 'login',
                data: { login, senha },
                headers: {
                    ContentType: 'application/json'
                }
            })
            .then(response => {
                localStorage.setItem('authToken', JSON.stringify(response.data));
            })
            .catch(error => {
                const resMessage =
                    (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString();

                    return { errorMessage: resMessage };
            });
    }

    getToken() {
        return localStorage.getItem('authToken');
    }

    removeToken() {
        localStorage.removeItem('authToken');
    }

    getBearer() {
        return `Bearer ${this.getToken()}`.replace(/"/g,'');
    }

    saveCard(data) {
        return axios({
            method: 'post',
            url: API_URL + 'cards',
            headers: {
                ContentType: 'application/json',
                Authorization: this.getBearer()
            },
            data
        })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            const resMessage =
                (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString();

            return { errorMessage: resMessage };
        });
    }

    getCards() {
        return axios({
            method: 'get',
            url: API_URL + 'cards',
            headers: {
                Authorization: this.getBearer()
            }
        })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            const resMessage =
                (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString();

            return { errorMessage: resMessage };
        });
    }

    deleteCard(id) {
        return axios({
            method: 'delete',
            url: API_URL + 'cards/' + id,
            headers: {
                Authorization: this.getBearer()
            }
        })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            const resMessage =
                (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString();

            return { errorMessage: resMessage };
        });
    }

    editCard(data) {
        return axios({
            method: 'put',
            url: API_URL + 'cards/' + data.id,
            headers: {
                ContentType: 'application/json',
                Authorization: this.getBearer()
            },
            data
        })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            const resMessage =
                (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString();

            return { errorMessage: resMessage };
        });
    }
}

export default new AuthService();
