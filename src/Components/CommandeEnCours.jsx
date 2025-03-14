import React, { useEffect, useState, useCallback } from 'react';
import '../css/styleMesCommandes.css';
import CommandeService from '../Services/CommandeService';
import ClientService from '../Services/ClientService';
import DetailsCommandeService from '../Services/DetailsCommandeService';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../Contexts/OrderEvolutionContext';
import Livré from '../asset/Images/Food.png';
import Enpréparation from '../asset/Images/Whisk.png';
import Reçue from '../asset/Images/Search.png';
import Expédié from '../asset/Images/food_box.png';

function CommandeEnCours() {
    const [derniereCommande, setDerniereCommande] = useState(null);
    const [detailsCommande, setDetailsCommandes] = useState([]);
    const navigate = useNavigate();
    const { updateOrderStep } = useOrder();

    // Fonction pour récupérer les commandes du client
    const fetchCommandes = useCallback(async (clientId) => {
        try {
            const reponse = await CommandeService.fetchCommandes();
            if (reponse.data && Array.isArray(reponse.data)) {
                const commandesClient = reponse.data.filter(commande => commande.client_id === clientId);
                if (commandesClient.length > 0) {
                    const dernieresCommandesTriees = commandesClient.sort((a, b) => new Date(b.date_commande) - new Date(a.date_commande));
                    setDerniereCommande(dernieresCommandesTriees[0]);
                }
            }
        } catch (error) {
            console.log('Erreur de récupération des commandes:', error);
        }
    }, []);

    // Fonction pour récupérer les détails de la commande
    const getDetailsCommandeByCommandeId = useCallback(async (commandeId) => {
        try {
            const response = await DetailsCommandeService.getDetailsCommandeByCommandeId(commandeId);
            if (Array.isArray(response.data)) {
                setDetailsCommandes(response.data);
                const actualStep = derniereCommande?.statut_commande || '';
                updateOrderStep(commandeId, actualStep);
            } else {
                throw new Error('La réponse de l\'API n\'est pas un tableau.');
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des détails de la commande:', error);
        }
    }, [derniereCommande, updateOrderStep]);

    useEffect(() => {
        const clientId = ClientService.getClientIdFromToken();
        if (clientId) {
            fetchCommandes(clientId);
        } else {
            console.error("Client non authentifié");
        }
    }, [fetchCommandes]);

    useEffect(() => {
        if (derniereCommande) {
            getDetailsCommandeByCommandeId(derniereCommande.commande_id);
        }
    }, [derniereCommande]);

    const steps = ['Reçue', 'En préparation', 'Expédié', 'Livré'];

    return (
        <>
            <section id='mes_commandes'>
                <div>
                    <h2>Commande en cours</h2>
                    <div id='evolution_bar'>
                        {steps.map((step, index) => (
                            <React.Fragment key={step}>
                                <div className={`evolution_img ${step} ${steps.indexOf(step) <= steps.indexOf(derniereCommande?.statut_commande || '') ? 'active' : ''}`}>
                                    <img
                                        src={
                                            step === 'Reçue' ? Reçue :
                                            step === 'En préparation' ? Enpréparation :
                                            step === 'Expédié' ? Expédié :
                                            Livré
                                        }
                                        alt={`icone ${step}`}
                                    />
                                </div>
                                {index < steps.length - 1 && <div className='progress_bar_divider'></div>}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                <div className='infos_commande_en_cours'>
                    {derniereCommande ? (
                        <div id='details_commande_en_cours' onClick={() => navigate(`/DetailsCommande/${derniereCommande.commande_id}`)}>
                            <div className='infos_commande'>
                                <p>Commande n°<span id='commande_id'>{derniereCommande.commande_id}</span></p>
                                <p>Montant <span id='montant_Final' className='space'>{derniereCommande.montant_Final ? `${derniereCommande.montant_Final} €` : 'Chargement...'}</span></p>
                            </div>
                        </div>
                    ) : (
                        <p>Aucune commande en cours.</p>
                    )}
                </div>
                <div className="images_cookies_commande_en_cours">
                    {detailsCommande.length > 0 ? (
                        detailsCommande.map((detail, index) => (
                            <div key={index} className="cookie-item">
                                <div className="cookie-image_container">
                                    <img
                                        src={detail.Produits.image_produit}
                                        alt={`Cookie ${index}`}
                                        className="cookie-image"
                                    />
                                </div>
                                <p className="cookie-name">{detail.Produits.nom_produit}</p>
                            </div>
                        ))
                    ) : (
                        <p>Aucun cookie dans la commande.</p>
                    )}
                </div>
            </section>
        </>
    );
}

export default CommandeEnCours;
