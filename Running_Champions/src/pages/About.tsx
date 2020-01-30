import { IonCardContent, IonCardTitle, IonCardSubtitle, IonCardHeader, IonCard, IonBackButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle class="ion-text-center">About</IonTitle>
          <IonButtons slot="end">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Us</IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          RUNNING CHAMPIONS is a college project from 4 friends; 
          Alan Akwasi, Elder and Robert.<br></br>
          Our goal is to incentive people to increase their running 
          activities and consequently their health through many different 
          feature such as create a team with your friends and to enter into
          competitions for a chance of winning a pool.<br></br><br></br>
          We are very proud of this new version 1.0.0
        </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default AboutPage;
