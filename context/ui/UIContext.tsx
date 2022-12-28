import { createContext, useContext } from 'react';


interface UIContextProps {
    isMenuOpen: boolean
    toggleMenu: () => void;
    search: string;
    setSearch: (value: string) => void;
}

export const UiContext = createContext({} as UIContextProps);

export const useUiContext = () => {
    return useContext(UiContext);
}