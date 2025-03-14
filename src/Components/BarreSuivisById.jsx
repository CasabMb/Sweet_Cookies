// src/Components/BarreSuivisByIdComponent.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommandeService from '../Services/CommandeService';
import '../css/styleMesCommandes.css';
import Enpréparation from '../asset/Images/Whisk.png';
import Reçue from '../asset/Images/Search.png';
import Expédié from '../asset/Images/food_box.png';
import Livré from '../asset/Images/Food.png';

function BarreSuivisByIdComponent() {
    const { id } = useParams(); 
    const [currentStep, setCurrentStep] = useState('');

    useEffect(() => {
        const fetchCommandeStatus = async () => {
            try {
                const response = await CommandeService.fetchCommandesById(id);
                const commande = response.data;
                setCurrentStep(commande.statut_commande); 
            } catch (error) {
                console.error('Erreur lors de la récupération des détails de la commande:', error);
                setCurrentStep(''); 
            }
        };

        fetchCommandeStatus();
    }, [id]);

    const steps = ['Reçue', 'En préparation', 'Expédié', 'Livré'];

    return (
        <section id='mes_commandes'>
            <h2>Ma commande</h2>
            <div id='evolution_bar'>
                {steps.map((step) => (
                    <React.Fragment key={step}>
                        <div
                            className={`evolution_img ${step} ${steps.indexOf(step) <= steps.indexOf(currentStep) ? 'active' : ''}`}
                        >
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
                        {step !== 'Livré' && <div className='progress_bar_divider'></div>}
                    </React.Fragment>
                ))}
            </div>
        </section>
    );
}

export default BarreSuivisByIdComponent;
