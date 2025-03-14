import { createContext, useContext } from 'react';

const PanierContext = createContext();
export const usePanier = () => {
    return useContext(PanierContext);
};

export default PanierContext;
