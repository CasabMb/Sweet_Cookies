import axios from "axios";
import URL from "../config";

class FavorisService {
    static fetchFavoris(client_id) {
        return axios.get(`${URL}/favoris/${client_id}`);
    }

    static addToFavori({ client_id, produit_id }) {
        return axios.post(`${URL}/favoris`, { client_id, produit_id });
    }


    static removeFromFavori(client_id, produit_id) {
        return axios.delete(`${URL}/favoris/${client_id}/${produit_id}`);
    }
}

export default FavorisService;