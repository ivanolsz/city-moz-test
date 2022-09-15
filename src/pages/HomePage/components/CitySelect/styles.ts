import { makeStyles, createStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        select: {
            width: 300,
        },
        error: {
            marginLeft: 14,
            color: theme.palette.error.main,
        },
    })
);
