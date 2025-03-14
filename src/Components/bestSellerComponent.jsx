import '../css/styleBestSeller.css'
import React, { useEffect, useState } from 'react';
import ProduitService from '../Services/ProduitService';
import CookiesCardComponent from './CookiesCardComponent';

const BestSellerComponent = () => {
    const [produits, setProduits] = useState([]);
    
    useEffect(() => {
        const cookieIds = [16, 8, 4]; 
        const fetchProduits = async () => {
            try {
                const produitsPromises = cookieIds.map(id => ProduitService.fetchProduitById(id));
                const produitsResponses = await Promise.all(produitsPromises);
                setProduits(produitsResponses.map(response => response.data));
            } catch (error) {
                console.error('Erreur lors de la récupération des produits:', error);
            }
        };

        fetchProduits();
    }, []);

    return (
        <div className="best_seller">
            {produits.map(produit => (
                <CookiesCardComponent key={produit.produit_id} produit={produit} />
            ))}
        </div>
    );
};

export default BestSellerComponent;
