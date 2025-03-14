import React, { useContext } from 'react';
import PanierCard from '../Components/PanierCard';
import PanierTicketComponent from '../Components/PanierTicketComponent';
import AuthContext from '../Contexts/AuthContext';

function Panier() {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <>
            <section id="Panier">
                <PanierCard />
                {isAuthenticated ? (
                    <PanierTicketComponent />
                ) : (
                    <p></p>
                )}
            </section>
        </>
    );
}

export default Panier;
