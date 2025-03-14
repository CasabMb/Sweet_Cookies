import React from 'react';
import { useParams } from 'react-router-dom'; 
import AvisModal from '../Components/Modal/AvisModal';
import DetailCommandeComponent from '../Components/DetailCommandeComponent';

const DetailsCommande = () => {
    const { id } = useParams();

    return (
        <>
            <section id='details_commande'>

                    <DetailCommandeComponent/>
                    <div>
                        <AvisModal commandeId={id}/>
                    </div>
            </section>
        </>
    );
};

export default DetailsCommande;
