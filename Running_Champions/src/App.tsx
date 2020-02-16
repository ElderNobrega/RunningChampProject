import React, { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import Menu from './components/Menu';

/* Importing each page for the router */
import { About, CompetitionDetails, CompetitionList, Details, ForgotPassword, HistoryList, Home, Login, Messages, NewCompetition, Register, Settings, Statistics, TeamDetails, Tracking  } from './pages/Pages';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => {
 
  const [selectedPage, setSelectedPage] = useState('');  

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu selectedPage={ selectedPage } />
          <IonRouterOutlet id="main">

            <Route path="/page/Home"               render={(props) => { setSelectedPage('Home'); return <Home />; }}                             exact={true} />
            <Route path="/page/Tracking"           render={(props) => { setSelectedPage('Tracking'); return <Tracking {...props} />; }}          exact={true} />
            <Route path="/page/HistoryList"        render={(props) => { setSelectedPage('HistoryList'); return <HistoryList />; }}               exact={true} />
            <Route path="/page/Details/:id"        render={(props) => { setSelectedPage('Details'); return <Details {...props} />; }}            exact={true} />
            <Route path="/page/TeamDetails"        render={(props) => { setSelectedPage('TeamDetails'); return <TeamDetails />; }}               exact={true} />
            <Route path="/page/CompetitionDetails" render={(props) => { setSelectedPage('CompetitionDetails'); return <CompetitionDetails />; }} exact={true} />
            <Route path="/page/CompetitionList"    render={(props) => { setSelectedPage('CompetitionList'); return <CompetitionList />; }}       exact={true} />
            <Route path="/page/NewCompetition"     render={(props) => { setSelectedPage('NewCompetition'); return <NewCompetition />; }}         exact={true} />
            <Route path="/page/Register"           render={(props) => { setSelectedPage('Register'); return <Register />; }}                     exact={true} />
            <Route path="/page/Login"              render={(props) => { setSelectedPage('Login'); return <Login />; }}                           exact={true} />
            <Route path="/page/ForgotPassword"     render={(props) => { setSelectedPage('ForgotPassword'); return <ForgotPassword />; }}         exact={true} />
            <Route path="/page/Messages"           render={(props) => { setSelectedPage('Messages'); return <Messages />; }}                     exact={true} />
            <Route path="/page/Statistics"         render={(props) => { setSelectedPage('Statistics'); return <Statistics />; }}                 exact={true} />
            <Route path="/page/Settings"           render={(props) => { setSelectedPage('Settings'); return <Settings />; }}                     exact={true} />
            <Route path="/page/About"              render={(props) => { setSelectedPage('About'); return <About />; }}                           exact={true} />

            <Route path="/page/Logout" render={() => <Redirect to="/page/Home"/> } exact={true} />

            <Route path="/" render={() => <Redirect to="/page/Home" />} exact={true} />

          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
