import React, {useEffect, useState} from 'react'
import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import axios from "axios";
import DataTile from "../components/DataTile";
import DataTileProfile from "../components/DataTileProfile";
import {Tooltip} from "@mui/material";

// @ts-ignore
function HomePage({currentUser}) {
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("")
    const [journalCount, setJournalCount] = useState(0)
    const [templateCount, setTemplateCount] = useState(0)
    const [uberFitProfile, setuberFitProfile] = useState({
        username: "",
        typemenu: "",
        levelmenu: "",
        goalsmenu: "",
        TODmenu: ""
    })

    const loadQuote = async () => {
        const response = await axios.get('/getQuote');
        setQuote(response.data[0].quote);
        setAuthor(response.data[0].author);
    }

    const loadJournalsCount = async () => {
        const response = await fetch('/getJournals');
        const journals = await response.json()
        console.log('JOURNALS RETRIEVED', journals.length);
        setJournalCount(journals.length);
    }

    const loadTemplatesCount = async () => {
        const response = await fetch('/getWorkoutTemplates');
        const templates = await response.json()
        console.log('TEMPLATES RETRIEVED', templates.length);
        setTemplateCount(templates.length);
    }

    const loadUberFitProfile = async () => {
        const config = {
            headers: {
                'ngrok-skip-browser-warning': '69420'
            }
        };

        const response = await axios.get('https://3487-96-234-79-164.ngrok-free.app/request-profile', config);

        if (response.status === 200 && response.data.length > 0) {
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

    useEffect(() => {
            loadTemplatesCount();
        }, []
    );

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
                    <DataTile count={journalCount} name={'Number of Journal Entries'}/>
                </Grid>
                <Grid item xs={2}>

                </Grid>
                <Grid item xs={3.5}>
                    <DataTile count={templateCount} name={'Number of Workout Templates'}/>
                </Grid>
                <Grid item xs={12}>
                    <DataTileProfile profile={uberFitProfile}/>
                </Grid>
            </Grid>
        </>
    )
}

export default HomePage;