import axios from "axios";
import URL from '../config'

class ProduitService{
    static fetchProduits(){
        return axios.get(`${URL}/produits`);
    }

    static fetchProduitById(id){
        return axios.get(`${URL}/produits/`+id);
    }
}

export default ProduitService;

