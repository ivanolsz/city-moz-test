import React from 'react';
import { Box, Typography } from '@material-ui/core';

import { useStyles } from './styles';
import { SearchForm } from './components/SearchForm';

const HomePage = () => {
    const classes = useStyles();

    return (
        <Box className={classes.container}>
            <Typography variant="h2" className={classes.title}>
                CITY-MOZ
            </Typography>
            <SearchForm />
        </Box>
    );
};

export default HomePage;
