import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane, IonSpinner } from '@ionic/react';
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

/* Import function from firebase config */
import {getCurrentUser} from './components/firebaseConfig';
import { toast } from './helperFunctions/toast';
import { useDispatch } from 'react-redux';
import { setUserState } from './redux/actions';
import { app } from 'firebase';

// PayPal
const express = require("express");
const bodyParser = require("body-parser");
const engines = require("consolidate");
const paypal = require('paypal-rest-sdk');
const aPP = express();
aPP.engine("ejs", engines.ejs);
aPP.set("views", "./views");
aPP.set("view engine", "ejs");
aPP.use(bodyParser.json());
aPP.use(bodyParser.urlencoded({ extended: true }));
paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
      "AW_t36R6h5RUa1-2rZZA3IS3FwrhKLVsUyV8bOA3FelHQSmQEX4voN-6j-aJ84PrAkp70zx8dNaXmexv",
  client_secret:
      "EKv9n-1i07CydfiWmANh2CCC6U4drmRMk0jsf6JfIBDyUvfJ8eFr4ZW5h9x6qsfqAAmvrRCY-SwGLelo"
});
//next code may not needed
aPP.get("/", (req, res) => {
  res.render("indexPP"); 
});
app.get("/paypal", (req, res) => {
  var create_payment_json = {
      intent: "sale",
      payer: {
          payment_method: "paypal"
      },
      redirect_urls: {
          return_url: "http://localhost:3000/success",
          cancel_url: "http://localhost:3000/cancel"
      },
      transactions: [
          {
              item_list: {
                  items: [
                      {
                          name: "item",
                          sku: "item",
                          price: "1.00",
                          currency: "USD",
                          quantity: 1
                      }
                  ]
              },
              amount: {
                  currency: "USD",
                  total: "1.00"
              },
              description: "This is the payment description."
          }
      ]
  };
  paypal.payment.create(create_payment_json, function(error, payment) {
      if (error) {
          throw error;
      } else {
          console.log("Create Payment Response");
          console.log(payment);
          res.redirect(payment.links[1].href);
      }
  });
});
app.get("/success", (req, res) => {
  // res.send("Success");
  var PayerID = req.query.PayerID;
  var paymentId = req.query.paymentId;
  var execute_payment_json = {
      payer_id: PayerID,
      transactions: [
          {
              amount: {
                  currency: "USD",
                  total: "1.00"
              }
          }
      ]
  };
  paypal.payment.execute(paymentId, execute_payment_json, function(
      error,
      payment
  ) {
      if (error) {
          console.log(error.response);
          throw error;
      } else {
          console.log("Get Payment Response");
          console.log(JSON.stringify(payment));
          res.render("success");
      }
  });
});
app.get("cancel", (req, res) => {
  res.render("cancel");
});


const RoutingSystem: React.FC = () => {
 
  const [selectedPage, setSelectedPage] = useState('');  

  return (
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
  )
}

const App: React.FC = () => {

  const [busy, setBusy] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    getCurrentUser().then((user: any) => {
      if (user) {
        // user is logged in
        dispatch(setUserState(user.email))
        window.history.replaceState({}, '', '/page/Home') 
      }else {
        window.history.replaceState({}, '', '/page/Login')
        toast('Please sign in first')
      }
      setBusy(false)
    })
  }, [dispatch])
  
return <IonApp>{busy ? <IonSpinner/> : <RoutingSystem/>}</IonApp>
};

export default App;
