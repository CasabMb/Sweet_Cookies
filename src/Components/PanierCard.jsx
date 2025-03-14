import React, { useEffect, useState, useContext } from 'react';
import PanierContext from '../Contexts/PanierContext';
import '../css/stylePanier.css';
import PanierService from '../Services/PanierService';
import ClientService from '../Services/ClientService';
import AuthContext from '../Contexts/AuthContext';
import poubelle from '../asset/Images/poubelle.png'

function PanierCard() {
    const { augmenterQuantite, diminuerQuantite, retirerDuPanier } = useContext(PanierContext);
    const [panier, setPanier] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const clientId = ClientService.getClientIdFromToken();

    const { isAuthenticated } = useContext(AuthContext);

    const fetchPanier = async (clientId) => {
        try {
            const response = await PanierService.fetchPanier(clientId);
            const produits = response.data.map(item => ({
                ...item.Produits,
                quantite: item.quantite  // Inclure la quantité
            }));
            setPanier(produits);
        } catch (error) {
            setError('Erreur lors de la récupération du panier: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchClientPanier = () => {
        // const clientId = ClientService.getClientIdFromToken();
        if (clientId) {
            fetchPanier(clientId);
        } else {
            setError("");
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchClientPanier();
    }, []);

    const handleRemovePanier = async (produit_id) => {
        // const clientId = ClientService.getClientIdFromToken();
        if (clientId) {
            try {
                await retirerDuPanier(clientId, produit_id);
                setPanier(prevPanier => prevPanier.filter(produit => produit.produit_id !== produit_id));
            } catch (error) {
                setError('Erreur lors de la suppression du produit: ' + error.message);
            }
        } else {
            setError('Impossible de récupérer l\'ID du client pour la suppression.');
        }
    };

    const handleAugmenterQuantite = (produit_id) => {
        // const clientId = ClientService.getClientIdFromToken();
        if (!clientId) {
            console.error('clientId est undefined');
            return;
        }
    
        // Augmenter la quantité localement dans l'état
        setPanier(prevPanier =>
            prevPanier.map(produit =>
                produit.produit_id === produit_id
                    ? { ...produit, quantite: produit.quantite + 1 }
                    : produit
            )
        );
    
        // mise à jour de la quantité dans la base de données
        augmenterQuantite(clientId, produit_id);
    };
    

    const handleDiminuerQuantite = (produit_id) => {
        // const clientId = ClientService.getClientIdFromToken();
        if (!clientId) {
            console.error('clientId est undefined');
            return;
        }
    
        // Diminuer la quantité localement dans l'état
        setPanier(prevPanier =>
            prevPanier.map(produit =>
                produit.produit_id === produit_id
                    ? { ...produit, quantite: produit.quantite > 1 ? produit.quantite - 1 : 1 }
                    : produit
            )
        );
    
        // mise à jour de la quantité dans la base de données
        diminuerQuantite(clientId, produit_id);
    };
    

    if (isLoading) return <p>Chargement...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <h1 className="panier-header">Panier</h1>
            <div className="panier-container">
                {panier.length === 0 ? (
                    isAuthenticated ? (
                        <p className="panier-empty">Votre panier est vide pour l'instant.</p>
                    ) : (
                        <p className="panier-empty">Votre panier est vide pour l'instant. Connectez-vous pour pouvoir ajouter des articles à votre panier</p>
                    )
                ) : (
                    <ul className="panier-list">
                        {panier.map((produit) => (
                            <li key={produit.produit_id} className="panier-item">
                                <img src={produit.image_produit} alt={produit.nom_produit} />
                                <div className="panier-item-details">
                                    <h4 className="panier-item-title">{produit.nom_produit}</h4>
                                    <p className="panier-item-price">{produit.prix_produit}€</p>
                                </div>
                                <div className="panier-quantity-controls">
                                    <button onClick={() => handleDiminuerQuantite(produit.produit_id)}>-</button>
                                    <span>{produit.quantite}</span> 
                                    <button onClick={() => handleAugmenterQuantite(produit.produit_id)}>+</button>
                                </div>
                                <button onClick={() => handleRemovePanier(produit.produit_id)} className="panier-item-remove">Supprimer</button>
                                <button className='remove' onClick={() => handleRemovePanier(produit.produit_id)}>
                                    <img src={poubelle} alt="icone poubelle" />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}

export default PanierCard;
