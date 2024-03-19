import './App.css';
import Navigation from "./components/Navigation";
import React, {useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from "./pages/HomePage";
import FitnessJournals from "./pages/FitnessJournals";
import WorkoutTemplates from "./pages/WorkoutTemplates";
import Profile from "./pages/Profile";
import Info from "./pages/Info"
import LogJournal from "./pages/LogJournal";
import JournalExercises from "./pages/JournalExercises";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Header from "./components/Header";
import Templates from "./pages/Templates";
import LogTemplate from "./pages/LogTemplate";

function App() {
    const [currentUser, setCurrentUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        userName: "",
        password: ""
    });
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    function landing(currentUser, isLoggedIn) {
        console.log(isLoggedIn)
        if (isLoggedIn) {
            console.log(currentUser)
            return (<>
                <main>
                    <section>
                        <Navigation></Navigation>
                    </section>
                    <section className={"App-content-area"}>
                        <Routes>
                            <Route exact path="/"
                                   element={<HomePage currentUser={currentUser} setCurrentUser={setCurrentUser}/>}/>
                            <Route exact path="/fitnessJournals" element={<FitnessJournals/>}/>
                            <Route exact path="/workoutTemplates" element={<WorkoutTemplates/>}/>
                            <Route exact path={"/viewTemplates"} element={<Templates/>}/>
                            <Route exact path="/logTemplates" element={<LogTemplate/>}/>
                            <Route exact path="/profile" element={<Profile currentUser={currentUser}/>}/>
                            <Route exact path="/info" element={<Info/>}/>
                            <Route exact path="/logJournal" element={<LogJournal/>}/>
                            <Route exact path="/viewJournalExercises" element={<JournalExercises/>}/>
                        </Routes>
                    </section>
                </main>
            </>)
        }
        return (
            <>
                <main className={"d-flex justify-content-center"} style={{width: '100%'}}>
                    <section style={{width: '100%'}}>
                        <Routes>
                            <Route exact path="/"
                                   element={<SignIn
                                       currentUser={currentUser}
                                       setCurrentUser={setCurrentUser}
                                       isLoggedIn={isLoggedIn}
                                       setIsLoggedIn={setIsLoggedIn}
                                   />}/>
                            <Route exact path="/signUp" element={<SignUp/>}/>
                        </Routes>
                    </section>
                </main>
            </>
        )
    }

    return (
        <>
            <BrowserRouter>
                <Header></Header>
                {landing(currentUser, isLoggedIn)}
            </BrowserRouter>
        </>
    );
}

export default App;
