import React, { useEffect, useMemo, useState } from 'react';
import { Box, Chip, CircularProgress, Typography } from '@material-ui/core';
import { useLocation } from 'react-router';
import RoomIcon from '@material-ui/icons/Room';

import { useStyles } from './styles';
import { parsePath } from '../../utils/parsePath';
import { useDataContext } from '../../contexts/DataContext';
import { calculateDistance } from '../../utils/calculateDistance';
import { useAppContext } from '../../contexts/AppContext';

const ResultsPage = () => {
    const [form, setForm] = useState({
        origin: 'City of origin',
        destination: 'City of destination',
        date: 'Trip date',
        passengers: 1,
        intermediateCities: [],
    });
    const [distances, setDistances] = useState([]);

    const classes = useStyles();
    const location = useLocation();
    const { cities } = useDataContext();
    const { isLoading, setIsLoading } = useAppContext();

    const totalDistance = useMemo(() => {
        let total = 0;
        distances.forEach(({ distance }) => (total += distance));
        return total;
    }, [distances]);

    useEffect(() => {
        const searchParams = location.search;

        setForm(parsePath(searchParams) as any);
    }, [location]);

    useEffect(() => {
        // @ts-ignore
        if (form.intermediateCities.includes('Dijon')) {
            alert('Some went wrong while calculating distance!');
        }
        const intermediateCities = [
            cities.find((city) => city.name === form.origin),
            ...form.intermediateCities.map((name) => cities.find((city) => city.name === name)),
            cities.find((city) => city.name === form.destination),
        ];

        const distancesForRoutes: any[] = [];
        setIsLoading(true);

        intermediateCities.forEach((city, index) => {
            if (index > 0) {
                const point1 = intermediateCities[index - 1] || { name: '', longitude: 0, latitude: 0 };
                const point2 = city || { name: '', longitude: 0, latitude: 0 };
                const label = `${point1.name} - ${point2.name}`;
                const distance = calculateDistance(point1, point2);

                distancesForRoutes.push({ label, distance });
            }
        });

        setTimeout(() => setIsLoading(false), 1000);
        setDistances(distancesForRoutes as any);
    }, [form, cities, setIsLoading]);

    return (
        <Box className={classes.container}>
            <Typography variant="h2" className={classes.title}>
                Trip detail
            </Typography>
            <Box display="flex" alignItems="center">
                <Typography className={classes.label} variant="h6">
                    City of origin:
                </Typography>
                <Chip size="small" icon={<RoomIcon />} label={form.origin} color="secondary" />
            </Box>
            <Box display="flex">
                <Typography className={classes.label} variant="h6">
                    City of destination:
                </Typography>
                <Chip size="small" icon={<RoomIcon />} label={form.destination} color="secondary" />
            </Box>
            <Box display="flex">
                <Typography className={classes.label} variant="h6">
                    Trip date:
                </Typography>
                <Typography variant="h5">{form.date}</Typography>
            </Box>
            <Box display="flex">
                <Typography className={classes.label} variant="h6">
                    Passengers:
                </Typography>
                <Typography variant="h5">{form.passengers}</Typography>
            </Box>
            <Box display="flex" alignItems="center">
                <Typography className={classes.label} variant="h6">
                    Intermediate cities:
                </Typography>
                <Box display="flex">
                    {form.intermediateCities.map((cityName, index) => (
                        <Chip
                            key={`chip-${index}`}
                            size="small"
                            icon={<RoomIcon />}
                            label={cityName}
                            color="primary"
                        />
                    ))}
                </Box>
            </Box>
            <Box mt={4}>
                <Typography variant="h3">Routes</Typography>
                {isLoading ? (
                    <CircularProgress />
                ) : (
                    <>
                        {distances.map(({ label, distance }, index) => (
                            <Box key={`distance-${index}`}>
                                <Typography variant="h6">{label}</Typography>
                                <Typography color="secondary" variant="h5">
                                    {distance}Km
                                </Typography>
                            </Box>
                        ))}
                        <Typography variant="h4">Total distance: {totalDistance}Km</Typography>
                    </>
                )}
            </Box>
        </Box>
    );
};

export default ResultsPage;
