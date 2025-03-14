import React from 'react'
import cookie1 from '../asset/Images/Pistachio_Crunch.webp'
import cookie2 from '../asset/Images/Speculoos_Dream.webp'
import '../css/styleContactPage.css'

function Contact() {
    return <>
        <section id='contact'>
            <h1>Contact</h1>
            <p>
                Un évènement spécial ? Un anniversaire ? Un goûter d'entreprise ? Un mariage ? Écrivez-nous pour avoir une formule qui correspond au mieux à votre évènement.            
            </p>
            <div id='formulaire_contact'>
                <form>
                
                    <input type='text' id='name' name='name' placeholder='Nom Prénom' required/>

                    <input type='email' id='email' name='email'placeholder='Adresse mail'  required/>

                    <textarea id='message' name='message' placeholder='Message' required/>

                    <input type='submit' value="Envoyer" />

                </form>
                <div id='cookies_contact'>
                    <div id='cookie_contact1'><img src={cookie1} alt="cookie chocolat noir et éclats de pistaches" loading='lazy'/></div>
                    <div id='cookie_contact2'><img src={cookie2} alt="Cookie speculoos" loading='lazy'/></div>
                </div>
            </div>
        </section>

    </>
}

export default Contact