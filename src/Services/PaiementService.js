import axios from "axios";
import URL from "../config";


class PaiementService{
    static fetchPaiements(){
        return axios.get(`${URL}/paiements`);
    }

    static fetchPaiementsById(id){
        return axios.get(`${URL}/paiements`+id);
    }


    static addPaiement(paiement){
        return axios.post(`${URL}/paiements`, paiement)
    }
    static updatePaiement(id, paiement){
        return axios.post(`${URL}/paiements`+id, paiement)
    }
    

}
export default PaiementService;