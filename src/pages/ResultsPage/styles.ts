import { makeStyles, createStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            height: '100vh',
            padding: theme.spacing(4),
            display: 'flex',
            flexDirection: 'column',
        },
        title: {
            textAlign: 'center',
            color: 'black',
            marginBottom: theme.spacing(8),
        },
        label: {
            width: 200,
            color: theme.palette.grey['500'],
        },
    })
);
