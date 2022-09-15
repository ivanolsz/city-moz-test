import React, { createContext, FC, useContext, useEffect, useState } from 'react';

import { ICity } from './types';
import { getCities } from '../api/city';
import { useAppContext } from './AppContext';

interface IDataContext {
    cities: ICity[];
}

const initialState: IDataContext = {
    cities: [],
};
const DataContext = createContext<IDataContext>(initialState);

export const DataProvider: FC = ({ children }: any) => {
    const [cities, setCities] = useState(initialState.cities);

    const { setIsLoading } = useAppContext();

    const initialize = async () => {
        const data = getCities();
        setCities(data);
    };

    useEffect(() => {
        setIsLoading(true);
        initialize().finally(() => {
            // Simulate request
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        });
    }, [setIsLoading]);

    const value: IDataContext = {
        cities,
    };

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export function useDataContext() {
    return useContext<IDataContext>(DataContext);
}
