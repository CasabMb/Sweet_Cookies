import React, { useContext, useState } from 'react';
import ClientService from '../Services/ClientService';
import { toast } from 'react-toastify';
import '../css/styleLoginPage.css';
import AuthContext from '../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import DOMPurify from 'dompurify'; // Import pour éviter les attaques XSS

const LoginComponent = () => {
    const [client, setClient] = useState({});
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true); // Pour basculer entre connexion et inscription
    const { setIsAuthenticated, setToken } = useContext(AuthContext);
    const navigate = useNavigate();

    // Validation des champs de saisie
    const isValidName = (name) => /^[a-zA-ZÀ-ÿ\s-]+$/.test(name);
    // const isValidPassword = (password) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleChange = (event) => {
        const { name, value } = event.currentTarget;
        setClient({ ...client, [name]: DOMPurify.sanitize(value) }); 
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(DOMPurify.sanitize(event.currentTarget.value));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation du format de l'e-mail
        if (!isValidEmail(client.email)) {
            toast.error("L'adresse e-mail est invalide.");
            return;
        }

        // Vérification de la longueur et complexité du mot de passe
        // if (!isValidPassword(client.password)) {
        //     toast.error("Le mot de passe doit comporter au moins 8 caractères et inclure des lettres et des chiffres.");
        //     return;
        // }

        if (!isLogin) {
            // Validation du mot de passe de confirmation
            if (client.password !== confirmPassword) {
                toast.error("Les mots de passe ne correspondent pas.");
                return;
            }

            // Validation du nom et prénom
            if (!isValidName(client.nom) || !isValidName(client.prenom)) {
                toast.error("Le nom et le prénom doivent contenir uniquement des lettres.");
                return;
            }
        }

        const currentDate = new Date().toISOString().split('T')[0];
        const clientWithDate = { ...client, date_inscription: currentDate };
        const currentRole = 'utilisateur';
        const clientWithRole = { ...client, role: currentRole };

        try {
            if (isLogin) {
                // Connexion
                const response = await ClientService.login(client);
                const token = response.data.token;
                if (token) {
                    setClient(jwtDecode(token).id);
                    ClientService.setAxiosToken(token);
                    window.localStorage.setItem('authToken', token);
                    setIsAuthenticated(true);
                    setToken(token);
                    toast.success('Vous êtes bien connecté');
                    navigate('/');
                } else {
                    toast.error('Identifiants incorrects');
                }
            } else {
                // Inscription
                await ClientService.register(clientWithDate, clientWithRole);
                toast.success('Inscription réussie ! Vous pouvez maintenant vous connecter.');
                setIsLogin(true); // Passer à l'onglet de connexion après inscription
            }
        } catch (error) {
            toast.error('Une erreur est survenue');
            console.log(error);
            console.log('Client data:', client);
        }
    };

    return (
        <div id='connexion_inscription'>
            <div id="ensemble">
                <input
                    type="checkbox"
                    className="checkbox"
                    id="reg_log"
                    checked={!isLogin}
                    onChange={() => setIsLogin(!isLogin)}
                />
                <label htmlFor="reg_log"></label>
                <div id="titel">
                    <h2>Connexion</h2>
                    <h2>Inscription</h2>
                </div>
                <div className="card">
                    <div className="card_wrapper">
                        <div className={`card_front ${isLogin ? 'active' : ''}`}>
                            <h3>Connexion</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="form_group">
                                    <span className="material-icons-outlined icones">alternate_email</span>
                                    <input
                                        type="email"
                                        placeholder="Adresse mail"
                                        name="email"
                                        onChange={handleChange}
                                        value={client.email || ''}
                                    />
                                    <label htmlFor="email"></label>
                                </div>
                                <div className="form_group">
                                    <span className="material-icons-outlined icones">lock</span>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Mot de passe"
                                        onChange={handleChange}
                                        value={client.password || ''}
                                    />
                                    <label htmlFor="password"></label>
                                </div>
                                <input type="submit" value="Se connecter" />
                                <p>Mot de passe oublié ?</p>
                            </form>
                        </div>
                        <div className={`card_back ${isLogin ? '' : 'active'}`}>
                            <h3>Inscription</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="form_group">
                                    <span className="material-icons-outlined icones">person</span>
                                    <input
                                        type="text"
                                        placeholder="Nom"
                                        name="nom"
                                        onChange={handleChange}
                                        value={client.nom || ''}
                                    />
                                    <label htmlFor="nom"></label>
                                </div>
                                <div className="form_group">
                                    <span className="material-icons-outlined icones">person</span>
                                    <input
                                        type="text"
                                        placeholder="Prénom"
                                        name="prenom"
                                        onChange={handleChange}
                                        value={client.prenom || ''}
                                    />
                                    <label htmlFor="prenom"></label>
                                </div>
                                <div className="form_group">
                                    <span className="material-icons-outlined icones">alternate_email</span>
                                    <input
                                        type="email"
                                        placeholder="Adresse mail"
                                        name="email"
                                        onChange={handleChange}
                                        value={client.email || ''}
                                    />
                                    <label htmlFor="email"></label>
                                </div>
                                <div className="form_group">
                                    <span className="material-icons-outlined icones">lock</span>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Mot de passe"
                                        onChange={handleChange}
                                        value={client.password || ''}
                                    />
                                    <label htmlFor="password"></label>
                                </div>
                                <div className="form_group">
                                    <span className="material-icons-outlined icones">lock</span>
                                    <input
                                        type="password"
                                        placeholder="Confirmer le mot de passe"
                                        name="confirmPassword"
                                        onChange={handleConfirmPasswordChange}
                                        value={confirmPassword}
                                    />
                                    <label htmlFor="confirmPassword"></label>
                                </div>
                                <input type="submit" value="S'inscrire" className='login_submit' />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;
