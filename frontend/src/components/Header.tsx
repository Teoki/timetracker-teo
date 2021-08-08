import React from "react";
import {AppBar, Grid, makeStyles, Toolbar} from "@material-ui/core";

const useStyles = makeStyles({
    headerText: {
        fontSize: "1.5rem"
    },
})

export default function Header() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Grid container alignItems="center">
                    <Grid item>
                        <p className={useStyles().headerText}>Task-Dashboard</p>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}