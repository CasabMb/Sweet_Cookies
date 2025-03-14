import React, { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../asset/Images/logo.webp';
import icon_shopping_bag from '../asset/Images/icon_shopping_bag.png';
import '../css/styleHeader.css';
import AuthContext from '../Contexts/AuthContext';
import ClientService from '../Services/ClientService';
// import { usePanier } from '../Contexts/PanierContext';


function HeaderComponent() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('/');
    const navigate = useNavigate();
    const menuRef = useRef(null); 
    


    const navigateTo = (route) => {
        navigate(route);
        setActiveLink(route);
        if (window.innerWidth <= 768) {
            setMenuOpen(false); 
        }
        setMenuOpen(false);
    };

    const toggleMenu = () => {
        setMenuOpen(prevState => !prevState); 
    };

    const handleLogoClick = () => {
        if (window.innerWidth <= 900) {
            toggleMenu(false); 
        } else {
            navigateTo('/');
        } 
    };

    const { isAuthenticated, setIsAuthenticated, setToken } = useContext(AuthContext);
    const logout = () => {
        setIsAuthenticated(false);
        setToken(null);
        ClientService.logout();
        navigate('/');
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false); 
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        // Nettoyage de l'effet
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuRef]);

    return (
        <header>
            <div id='logo'>
                <img
                    src={logo}
                    alt="logo sweet cookies"
                    onClick={handleLogoClick}
                    className="logo-img"
                />
            </div>
            <div ref={menuRef} className={menuOpen ? 'open' : ''}>
                <ul >
                    <li
                        onClick={() => navigateTo('/')}
                        className={activeLink === '/' ? 'active' : ''}
                    >
                        Home
                    </li>
                    <li onClick={() => navigateTo('/NosCookies')} className={activeLink === '/NosCookies' ? 'active' : ''}>Nos cookies</li>
                    <li onClick={() => navigateTo('/NosAssortiments')} className={activeLink === '/NosAssortiments' ? 'active' : ''}>Nos assortiments</li>
                    <li onClick={() => navigateTo('/Apropos')} className={activeLink === '/Apropos' ? 'active' : ''}>A propos</li>
                    <li onClick={() => navigateTo('/Contact')} className={activeLink === '/Contact' ? 'active' : ''}>Contact</li>
                    {isAuthenticated ? <>
                        <div id='header_icons_connecte'>
                            <div>
                                <li onClick={() => navigateTo('/Profil')} className={activeLink === '/Profil' ? 'active' : ''}>Profil</li>
                            </div>
                            <div id='icon_shopping_bag'>
                                <img src={icon_shopping_bag} alt="icone du panier" onClick={() => navigateTo('/Panier')} title="Panier" />
                            </div>
                            <div id='bouton_deconnexion'>
                                <button className='deconnexion' onClick={logout} title="Déconnexion "><span className="material-icons-outlined">logout</span></button>
                            </div>
                        </div>
                        
                    </> : <>
                        
                        <div id='header_icons_deconnecte'>
                            <div id='icon_connexion'>
                                <span className="material-icons-outlined" onClick={() => navigateTo('/LoginPage')}>account_circle</span>
                                </div>
                            <div id='icon_shopping_bag'>
                                <img src={icon_shopping_bag} alt="icone du panier" onClick={() => navigateTo('/Panier')} />
                            </div>
                        </div>
                    </>}
                </ul>
            </div >
        </header>
    );
}

export default HeaderComponent;
