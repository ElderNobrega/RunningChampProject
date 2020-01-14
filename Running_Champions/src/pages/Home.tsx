import {
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
/*  IonCardSubtitle,*/
  IonCardTitle,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar
  } from '@ionic/react';
import React from 'react';
import './Home.css';

const HomePage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonTitle class="ion-text-center home-title">Home</IonTitle>
          <IonButtons slot="end">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>

{/*
        <IonCard className="welcome-card">
          <img src="/assets/shapes.svg" alt=""/>
          <IonCardHeader>
            <IonCardSubtitle>Get Started</IonCardSubtitle>
            <IonCardTitle>Welcome to Ionic</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              Now that your app has been created, you'll want to start building out features and
              components. Check out some of the resources below for next steps.
            </p>
          </IonCardContent>
        </IonCard>
*/}

        <IonCard className="welcome-card">
          <IonCardHeader>
            <IonCardTitle>History</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              History Content
            </p>
          </IonCardContent>
        </IonCard>

        <IonCard className="welcome-card">
          <IonCardHeader>
            <IonCardTitle>Team</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              Team Content
            </p>
          </IonCardContent>
        </IonCard>

        <IonCard className="welcome-card">
          <IonCardHeader>
            <IonCardTitle>Competitions</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              Competition Content
            </p>
          </IonCardContent>
        </IonCard>

        <IonCard className="welcome-card">
          <IonCardHeader>
            <IonCardTitle>Statistics</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              Statistics Content
            </p>
          </IonCardContent>
        </IonCard>

      </IonContent>
    </IonPage>
  );
};

export default HomePage;
