import React, {useState} from "react";
import {MdHome} from "react-icons/md";
import {Link} from 'react-router-dom';
import CreateIcon from '@mui/icons-material/Create';
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';

const Navigation = () => {
    const style = {color: "#282c34"}
    const li = [
        ["Home", <HomeIcon style={style}/>, '/'],
        ["Fitness Journal Entries", <CreateIcon style={style}/>, '/fitnessJournals'],
        ["Workout Templates", <DescriptionIcon style={style}/>, '/workoutTemplates'],
        ["Settings", <SettingsIcon style={style}/>, '/settings'],
        ["Info", <InfoIcon style={style}/>, '/info']]

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
                ))}
            </ul>
        </nav>
    );
};

export default Navigation;
