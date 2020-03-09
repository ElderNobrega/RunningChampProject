import {
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFab, 
  IonFabButton,
  IonLabel
  } from '@ionic/react';
import React from 'react';
import '../css/Home.css'; 
import { useSelector } from 'react-redux';

const HomePage: React.FC = () => {

  // undefined if not logged in
  const userEmail = useSelector((state: any) => {
    return state !== undefined ? 'Hi, ' + state.user.userEmail : undefined;
  })

  const userIsLoggedIn = useSelector((state: any) => {
    return state !== undefined;
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonTitle class="ion-text-center home-title">Home</IonTitle>
          <IonLabel slot="end">{userEmail}</IonLabel>
          <IonButtons slot="end">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <IonCard className="home-card" button routerLink="/page/HistoryList" onClick={(e) => console.log('history page')}>
          <IonCardHeader>
            <IonCardTitle>History</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              History Content
            </p>
          </IonCardContent>
        </IonCard>

        <IonCard className="home-card" button routerLink="/page/Statistics" onClick={(e) => console.log('statistics page')}>
          <IonCardHeader>
            <IonCardTitle>Statistics</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              Statistics Content
            </p>
          </IonCardContent>
        </IonCard>

        <IonCard className="home-card" button routerLink="/page/TeamDetails" onClick={(e) => console.log('team page')} disabled={!userIsLoggedIn}>
          <IonCardHeader>
            <IonCardTitle>Team</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              { userIsLoggedIn ? "Team Content" : "Please log in to use this feature" }
            </p>
          </IonCardContent>
        </IonCard>

        <IonCard className="home-card" button routerLink="/page/CompetitionList" onClick={(e) => console.log('competition List page')} disabled={!userIsLoggedIn}>
          <IonCardHeader>
            <IonCardTitle>Competitions</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              { userIsLoggedIn ? "Competition Content" : "Please log in to use this feature" }
            </p>
          </IonCardContent>
        </IonCard>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton routerLink="/page/Tracking" onClick={(e) => console.log('tracking page')}>Start Run</IonFabButton>
        </IonFab>

      </IonContent>
    </IonPage>
  );
};

export default HomePage;
