import logo from './logo.svg';
import './App.css';
import Navigation from "./components/Navigation";
import React, {useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from "./pages/HomePage";
import FitnessJournals from "./pages/FitnessJournals";
import WorkoutTemplates from "./pages/WorkoutTemplates";
import Settings from "./pages/Settings";
import Info from "./pages/Info"
import LogJournal from "./pages/LogJournal";
import JournalExercises from "./pages/JournalExercises";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import {Grid} from "@mui/material";
import {Box} from "@mui/system";

function App() {
    return (
        <>
            <BrowserRouter>

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

                <main>
                    <section>
                        <Navigation></Navigation>
                    </section>
                    <section className={"App-content-area"}>
                        <Routes>
                            <Route exact path="/" element={<HomePage/>}/>
                            <Route exact path="/fitnessJournals" element={<FitnessJournals/>}/>
                            <Route exact path="/workoutTemplates" element={<WorkoutTemplates/>}/>
                            <Route exact path="/settings" element={<Settings/>}/>
                            <Route exact path="/info" element={<Info/>}/>
                            <Route exact path="/logJournal" element={<LogJournal/>}/>
                            <Route exact path="/viewJournalExercises" element={<JournalExercises/>}/>
                        </Routes>
                    </section>
                </main>

            </BrowserRouter>
        </>
    );
}

export default App;
