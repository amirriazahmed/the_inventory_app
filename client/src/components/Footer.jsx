import React from "react";
import {
    Button,
    Grid,
    TextField,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "black",
    },
    paper: {
        padding: theme.spacing(1),
        backgroundColor: "black",
        color: "white",
        fontSize: 16,
    },
    footer: {
        position: "fixed",
        bottom: 0,
        width: '100%',
    }
}));

function Footer() {
    const classes = useStyles();
    return (
        <footer className={classes.footer}>
            <div className={classes.root}>
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.paper}>Developed by the Aknots Group&nbsp;&nbsp;
                    &copy;{new Date().getFullYear()}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.paper}>SOCIAL MEDIA ICONS TO BE ADDED HERE</Paper>
                    </Grid>
                </Grid>
            </div>
        </footer>
    );
}

export default Footer;