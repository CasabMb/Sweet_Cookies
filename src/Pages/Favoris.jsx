import React, { useEffect, useState } from 'react';
import FavorisService from '../Services/FavorisService';
import ClientService from '../Services/ClientService'; 
import iconePanier from '../asset/Images/icon_shopping_bag.png';
import { useNavigate } from 'react-router-dom';
import '../css/styleFavoriPage.css';
import { useFavoris } from '../Contexts/FavorisContext';
import { usePanier } from '../Contexts/PanierContext';
import { toast } from 'react-toastify';

const Favoris = () => {
    
    const [favoris, setFavoris] = useState([]);
    const navigate = useNavigate();
    const { removeFavori } = useFavoris(); 

    const fetchFavoris = async (clientId) => {
        try {
            const response = await FavorisService.fetchFavoris(clientId);
            const produits = response.data.map(item => item.Produits);
            setFavoris(produits); 
        } catch (error) {
            console.error('Erreur lors de la récupération des favoris:', error);
        }
    };

    const fetchClientFavoris = () => {
        const clientId = ClientService.getClientIdFromToken(); 
        if (clientId) {
            fetchFavoris(clientId);
        } else {
            console.error('Impossible de récupérer l\'ID du client.');
        }
    };

    useEffect(() => {
        fetchClientFavoris();
    }, []);

    const handleRemoveFavori = (produit_id) => {
        const clientId = ClientService.getClientIdFromToken();
        if (clientId) {
            removeFavori(clientId, produit_id);
            setFavoris(favoris.filter(produit => produit.produit_id !== produit_id));
        }
    };

    const { panier, ajouterAuPanier, augmenterQuantite } = usePanier();
    
    const getClientId = () => {
        return ClientService.getClientIdFromToken();
    };
    const handleAddToPanier = (produit) => {
        const clientId = getClientId();
        if (clientId) {
            const produitDansPanier = panier.find(item => item.produit_id === produit.produit_id);
            if (produitDansPanier) {
                augmenterQuantite(clientId, produit.produit_id);  
                toast.success("1 de plus dans le panier !");
            } else {
                ajouterAuPanier(clientId, produit.produit_id, 1); 
                toast.success("Ajouté au panier !");
            }
        }
    };
    return (
        <div id='favori_page'>
            <h2>Favoris</h2>
            <div id='page_favori_content'>
                {favoris.length > 0 ? (
                    favoris.map((produit, index) => (
                        <div key={index} id='favori_card'>
                            <div
                                className="img_cookie_favori"
                                onClick={() => navigate("/produit/" + produit.produit_id)}
                            >
                                <img 
                                    src={produit.image_produit || "default_image_url"} 
                                    alt={produit.nom_produit} 
                                />
                            </div>
                            <div className="favori_cookie_content">
                                <h5>{produit.nom_produit}</h5>
                                <p>{produit.description_produit}</p>
                                <p>{produit.prix_produit}€</p>
                                <div className='icone_favori'>
                                    <span
                                        className="material-icons-outlined favorite"
                                        onClick={() => handleRemoveFavori(produit.produit_id)}
                                    >
                                        favorite
                                    </span>
                                </div>
                                <div className='icone_panier_favori'>
                                    <img src={iconePanier} alt="icone panier" onClick={() => handleAddToPanier(produit)}   />
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Pas encore de cookies favoris !</p>
                )}
            </div>
        </div>
    );
};

export default Favoris;
