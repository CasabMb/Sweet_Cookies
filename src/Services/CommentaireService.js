import axios from "axios";
import URL from '../config'


class CommentaireService{
    static fetchCommentaires(){
        return axios.get(`${URL}/commentaires`);

    }

    static addCommentaire(commentaire){
        return axios.post(`${URL}/commentaires`, commentaire)
    }
    static updateCommentaire(id, commentaire){
        return axios.patch(`${URL}/commentaires`+id, commentaire)
    }
    
    static async checkIfCommentExists(clientId, commandeId) {
        try {
            const response = await axios.get(`${URL}/commentaires/${clientId}/${commandeId}`);
                
            if (response.data && response.data.hasCommented !== undefined) {
                return response.data;
            } else {
                return { hasCommented: false }; 
            }
        } catch (error) {
            console.error("Erreur lors de la vérification du commentaire :", error);
    
            if (error.response && error.response.status === 404) {
                return { hasCommented: false };
            }
    
            throw error;
        }
    }
    
}
export default CommentaireService;