import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Creamy_Framboise from '../asset/Images/Creamy_Framboise.webp';
import Pistache from '../asset/Images/Pistachio_Crunch.webp';
import Pistache3 from '../asset/Images/pistache3.webp';
import Pistache4 from '../asset/Images/pistache4.webp';
import framboise1 from '../asset/Images/framboise1.webp';
import framboise2 from '../asset/Images/framboise2.webp';
import chocochip from '../asset/Images/chocoChip.webp';
import chocochiip from '../asset/Images/chocoChiip.webp';
import Noisette from '../asset/Images/Noisette_Gourmand.webp';
import noisette2 from '../asset/Images/noisette2.png';
import noisette3 from '../asset/Images/noisette3.png';
import noisette1 from '../asset/Images/noisette1.png';
import whiteChoco from '../asset/Images/white_choco_chips2.webp';
import whiteChoco2 from '../asset/Images/white_choco_chips.webp';

import '../css/styleCarousel.css';

const CarouselComponent = ({ produit }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [rotation, setRotation] = useState(0); // 0, 90, 180, 270

    const slides = [
        {
            id: 15,
            title: "Pistachio Crunch",
            description: "Un cookie au chocolat noir avec des éclats de pistaches, pour une touche de croquant",
            image: Pistache,
            chocolateChips: [
                chocochip,
                Pistache3,
                chocochiip,
                Pistache4
            ]
        },
        {
            id: 20,
            title: "Creamy Framboise",
            description: "Un cookie à la vanille avec des morceaux de framboise et une crème à la vanille chocolat blanc.",
            image: Creamy_Framboise,
            chocolateChips: [
                whiteChoco2,
                framboise2,
                whiteChoco,
                framboise1
            ]
        },
        {
            id: 11,
            title: "Noisette Gourmand",
            description: "Un cookie croustillant aux noisettes grillées, pour une saveur riche et croquante",
            image: Noisette,
            chocolateChips: [
                noisette1,
                noisette2,
                noisette1,
                noisette3
            ]
        },
        // Ajoutez plus de slides ici
    ];

    const nextSlide = () => {
        setRotation((prevRotation) => (prevRotation + 90) % 360);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    const prevSlide = () => {
        setRotation((prevRotation) => (prevRotation - 90 + 360) % 360);
        setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };

    const { id, title, description, image, chocolateChips } = slides[currentIndex];

    const rotationClass = (() => {
        switch (rotation) {
            case 90:
                return 'rotate-90';
            case 180:
                return 'rotate-180';
            case 270:
                return 'rotate-270';
            default:
                return '';
        }
    })();

    const navigate = useNavigate();
    const navigToDetailsProduit = (productId) => {
        navigate(`/produit/${productId}`);
    };

    return (
        <div className="carousel">
            <h2>Nouveau cookie</h2>
            <div className="carousel-content">
                <div id='text-align' onClick={() => navigToDetailsProduit(id)}>
                    <h5 className="carousel-title">{title}</h5>
                    <p className="carousel-description">{description}</p>
                </div>
                <div className="carousel-image-wrapper" onClick={() => navigToDetailsProduit(id)}>
                    <img 
                        src={image} 
                        alt={description} 
                        className={`carousel-image ${rotationClass}`} 
                        loading="lazy" 
                    />
                    {chocolateChips.map((chip, index) => (
                        <img 
                            key={index} 
                            src={chip} 
                            loading="lazy" 
                            alt="Chocolate Chip" 
                            className={`chocolate-chip chip-${index} ${
                                chip === whiteChoco2 ? 'chip-whiteChoco2' : 
                                chip === whiteChoco ? 'chip-whiteChoco' :
                                chip === framboise2 ? 'chip-framboise2' :
                                chip === framboise1 ? 'chip-framboise1' : ''}`} 
                        />
                    ))}
                </div>
                <div id="carousel_bg">
                    <svg width="2500" height="454" viewBox="0 0 2500 654" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1438.74 0.103381C1269.87 15.6094 1285.36 114.603 1122.86 230.603C960.364 346.603 908.367 442.609 544.366 396.109C180.365 349.609 -5.63329 653.104 -5.63329 653.104L1437.87 653.104L1438.74 0.103381Z" fill="url(#paint0_linear_177_1658)"/>
                        <defs>
                            <linearGradient id="paint0_linear_177_1658" x1="841.432" y1="705.631" x2="744.683" y2="162.822" gradientUnits="userSpaceOnUse">
                                <stop offset="0.165" stopColor="#FBF8F3"/>
                                <stop offset="0.341012" stopColor="#F9F3F0" stopOpacity="0.4"/>
                                <stop offset="0.467167" stopColor="#EBE0D3" stopOpacity="0.4"/>
                                <stop offset="0.630333" stopColor="#D0BA9F" stopOpacity="0.8"/>
                                <stop offset="0.847631" stopColor="#A67C4B"/>
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            </div>
            {currentIndex > 0 ? (
                <button className="carousel-button prev-button" onClick={prevSlide}><span className="material-icons-outlined">arrow_back</span></button>
            ) : (
                <button className="carousel-button prev-button hidden" disabled><span className="material-icons-outlined">arrow_forward</span></button>
            )}

            {currentIndex < slides.length - 1 ? (
                <button className="carousel-button next-button" onClick={nextSlide}><span className="material-icons-outlined">arrow_forward</span></button>
            ) : (
                <button className="carousel-button next-button hidden" disabled><span className="material-icons-outlined">arrow_forward</span></button>
            )}
            
        </div>
    );
};

export default CarouselComponent;
