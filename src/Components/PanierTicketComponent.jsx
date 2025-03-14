import React, { useState } from 'react';
import { usePanier } from '../Contexts/PanierContext';
import '../css/stylePanier.css'; 
import CommandeService from '../Services/CommandeService';
import DetailsCommandeService from '../Services/DetailsCommandeService';
import ClientService from '../Services/ClientService';  
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PanierService from '../Services/PanierService';

function PanierTicketComponent() {
    const { panier } = usePanier();
    const [deliveryMethod, setDeliveryMethod] = useState('standard');
    const navigate = useNavigate();

    const totalArticles = panier.reduce((total, produit) => total + produit.quantite, 0);
    const montantTotal = panier.reduce((total, produit) => total + parseFloat(produit.Produits.prix_produit) * produit.quantite, 0);    
    const fraisLivraison = deliveryMethod === 'standard' ? 4.85 : 0;
    const montantFinal = montantTotal + fraisLivraison;

    const handleDeliveryChange = (event) => {
        setDeliveryMethod(event.target.value);
    };

    const addCommande = async (event) => {
        event.preventDefault();

        const clientId = ClientService.getClientIdFromToken();
        if (!clientId) {
            return;
        }

        const newCommande = {
            montant_total: montantTotal,
            statut_commande: 'Reçue',
            date_commande: new Date().toISOString(),
            mode_livraison: deliveryMethod,
            frais_livraison: fraisLivraison,
            client_id: clientId,  
            montant_Final: montantFinal 
        };
        try {
            const response = await CommandeService.addCommande(newCommande);
            const commandeId = response.data.commande_id;
            toast.success('Commande ajoutée avec succès');

            await Promise.all(panier.map(produit => {
                const prix = parseFloat(produit.Produits.prix_produit); 
                const newDetailsCommande = {
                    quantite: produit.quantite,
                    prix_unitaire: prix,
                    produit_id: produit.produit_id,
                    commande_id: commandeId,
                };

                return DetailsCommandeService.addDetailsCommande(newDetailsCommande).catch(error => {
                    console.error(`Erreur lors de l'ajout du produit ID ${produit.produit_id} :`, error);
                    throw error;  
                });
            }));

            await PanierService.clearPanier(clientId);
            navigate('/Paiement');

        } catch (error) {
            toast.error("Erreur lors de l'ajout de la commande");
        }
    };
    
    return (
        <div className='ticket'>
            <div className="panier_ticket">
                <h4>Paiement</h4>
                <div className="panier_ticket_item">
                    <div className='panier_radio'>
                        <input 
                            type="radio" 
                            id="standard" 
                            name="delivery" 
                            value="standard" 
                            checked={deliveryMethod === 'standard'} 
                            onChange={handleDeliveryChange} 
                        />
                        <label htmlFor="standard">Livraison standard 4.85€</label>
                    </div>
                    <div className='panier_radio'>
                        <input 
                            type="radio" 
                            id="pickup" 
                            name="delivery" 
                            value="pickup" 
                            checked={deliveryMethod === 'pickup'} 
                            onChange={handleDeliveryChange} 
                        />
                        <label htmlFor="pickup">À emporter</label>
                    </div>
                    <div className='panier_ticket_details'>
                        <p>Résumé</p>
                        <p> Total <span className="total-articles bold">{totalArticles}</span> 
                            articles 
                            <span className="right-align">{montantTotal.toFixed(2)}€</span>
                        </p>
                        <p>Livraison <span className="right-align">{fraisLivraison.toFixed(2)}€</span></p>
                        <p>Total <span className="right-align bold">{montantFinal.toFixed(2)}€</span></p>
                        <button 
                            onClick={addCommande} 
                            disabled={totalArticles === 0} // Désactiver le bouton si le panier est vide
                        >
                            Valider mon panier
                        </button>                    
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PanierTicketComponent;
