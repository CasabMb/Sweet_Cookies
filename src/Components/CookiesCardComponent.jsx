
import { useNavigate } from 'react-router-dom';
import iconePanier from '../asset/Images/icon_shopping_bag.png';
import { useFavoris } from '../Contexts/FavorisContext';
import { usePanier } from '../Contexts/PanierContext';
import { useEffect, useState } from 'react';
import ClientService from '../Services/ClientService';
import { toast } from 'react-toastify';

const CookiesCardComponent = ({ produit }) => {
    const navigate = useNavigate();
    const { favoris, addFavori, removeFavori } = useFavoris();
    const { panier, ajouterAuPanier, augmenterQuantite } = usePanier();
    const [isFavori, setIsFavori] = useState(false);

    const getClientId = () => {
        return ClientService.getClientIdFromToken();
    };

    useEffect(() => {
        setIsFavori(favoris.some(fav => fav.produit_id === produit.produit_id));
    }, [favoris, produit.produit_id]);

    const handleToggleFavoris = () => {
        const clientId = getClientId();
        
        if (isFavori) {
            removeFavori(clientId, produit.produit_id);
        } else {
            addFavori(clientId, produit.produit_id);
        }
        setIsFavori(!isFavori);
    };

    const handleAddToPanier = () => {
        const clientId = getClientId();
        if (clientId) {
            const produitDansPanier = panier.find(item => item.produit_id === produit.produit_id);
            if (produitDansPanier) {
                augmenterQuantite(clientId, produit.produit_id);
                toast.success("1 de plus dans le panier !");
            } else {
                ajouterAuPanier(clientId, produit.produit_id, 1);
                toast.success("Ajouté au panier") ;
            }
        }
    };
    

    return (
        <div className="cookies_card" >
            <div className="img_cookie zoom" onClick={() => navigate("/produit/" + produit.produit_id)}>
                <img src={produit.image_produit || ""} alt={produit.nom_produit} loading="lazy"/>
            </div>
            <div className="details_cookie_card">
                <h4>{produit.nom_produit}</h4>
                <p>{produit.prix_produit}€</p>
                <div className="icone_favori">
                    <span
                        className={`material-icons-outlined ${isFavori ? 'favorite' : 'favorite-border'}`}
                        onClick={handleToggleFavoris}
                    >
                        {isFavori ? 'favorite' : 'favorite_border'}
                    </span>
                </div>
                <div className="icone_panier">
                    <img 
                        src={iconePanier} 
                        alt="icone panier" 
                        onClick={handleAddToPanier} 
                    />
                </div>
            </div>
        </div>
    );
};

export default CookiesCardComponent;

