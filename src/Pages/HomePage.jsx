import React, { useEffect } from 'react'
import CarouselComponent from '../Components/CarouselComponent'
import BestSellerComponent from '../Components/bestSellerComponent'
import AccueilDivider from '../Components/AccueilSeparateur'
import CommentairesAffichage from '../Components/CommentairesAffichage'

function HomePage() {

    return <>
        
        <section className="App">
            <div className="App-header">
                <CarouselComponent />
            </div>
            <div id='best-seller'>
                <h1>Bienvenue chez Sweet Cookies - Les meilleurs cookies faits maison</h1>
                <h2>Nos Best Seller</h2>
                <p>
                    Chez <strong>Sweet Cookies</strong>, nous vous proposons des cookies faits maison, 
                    croustillants à l'extérieur et fondants à l'intérieur. Découvrez nos <em>best-sellers</em> 
                    et laissez-vous tenter par des recettes gourmandes au chocolat, caramel ou noisettes.
                    Livraison rapide partout en France !
                </p>
                <BestSellerComponent/>
            </div>
            <div>
                <AccueilDivider/>
            </div>
            <div>
                <CommentairesAffichage/>
            </div>
        </section>
    </>

}

export default HomePage