import React, {useState} from "react";
import {MdHome} from "react-icons/md";
import {Link} from 'react-router-dom';
import CreateIcon from '@mui/icons-material/Create';
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import {Tooltip} from "@mui/material";

const Navigation = () => {
    const style = {color: "#282c34"}
    const li = [
        ["Home", <HomeIcon style={style}/>, '/', "Home page"],
        ["Fitness Journal Entries",
            <CreateIcon
                style={style}/>, '/fitnessJournals', "Allows user to view and create fitness journal entries. Easiest way to add a journal entry and exercises."],
        ["Workout Templates",
            <DescriptionIcon
                style={style}/>, '/workoutTemplates', "Allows user to view and create workout templates. Workout templates are best if you have repetitive exercises"],
        ["Profile", <SettingsIcon style={style}/>, '/profile', "View user profile information"],
        ["Info", <InfoIcon style={style}/>, '/info', "View feature information"]]

    const [window, setWindow] = useState(false);

    let openClose = () => {
        if (window === false) {
            setWindow(true);
        } else {
            setWindow(false);
        }
    };

    return (
        <nav className="navbar-menu" style={{width: !window ? 250 : 60}}>
            {/*<div className="burger" onClick={() => openClose()}>
        <img src="img/menu.svg" alt="burger" />
    </div>*/}
            <ul className="navbar__list">
                {li.map((item, i) => (
                    <>
                        <Tooltip title={item[3]}>
                            <div className="navbar__li-box" key={i}>
                                <Link to={{pathname: `${item[2]}`}}>
                                    <>{item[1]}</>
                                    <li
                                        className="navbar__li"
                                        style={{display: !window ? "inline-block" : "none"}}
                                    >
                                        <>{item[0]}</>
                                    </li>
                                </Link>
                            </div>
                        </Tooltip>
                    </>
                ))}
            </ul>
        </nav>
    );
};

export default Navigation;
