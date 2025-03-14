
import React, { createContext, useState, useContext } from 'react';

// Création du contexte
const OrderContext = createContext();

// Composant fournisseur du contexte
export const OrderProvider = ({ children }) => {
    // État pour gérer les étapes actuelles des commandes
    const [orderSteps, setOrderSteps] = useState({});

    // Fonction pour mettre à jour l'étape d'une commande
    const updateOrderStep = (commandeId, step) => {
        setOrderSteps(prevSteps => ({
            ...prevSteps,
            [commandeId]: step
        }));
    };

    return (
        <OrderContext.Provider value={{ orderSteps, updateOrderStep }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrder = () => useContext(OrderContext);


