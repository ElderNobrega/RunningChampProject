import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { AppPage } from './declarations';

import Menu from './components/Menu';
import { list, unlock } from 'ionicons/icons';

/* Importing each page for the router */
import Home from './pages/Home';

import Tracking from './pages/Tracking';
import History from './pages/HistoryList';
import Details from './pages/Details';

import Team from './pages/TeamDetails';

import Competition from './pages/CompetitionDetails';
import CompList from './pages/CompetitionList';
import CompNew from './pages/NewCompetition';

import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';

import Messages from './pages/Messages';
import Statistics from './pages/Statistics';
import Settings from './pages/Settings';
import About from './pages/About';

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

const appPages: AppPage[] = [
  {
    title: 'Login',
    url: '/login',
    icon: unlock
  },
  {
    title: 'Messages',
    url: '/messages',
    icon: list
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: list
  },
  {
    title: 'About Us',
    url: '/about',
    icon: list
  }
];

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonSplitPane contentId="main">
        <Menu appPages={appPages} />
        <IonRouterOutlet id="main">
          <Route path="/home" component={Home} exact={true} />
          <Route path="/tracking" component={Tracking} exact={true} />
          <Route path="/history" component={History} exact={true} />
          <Route path="/details" component={Details} exact={true} />
          <Route path="/team" component={Team} exact={true} />
          <Route path="/competition" component={Competition} exact={true} />
          <Route path="/compList" component={CompList} exact={true} />
          <Route path="/compNew" component={CompNew} exact={true} />
          <Route path="/register" component={Register} exact={true} />
          <Route path="/login" component={Login} exact={true} />
          <Route path="/forgot" component={ForgotPassword} exact={true} />
          <Route path="/logout" render={() => <Redirect to="/home"/> } exact={true} />
          <Route path="/messages" component={Messages} exact={true} />
          <Route path="/statistics" component={Statistics} exact={true} />
          <Route path="/settings" component={Settings} exact={true} />
          <Route path="/about" component={About} exact={true} />
          <Route path="/" render={() => <Redirect to="/home"/> } exact={true} />
        </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  </IonApp>
);

export default App;
