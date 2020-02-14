import React from 'react';

import About from './About';
import CompetitionDetails from './CompetitionDetails';
import CompetitionList from './CompetitionList';
import Details from './Details';
import ForgotPassword from './ForgotPassword';
import HistoryList from './HistoryList';
import Home from './Home';
import Login from './Login';
import Messages from './Messages';
import NewCompetition from './NewCompetition';
import Register from './Register';
import Settings from './Settings';
import Statistics from './Statistics';
import TeamDetails from './TeamDetails';
import Tracking from './Tracking';

export function getPage(page:string) {
    let component = null;
    switch (page){
        case 'About':
            component = <About />;
            break;
        case 'CompetitionDetails':
            component = <CompetitionDetails />;
            break;
        case 'CompetitionList':
            component = <CompetitionList />;
            break;
        case 'Details':
            component = <Details />;
            break;
        case 'ForgotPassword':
            component = <ForgotPassword />;
            break;
        case 'HistoryList':
            component = <HistoryList />;
            break;
        case 'Home':
            component = <Home />;
            break;
        case 'Login':
            component = <Login />;
            break;
        case 'Messages':
            component = <Messages />;
            break;
        case 'NewCompetition':
            component = <NewCompetition />;
            break;
        case 'Register':
            component = <Register />;
            break;
        case 'Settings':
            component = <Settings />;
            break;
        case 'Statistics':
            component = <Statistics />;
            break;
        case 'TeamDetails':
            component = <TeamDetails />;
            break;
        case 'Tracking':
            component = <Tracking />;
            break;
        default:
            component = <Home />;
            break;
    }
    return component;
}