import React, {useEffect, useState} from 'react'
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {Box, Button, Grid} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Typography from "@mui/material/Typography";
import axios from "axios";
import DataTile from "../components/DataTile";
import DataTileProfile from "../components/DataTileProfile";

// @ts-ignore
function HomePage({currentUser}) {
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("")
    const [journalCount, setJournalCount] = useState(0)
    const [uberFitProfile, setuberFitProfile] = useState({
        username: "",
        typemenu: "",
        levelmenu: "",
        goalsmenu: "",
        TODmenu: ""
    })
    const columns: GridColDef[] = [
        {field: 'countOfEntries', headerName: 'Number of Journal Entries', width: 150, flex: 1},
    ]
    const navigate = useNavigate();
    const loadQuote = async () => {
        const response = await axios.get('/getQuote');
        const result = JSON.stringify(response.data);
        setQuote(response.data[0].quote);
        setAuthor(response.data[0].author);
    }

    const loadJournalsCount = async () => {
        const response = await fetch('/getJournals');
        const journals = await response.json()
        console.log('JOURNALS RETRIEVED', journals.length);
        setJournalCount(journals.length);
    }

    const loadUberFitProfile = async () => {
        const config = {
            headers: {
                'ngrok-skip-browser-warning': '69420'
            }
        };

        const response = await axios.get('https://3487-96-234-79-164.ngrok-free.app/request-profile', config);

        const result = JSON.parse(response.data);
        const profile = {
            username: result['-username-'],
            typemenu: result['-typemenu-'],
            levelmenu: result['-levelmenu-'],
            goalsmenu: result['-goalsmenu-'],
            TODmenu: result['-TODmenu-']
        }

        setuberFitProfile(profile);
        console.log(uberFitProfile);
    }

    useEffect(() => {
            loadQuote();
        }, []
    );

    useEffect(() => {
            loadJournalsCount();
        }, []
    );

    useEffect(() => {
            loadUberFitProfile();
        }, []
    );

    const test: string = 'check'
    return (
        <>
            <Grid container rowSpacing={5}>
                <Grid item xs={9}>
                    <h2>Welcome {currentUser.firstName}</h2>
                </Grid>
                <Grid item xs={3}>
                    <h4>{new Date().toLocaleString()}</h4>
                </Grid>
                <Grid item xs={12} alignContent={"center"}>
                    <Typography variant={"body1"} align={"center"}
                                color={"text.secondary"}>"{quote}"</Typography>
                </Grid>
                <Grid item xs={12} alignContent={"center"}>
                    <Typography variant={"body1"} align={"center"}
                                color={"text.secondary"}>-{author}</Typography>
                </Grid>
                <Grid item xs={3}>
                    <DataTile count={journalCount}/>
                </Grid>
                <Grid item xs={1}>

                </Grid>
                <Grid item xs={12}>
                    <DataTileProfile profile={uberFitProfile}/>
                </Grid>
            </Grid>
        </>
    )
}

export default HomePage;