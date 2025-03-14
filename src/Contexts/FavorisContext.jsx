import { createContext, useContext } from 'react';

const FavorisContext = createContext();

export const useFavoris = () => {
    return useContext(FavorisContext);
};

export default FavorisContext;
