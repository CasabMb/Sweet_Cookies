import React, { useEffect, useState } from 'react'
import CookiesCardComponent from '../Components/CookiesCardComponent'
import ProduitService from '../Services/ProduitService';

function NosCookies() {
    const[produits, setProduits] = useState([]);

    const fetchProduits = async () => {
        try{
            const response = await ProduitService.fetchProduits();
            setProduits(response.data);
        }catch(error){
            console.error(error);
        }
    }
    useEffect(()=>{
        fetchProduits();
    },[])
    
    return <>
        <section id='page_cookies'>
            <h2>Nos Cookies</h2>
            <div id='cookies_cards'>
                {produits.map((produit)=>{
                    return <CookiesCardComponent key={"Produit_"+produit.produit_id} produit={produit}/>
                })}
            </div>
        </section>
    </>
}

export default NosCookies



