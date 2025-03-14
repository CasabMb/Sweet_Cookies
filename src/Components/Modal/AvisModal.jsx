import React, { useState, useEffect } from 'react';
import '../../css/styleAvis.css';
import ClientService from '../../Services/ClientService';
import CommentaireService from '../../Services/CommentaireService';
import { toast } from 'react-toastify';

export default function AvisModal({ commandeId }) {
    const [modal, setModal] = useState(false);
    const [note, setNote] = useState(0); 
    const [hoveredStar, setHoveredStar] = useState(0); 
    const [titre, setTitre] = useState('');
    const [commentaire, setCommentaire] = useState('');
    const [hasReviewed, setHasReviewed] = useState(false); 

    const clientId = ClientService.getClientIdFromToken();

    useEffect(() => {
        const checkIfReviewed = async () => {
            try {
                const response = await CommentaireService.checkIfCommentExists(clientId, commandeId);
                setHasReviewed(response.hasCommented); 
            } catch (error) {
                console.error("Erreur lors de la vérification du commentaire :", error);
            }
        };

        checkIfReviewed();
    }, [clientId, commandeId]);
    

    const toggleModal = () => {
        setModal(!modal);
    };

    const handleStarClick = (index) => {
        setNote(index);
    };

    const handleStarMouseEnter = (index) => {
        setHoveredStar(index);
    };

    const handleStarMouseLeave = () => {
        setHoveredStar(0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const date_commentaire = new Date().toISOString(); 
        
        const newCommentaire = {
            note,
            titre,
            commentaire,
            date_commentaire,
            commande_id: commandeId,
            client_id: clientId
        };

        try {
            await CommentaireService.addCommentaire(newCommentaire);
            toast.success("Commentaire ajouté avec succès");
            setHasReviewed(true); 
            toggleModal();
        } catch (error) {
            console.error("Erreur lors de l'ajout du commentaire:", error);
        }
    };

    return (
        <>
            <button className="avis" onClick={toggleModal} disabled={hasReviewed}>
                {hasReviewed ? "✅ Avis déjà laissé pour cette commande" : "Laisser un avis"}
            </button>

            {modal && (
                <div className='modal-overlay' onClick={toggleModal}>
                    <div className='modal' onClick={(e) => e.stopPropagation()}>
                            <form onSubmit={handleSubmit}>
                                <h3>Laisser un avis</h3>
                                <div className='rating_top'>
                                    <div>
                                        <input
                                            type="text"
                                            name="titre"
                                            id="titre"
                                            required
                                            placeholder='Titre'
                                            value={titre}
                                            onChange={(e) => setTitre(e.target.value)}
                                        />
                                    </div>
                                    <div className="star-rating" name="note">
                                        {[1, 2, 3, 4, 5].map((index) => (
                                            <span
                                                key={index}
                                                className={`star ${index <= (hoveredStar || note) ? "filled" : ""}`}
                                                onClick={() => handleStarClick(index)}
                                                onMouseEnter={() => handleStarMouseEnter(index)}
                                                onMouseLeave={handleStarMouseLeave}
                                            >
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="avis"></label>
                                    <textarea
                                        id="avis"
                                        name="commentaire"
                                        required
                                        placeholder='Commentaire'
                                        value={commentaire}
                                        onChange={(e) => setCommentaire(e.target.value)}
                                    ></textarea>
                                </div>
                                <div className='infos_avis hidden'>
                                    <p>Date du commentaire : {new Date().toLocaleDateString()}</p>
                                    <p>Commande n°: {commandeId}</p>
                                    <p>Client n°: {clientId}</p>
                                </div>
                                <div className="modal-buttons">
                                    <button type="submit">Soumettre</button>
                                    <button type="button" onClick={toggleModal}>Annuler</button>
                                </div>
                            </form>
                    </div>
                </div>
            )}
        </>
    );
}
