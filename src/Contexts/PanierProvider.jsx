import React, { useState, useEffect, useContext } from 'react';
import AuthContext from './AuthContext';
import PanierContext from './PanierContext';
import PanierService from '../Services/PanierService';

export const PanierProvider = ({ children }) => {
    const { isAuthenticated, clientId } = useContext(AuthContext);
    const [panier, setPanier] = useState([]);

    useEffect(() => {
        if (clientId) {
            PanierService.fetchPanier(clientId)
                .then(response => setPanier(response.data))
                .catch(error => console.error('Erreur lors de la récupération du panier:', error));
        }
    }, [clientId]);

    useEffect(() => {
        if (clientId) {
            window.localStorage.setItem(`panier_${clientId}`, JSON.stringify(panier));
        }
    }, [panier, clientId]);



    const ajouterAuPanier = (client_id, produit_id, quantite) => {
        if (isAuthenticated) {
            const produitExistant = panier.find(item => item.produit_id === produit_id);
    
            if (produitExistant) {
                const nouvelleQuantite = produitExistant.quantite + quantite;
                // console.log('Nouvelle quantité pour update:', nouvelleQuantite);
    
                PanierService.updateQuantite(client_id, produit_id, nouvelleQuantite)
                    .then(response => {
                        // console.log('Réponse de l\'API pour update:', response.data);
                        // Mettre à jour le panier local après confirmation de la mise à jour
                        setPanier(prevPanier => prevPanier.map(item =>
                            item.produit_id === produit_id
                                ? { ...item, quantite: nouvelleQuantite }
                                : item
                        ));
                    })
                    .catch(error => console.error('Erreur lors de la mise à jour de la quantité:', error.response ? error.response.data : error.message));
            } else {
                // console.log('Produit non trouvé, ajout au panier.');
                PanierService.addToPanier({ client_id, produit_id, quantite })
                    .then(response => {
                        // console.log('Réponse de l\'API pour ajout:', response.data);
                        setPanier(prevPanier => [
                            ...prevPanier,
                            { produit_id, quantite }
                        ]);
                    })
                    .catch(error => console.error('Erreur lors de l\'ajout au panier:', error.response ? error.response.data : error.message));
            }
        }
    };
    
    const retirerDuPanier = (client_id, produit_id) => {
        PanierService.removeFromPanier(client_id, produit_id)
            .then(() => {
                setPanier(prevPanier => prevPanier.filter(item => item.produit_id !== produit_id));
            })
            .catch(error => console.error('Erreur lors de la suppression du panier:', error));
    };

    const augmenterQuantite = (client_id, produit_id) => {
        // console.log('Fonction augmenterQuantite appelée avec client_id:', client_id, 'et produit_id:', produit_id);
        const produitExistant = panier.find(item => item.produit_id === produit_id);
    
        if (produitExistant) {
            const nouvelleQuantite = produitExistant.quantite + 1;
    
            // console.log('Quantité avant mise à jour:', produitExistant.quantite);
            // console.log('Nouvelle quantité:', nouvelleQuantite);
    
            // console.log(`Envoi de la requête PUT pour le produit_id: ${produit_id} avec la quantité: ${nouvelleQuantite}`);
    
            PanierService.updateQuantite(client_id, produit_id, nouvelleQuantite)
                .then(response => {
                    setPanier(prevPanier => prevPanier.map(item => item.produit_id === produit_id ? { ...item, quantite: nouvelleQuantite } : item));
                    // console.log('Réponse de l\'API lors de la mise à jour de la quantité:', response.data);
                })
                .catch(error => {
                    console.error('Erreur lors de la mise à jour de la quantité:', error.response ? error.response.data : error.message);
                });
        } else {
            console.log('Produit non trouvé dans le panier:', produit_id);
        }
    };
    
    



    const diminuerQuantite = (client_id, produit_id) => {
        // console.log('Fonction diminuerQuantite appelée avec client_id:', client_id, 'et produit_id:', produit_id);
        const produitExistant = panier.find(item => item.produit_id === produit_id);
    
        if (produitExistant) {
            const nouvelleQuantite = produitExistant.quantite > 1 ? produitExistant.quantite - 1 : 1;
    
            // console.log('Quantité avant mise à jour:', produitExistant.quantite);
            // console.log('Nouvelle quantité:', nouvelleQuantite);
    
            console.log(`Envoi de la requête PUT pour le produit_id: ${produit_id} avec la quantité: ${nouvelleQuantite}`);
    
            PanierService.updateQuantite(client_id, produit_id, nouvelleQuantite)
                .then(response => {
                    // console.log('Réponse de l\'API lors de la mise à jour de la quantité:', response.data);
                    // Mettre à jour le panier local après la mise à jour réussie
                    setPanier(prevPanier =>
                        prevPanier.map(item => item.produit_id === produit_id ? { ...item, quantite: nouvelleQuantite }: item));
                })
                .catch(error => {
                    console.error('Erreur lors de la mise à jour de la quantité:', error.response ? error.response.data : error.message);
                });
        } else {
            console.log('Produit non trouvé dans le panier:', produit_id);
        }
    };
    


    const viderPanier = () => {
        console.log('Vider le panier appelé');
        setPanier([]);
    };

    return (
        <PanierContext.Provider value={{ panier, ajouterAuPanier, retirerDuPanier, augmenterQuantite, diminuerQuantite, viderPanier }}>
            {children}
        </PanierContext.Provider>
    );
};

export default PanierProvider;





