import { makeStyles, createStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        form: {
            '& .MuiFormHelperText-root': {
                color: theme.palette.error.main,
            },
        },
        formControl: {
            width: 300,
            marginBottom: theme.spacing(4),
        },
        listItem: {
            backgroundColor: theme.palette.grey['100'],
            borderRadius: theme.spacing(4),
            marginBottom: theme.spacing(1),
        },
        submitButton: {},
    })
);
