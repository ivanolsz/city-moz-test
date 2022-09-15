import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

import { CitySelectProps } from './types';
import { getCities } from '../../../../api/city';
import { useStyles } from './styles';
import { FormHelperText } from '@material-ui/core';

export const CitySelect = (props: CitySelectProps) => {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState<string[]>([]);
    const loading = open && !options.length;
    const classes = useStyles();

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            // Simulate request
            setTimeout(() => {
                const cities = getCities();

                if (active) {
                    setOptions(cities.map(({ name }) => name));
                }
            }, 1000);
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <Box mb={4}>
            <Autocomplete
                className={classes.select}
                open={open}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                getOptionSelected={(option, value) => option === value}
                getOptionLabel={(option) => option}
                options={options}
                loading={loading}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={props.label || 'Combo box'}
                        variant="outlined"
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                        }}
                    />
                )}
                {...props}
            />
            {props.error !== undefined && (
                <FormHelperText className={classes.error}>{props.error}</FormHelperText>
            )}
        </Box>
    );
};
