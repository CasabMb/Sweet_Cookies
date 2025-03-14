import React from 'react'
import image_apropos from '../asset/Images/image_a_propos.png'

function Apropos() {
    return <>
        <div id='apropos'>
                <h1>Apropos</h1>
                <p>
                Bienvenue chez Sweet Cookies ! Nous sommes passionnés par la création de cookies délicieux et de qualité, faits avec amour et des ingrédients soigneusement sélectionnés. Que vous préfériez les classiques pépites de chocolat, aux fruits ou les irrésistibles cookies au beurre de cacahuète, nous avons quelque chose pour satisfaire toutes les envies. Nos cookies sont parfaits pour les occasions, en cadeaux ou simplement pour se faire plaisir. Nous croyons en l'importance de la fraîcheur et de la qualité, c'est pourquoi chaque commande est préparée avec soin et expédiée rapidement pour garantir que vous receviez vos cookies à leur apogée de saveur. Merci de soutenir notre petite entreprise et de partager notre amour pour les cookies artisanaux !
                </p>
                <div id='image_apropos'>
                    <img src={image_apropos} alt="Trois cookies" loading='lazy'/>
                </div>
        </div>
    </>
}

export default Apropos