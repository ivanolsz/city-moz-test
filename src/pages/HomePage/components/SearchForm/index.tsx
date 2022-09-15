import React, { useMemo, useState } from 'react';
import {
    Box,
    List,
    Typography,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    TextField,
    Button,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
// @ts-ignore
import * as yup from 'yup';
import { useFormik } from 'formik';
// @ts-ignore
import * as _ from 'lodash';
import { useHistory, useLocation } from 'react-router';

import { CitySelect } from '../CitySelect';
import { ICity } from '../../../../contexts/types';
import { useStyles } from './styles';
import { parsePath } from '../../../../utils/parsePath';

export const SearchForm = () => {
    const [intermediateCities, setIntermediateCities] = useState<string[]>([]);

    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    const handleSearch = () => {
        const routes = intermediateCities.join('@');

        history.push(
            `/results?origin=${origin}&destination=${destination}&date=${date}&passengers=${passengers}&intermediateCities=${routes}`
        );
    };

    const schema = yup.object({
        origin: yup.string().required('This field should no be null'),
        destination: yup.string().required('This field should no be null'),
        date: yup.string().required('This field should no be null'),
        passengers: yup.number().positive().required('This field should no be null'),
    });

    const initialValues = useMemo(() => {
        const searchParams = location.search;

        const { intermediateCities = [], ...rest } = parsePath(searchParams) as any;
        setIntermediateCities(intermediateCities);

        return {
            origin: undefined,
            destination: undefined,
            date: undefined,
            passengers: undefined,
            ...rest,
        };
    }, [location]);

    const useFormikConfig = {
        initialValues: initialValues,
        onSubmit: handleSearch,
        validationSchema: schema,
    };

    const {
        errors,
        touched,
        handleChange,
        setFieldValue,
        handleSubmit,
        values: { origin, destination, date, passengers },
    } = useFormik(useFormikConfig);

    const handleAddIntermediateCity = (e: any, newCity: string) => {
        setIntermediateCities([...intermediateCities, newCity]);
    };

    const handleRemoveCityByName = (name: string) => {
        setIntermediateCities(intermediateCities.filter((cityName) => cityName !== name));
    };

    return (
        <Box className={classes.form} display="flex" mt={8}>
            <Box width={300}>
                <CitySelect
                    name="origin"
                    label="City of origin"
                    value={origin}
                    onChange={(e: any, val: ICity) => setFieldValue('origin', val)}
                    error={touched.origin && errors.origin}
                />
                <CitySelect
                    name="destination"
                    label="City of destination"
                    value={destination}
                    onChange={(e: any, val: ICity) => setFieldValue('destination', val)}
                    error={touched.destination && errors.destination}
                />
                <TextField
                    name="date"
                    className={classes.formControl}
                    value={date}
                    onChange={handleChange('date')}
                    type="date"
                    label="Date of trip"
                    variant="outlined"
                    helperText={touched.date && errors.date}
                />
                <TextField
                    name="passengers"
                    className={classes.formControl}
                    value={passengers}
                    onChange={handleChange('passengers')}
                    type="number"
                    label="Number of passengers"
                    variant="outlined"
                    helperText={touched.passengers && errors.passengers}
                />
            </Box>
            <Box width={300} ml={4}>
                <CitySelect label="Add intermediate city" onChange={handleAddIntermediateCity} />
                <Typography variant="h5">Intermediate Cities</Typography>
                <List>
                    {intermediateCities.map((city, index) => (
                        <ListItem className={classes.listItem} key={`intermediate-city-${index}`}>
                            <ListItemText primary={city} />
                            <ListItemSecondaryAction onClick={() => handleRemoveCityByName(city)}>
                                <IconButton edge="end" color="secondary" aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </Box>
            <Box ml={4}>
                <Button
                    disabled={!_.isEmpty(errors)}
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.submitButton}
                    startIcon={<SearchIcon />}
                    onClick={handleSubmit as any}
                >
                    Search
                </Button>
            </Box>
        </Box>
    );
};
