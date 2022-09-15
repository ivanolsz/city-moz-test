import React, { createContext, Dispatch, FC, SetStateAction, useContext, useState } from 'react';

interface IAppContext {
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const initialState: IAppContext = {
    isLoading: false,
    setIsLoading: () => {},
};
const AppContext = createContext<IAppContext>(initialState);

export const AppProvider: FC = ({ children }: any) => {
    const [isLoading, setIsLoading] = useState(initialState.isLoading);

    const value: IAppContext = {
        isLoading,
        setIsLoading,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export function useAppContext() {
    return useContext<IAppContext>(AppContext);
}
