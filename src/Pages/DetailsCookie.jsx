
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProduitService from '../Services/ProduitService';
import DetailsCookiesCardComponent from '../Components/DetailsCookiesCardComponent';



const DetailsCookie = () => {
    const { id } = useParams();
    const [produit, setProduit] = useState({});


    useEffect(() => {
        const fetchProduitById = async () => {
            try {
                const response = await ProduitService.fetchProduitById(id);
                setProduit(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProduitById();
    }, [id]);

    return (
        <section id="details_cookie_page">
            <div className="details_card">
                <h1>Sweet {produit.nom_produit}</h1>
                <DetailsCookiesCardComponent 
                    produit={produit} 
                />
            </div>
        </section>
    );
};

export default DetailsCookie;
