import axios from "axios";
import URL from "../config";


class CommandeService{
    static fetchCommandes() {
        return axios.get(`${URL}/commandes`);
    }

    static fetchCommandesById(id) {
        return axios.get(`${URL}/commandes/${id}`);
    }

    static fetchCommandesByClientId(clientId) {
        return axios.get(`${URL}/commandes/client/${clientId}`);
    }

    static addCommande(commande) {
        return axios.post(`${URL}/commandes`, commande);
    }
    static updateCommande(id, commande) {
        return axios.put(`${URL}/commandes/${id}`, commande);
    }
    

}
export default CommandeService;


