import cookie1 from '../asset/Images/Pistachio_Crunch.webp';
import cookie2 from '../asset/Images/Speculoos_Dream.webp';
import React, { useState, useEffect } from 'react';
import ClientService from '../Services/ClientService'; 
import { toast } from 'react-toastify';

function UpdateProfil() {
    const [client, setClient] = useState({
        nom: '',
        prenom: '',
        phone: '',
        email: '',
        adresse: '',
        code_postal: '',
        ville: ''
    });

    useEffect(() => {
        const fetchClientData = async () => {
            try {
                const id = ClientService.getClientIdFromToken();
                if (id) {
                    const response = await ClientService.fetchClientById(id);
                    setClient(response.data); // Mettre à jour l'état avec les informations du client
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des informations du client :", error);
            }
        };

        fetchClientData();
    }, []); 

    const updateClient = async (e) => {
        e.preventDefault();
        try {
            const id = ClientService.getClientIdFromToken();
            if (id) {
                await ClientService.updateClient(id, client);
                toast.success("Informations mises à jour avec succès !");
            }
        } catch (error) {
            toast.error("Erreur lors de la mise à jour des informations.");
            console.error("Erreur lors de la mise à jour des informations du client :", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.currentTarget;
        setClient({ ...client, [name]: value });
    };

    return (
        <div id='infos'>
            <h1>Mes informations personnelles</h1>
            <div id='infos_content'>
                <p>N'hésitez pas à modifier vos informations personnelles si celles-ci ont changé.</p>
                <div id='formulaire_profil'>
                    <form onSubmit={updateClient} method='POST'>
                        <input
                            type='text'
                            id='nom'
                            name='nom'
                            value={client.nom}
                            onChange={handleChange}
                            placeholder='Nom'
                        />
                        <input
                            type='text'
                            id='prenom'
                            name='prenom'
                            value={client.prenom}
                            onChange={handleChange}
                            placeholder='Prénom'
                        />
                        <input
                            type='tel'
                            id='telephone'
                            name='phone'
                            value={client.phone}
                            onChange={handleChange}
                            placeholder='Téléphone'
                        />
                        <input
                            type='email'
                            id='email'
                            name='email'
                            value={client.email}
                            onChange={handleChange}
                            placeholder='Email'
                        />
                        <input
                            type='password'
                            id='actuel_pw'
                            name='actuel_pw'
                            placeholder='Mot de passe actuel'
                        />
                        <input
                            type='password'
                            id='new_pw'
                            name='new_pw'
                            placeholder='Nouveau mot de passe'
                        />
                        <input
                            type='password'
                            id='new_pw_comfirm'
                            name='new_pw_comfirm'
                            placeholder='Confirmation'
                        />
                        <input
                            type='text'
                            id='adresse'
                            name='adresse'
                            value={client.adresse}
                            onChange={handleChange}
                            placeholder='Adresse'
                        />
                        <input
                            type='text'
                            id='code_postal'
                            name='code_postal'
                            value={client.code_postal}
                            onChange={handleChange}
                            placeholder='Code postal'
                        />
                        <input
                            type='text'
                            id='ville'
                            name='ville'
                            value={client.ville}
                            onChange={handleChange}
                            placeholder='Ville'
                        />
                        <input type='submit' value="Enregistrer" />
                    </form>
                </div>
                    <div id='cookies_img_infosUpdate'>
                        <div id='cookie_infosUpdate1'><img src={cookie1} alt="Pistachio Crunch" /></div>
                        <div id='cookie_infosUpdate2'><img src={cookie2} alt="Speculoos Dream" /></div>
                    </div>
            </div>
        </div>
    );
};

export default UpdateProfil;

