import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';
import FavorisContext from './FavorisContext';
import FavorisService from '../Services/FavorisService'; 
import { toast } from 'react-toastify';

export const FavorisProvider = ({ children }) => {
    const { isAuthenticated, clientId } = useContext(AuthContext);
    const [favoris, setFavoris] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (clientId) {
            FavorisService.fetchFavoris(clientId)
                .then(response => setFavoris(response.data))
                .catch(error => console.error('Erreur lors de la récupération des favoris:', error));
        }
    }, [clientId]);

    useEffect(() => {
        if (clientId) {
            window.localStorage.setItem(`favoris_${clientId}`, JSON.stringify(favoris));
        }
    }, [favoris, clientId]);

    const addFavori = (client_id, produit_id) => {
        if (isAuthenticated) {
            FavorisService.addToFavori({ client_id, produit_id })
                .then(() => {
                    setFavoris(prevFavoris => [...prevFavoris, { client_id, produit_id }]);
                    toast.success('Ajouté avec succes');
                })
                .catch(error => console.error('Erreur lors de l\'ajout aux favoris:', error));
        } else {
            navigate('/LoginPage');
        }
    };

    const removeFavori = (client_id, produit_id) => {
        FavorisService.removeFromFavori(client_id, produit_id)
            .then(() => {
                setFavoris(prevFavoris => prevFavoris.filter(fav => fav.produit_id !== produit_id));
            })
            .catch(error => console.error('Erreur lors de la suppression des favoris:', error));
    };

    return (
        <FavorisContext.Provider value={{ favoris, addFavori, removeFavori }}>
            {children}
        </FavorisContext.Provider>
    );
};
export default FavorisProvider;
