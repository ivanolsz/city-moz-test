import React, { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@material-ui/core';

import { DataProvider } from '../contexts/DataContext';
import { AppProvider } from '../contexts/AppContext';
import theme from '../theme';

const AppProviders: FC = ({ children }: any) => {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <CssBaseline>
                    <AppProvider>
                        <DataProvider>{children}</DataProvider>
                    </AppProvider>
                </CssBaseline>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default AppProviders;
