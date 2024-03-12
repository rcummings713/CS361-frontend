import {Grid} from "@mui/material";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import React from "react";


export default function Header() {
    return (
        <header className={"App-header"}>
            <Grid container alignItems="center" justifyContent="center" columnSpacing={1}>
                <Grid item>
                    <MonitorHeartIcon/>
                </Grid>
                <Grid item>
                    <h1>
                        Fit Journal
                    </h1>
                </Grid>
            </Grid>
            <meta name="viewport" content="initial-scale=1, width=device-width"/>
        </header>
    )
}