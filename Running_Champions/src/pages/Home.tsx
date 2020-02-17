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

const userEmail = useSelector((state: any) => state.user.userEmail)

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonTitle class="ion-text-center home-title">Home</IonTitle>
          <IonLabel slot="end">Hi, {userEmail}</IonLabel>
          <IonButtons slot="end">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <IonCard className="home-card" button routerLink="/history" onClick={(e) => console.log('history page')}>
          <IonCardHeader>
            <IonCardTitle>History</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              History Content
            </p>
          </IonCardContent>
        </IonCard>

        <IonCard className="home-card" button routerLink="/team" onClick={(e) => console.log('team page')}>
          <IonCardHeader>
            <IonCardTitle>Team</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              Team Content
            </p>
          </IonCardContent>
        </IonCard>

        <IonCard className="home-card" button routerLink="/compList" onClick={(e) => console.log('competition List page')}>
          <IonCardHeader>
            <IonCardTitle>Competitions</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              Competition Content
            </p>
          </IonCardContent>
        </IonCard>

        <IonCard className="home-card" button routerLink="/statistics" onClick={(e) => console.log('statistics page')}>
          <IonCardHeader>
            <IonCardTitle>Statistics</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              Statistics Content
            </p>
          </IonCardContent>
        </IonCard>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton routerLink="/tracking" onClick={(e) => console.log('tracking page')}>Start Run</IonFabButton>
        </IonFab>

      </IonContent>
    </IonPage>
  );
};

export default HomePage;
