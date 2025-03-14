import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BarreSuivisByIdComponent from './BarreSuivisById'; 
import DetailsCommandeService from '../Services/DetailsCommandeService';

function DetailCommandeComponent() {
    const { id } = useParams();
    const [detailsCommande, setDetailsCommandes] = useState([]);
    const [commandeInfo, setCommandeInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getDetailsCommandeByCommandeId = async (commandeId) => {
        try {
            const response = await DetailsCommandeService.getDetailsCommandeByCommandeId(commandeId);
            if (Array.isArray(response.data)) {
                setDetailsCommandes(response.data);
                const firstArticle = response.data[0];
                if (firstArticle) {
                    setCommandeInfo({
                        commande_id: firstArticle.Commandes.commande_id,
                        date_commande: firstArticle.Commandes.date_commande,
                        nombre_articles: response.data.reduce((total, article) => total + article.quantite, 0),
                        statut_commande: firstArticle.Commandes.statut_commande,
                        montant_total: firstArticle.Commandes.montant_total,
                        mode_livraison: firstArticle.Commandes.mode_livraison,
                        frais_livraison: firstArticle.Commandes.frais_livraison,
                        montant_Final: firstArticle.Commandes.montant_Final
                    });
                }
            } else {
                throw new Error('La réponse de l\'API n\'est pas un tableau.');
            }
            setLoading(false);
        } catch (error) {
            console.error('Erreur lors de la récupération des détails de la commande:', error);
            setError('Une erreur est survenue lors de la récupération des détails.');
            setLoading(false);
        }
    };

    useEffect(() => {
        getDetailsCommandeByCommandeId(id);
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <>
            <BarreSuivisByIdComponent id={id} />
            <div className='infos_details_commande'>
                <p>Commande n°<span id='commande_id'>{commandeInfo.commande_id}</span></p>
                <div className='commande'>
                    <p>Date : {commandeInfo.date_commande ? new Date(commandeInfo.date_commande).toLocaleDateString() : 'Chargement...'}</p>
                    <p>{commandeInfo.nombre_articles} Articles</p>
                    <p>{commandeInfo.mode_livraison}</p>
                </div>
                <div className='commande'>
                    <p>Montant total : {commandeInfo.montant_Final ? `${commandeInfo.montant_Final} €` : 'Chargement...'} </p>
                    <p>{commandeInfo.statut_commande}</p>
                </div>
            </div>
            <div className='details_commande'>
                {detailsCommande.length > 0 ? (
                    <ul className='details_commande_card'>
                        {detailsCommande.map((article, index) => (
                            <li key={index} className='detail_item'>
                                <div className='detail_image'>
                                    <img
                                        src={article.Produits.image_produit}
                                        alt={`Cookie ${index}`}
                                        className="cookie-image"
                                    />
                                </div>
                                <div className='detail_info'>
                                    <h4>{article.Produits.nom_produit}</h4>
                                    <p>Quantité: {article.quantite}</p>
                                    <p>Prix unitaire: {article.prix_unitaire}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Aucun article trouvé dans la commande.</p>
                )}
            </div>
        </>
    );
}

export default DetailCommandeComponent;
