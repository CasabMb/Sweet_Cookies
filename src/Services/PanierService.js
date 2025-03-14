import axios from "axios";
import URL from "../config";

class PanierService {
    static fetchPanier(client_id) {
        return axios.get(`${URL}/paniers/${client_id}`);
    }

    static addToPanier({ client_id, produit_id, quantite }) {
        return axios.post(`${URL}/paniers`, { client_id, produit_id, quantite });
    }


    static removeFromPanier(client_id, produit_id, ) {
        return axios.delete(`${URL}/paniers/${client_id}/${produit_id}`);
    }

    static updateQuantite(client_id, produit_id, quantite) {
        return axios.put(`${URL}/paniers/${client_id}/${produit_id}`, {quantite});
    }

    static clearPanier(clientId){
        return axios.delete(`${URL}/paniers/${clientId}`)
    }
}

export default PanierService;