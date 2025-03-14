import axios from "axios";
import { jwtDecode } from "jwt-decode";
import URL from "../config";

class ClientService {
    static fetchClients() {
        return axios.get(`${URL}/clients`);
    }

    static fetchClientById(id) {
        return axios.get(`${URL}/clients/${id}`);
    }

    static login(client) {
        return axios.post(`${URL}/clients/login`, client);
    }

    static register(client) {
        return axios.post(`${URL}/clients/register`, client);
    }

    static updateClient(id, client) {
        return axios.patch(`${URL}/clients/${id}`, client);
    }

    static deleteClient(id) {
        return axios.delete(`${URL}/clients/${id}`);
    }

    static logout() {
        window.localStorage.removeItem("authToken");
        delete axios.defaults.headers["Authorization"];
    }

    static setAxiosToken(token) {
        axios.defaults.headers["Authorization"] = `Bearer ${token}`;
    }

    static setup() {
        const token = window.localStorage.getItem("authToken");
        if (token) {
            const { exp: expiration } = jwtDecode(token);
            if (expiration * 1000 > new Date().getTime()) {
                this.setAxiosToken(token);
            } else {
                this.logout();
            }
        } else {
            this.logout();
        }
    }

    static isAuthenticated() {
        const token = window.localStorage.getItem("authToken");
        if (token) {
            const { exp: expiration } = jwtDecode(token);
            return expiration * 1000 > new Date().getTime();
        }
        return false;
    }

    static getClientIdFromToken() {
        const token = window.localStorage.getItem("authToken");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                // console.log("Token décodé :", decodedToken); // Voir le contenu du token
                return decodedToken.client_id || decodedToken.id;
            } catch (error) {
                console.error("Erreur lors du décodage du token :", error);
                return null;
            }
        }
        return null;
    }

    static isAdmin() {
        const token = window.localStorage.getItem('authToken');
        if (token) {
            try {
                const { role } = jwtDecode(token);
                return role === 'administrateur';
            } catch (error) {
                console.error("Erreur lors du décodage du token :", error);
                return false;
            }
        }
        return false;
    }
}

export default ClientService;
