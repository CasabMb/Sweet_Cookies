import React, { useEffect, useState } from 'react';
import CommentaireService from '../Services/CommentaireService';
import '../css/styleCommentairesAffichage.css';

function CommentairesAffichage() {
    const [commentaires, setCommentaires] = useState([]);

    const fetchCommentaires = async () => {
        try {
            const response = await CommentaireService.fetchCommentaires();
            setCommentaires(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des commentaires:', error);
        }
    };

    useEffect(() => {
        fetchCommentaires();
    }, []);

    // Fonction pour générer les étoiles en fonction de la note
    const renderStars = (note) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} className={`star2 ${i <= note ? "filled" : ""}`}>
                    ★
                </span>
            );
        }
        return stars;
    };

    return (
        <>
            <div className='page_title'>
                <div className='deco_titre'></div>
                <h2>Avis Clients</h2>
                <div className='deco_titre'></div>
            </div>
            <div className="commentaires-container">
                {commentaires.map((commentaire) => (
                    <div key={commentaire.commentaire_id} className="commentaire">
                        <p className='stars'>{renderStars(commentaire.note)}</p> 
                        <h5>{commentaire.titre}</h5>
                        <p className="avis">{commentaire.commentaire}</p>
                        <p className="date">Date : {new Date(commentaire.date_commentaire).toLocaleDateString()}</p>
                        <p className="client-id">Client ID : {commentaire.Clients.prenom}</p>
                    </div>
                ))}
            </div>
        </>
    );
}

export default CommentairesAffichage;
