import React, { useEffect, useState } from 'react';
import { OrderProvider } from '../Contexts/OrderEvolutionContext'; 
import CommandeEnCours from '../Components/CommandeEnCours';
import CommandeService from '../Services/CommandeService';
import HistoriqueCommande from '../Components/HistoriqueCommande';


function MesCommandes() {
    const [commandes, setCommandes] = useState([]);

    const fetchCommandes = async() => {
        try{
            const response = await CommandeService.fetchCommandes();
            setCommandes(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(()=>{
        fetchCommandes();
    },[])



    return (
        <OrderProvider>
            <CommandeEnCours commandes={commandes} />
            <HistoriqueCommande/>
        </OrderProvider>
    );
}

export default MesCommandes;


