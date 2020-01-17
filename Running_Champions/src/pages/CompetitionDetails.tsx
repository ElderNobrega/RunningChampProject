import { IonBackButton, 
        IonButtons, 
        IonContent, 
        IonHeader, 
        IonMenuButton, 
        IonPage, 
        IonTitle, 
        IonToolbar,
        IonCard,
        IonItem,
        IonLabel,
        IonCardTitle
      } from '@ionic/react';
import React from 'react';

const CompDetailsPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle class="ion-text-center">Competition Details</IonTitle>
          <IonButtons slot="end">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
      <IonCard>
        <IonItem>
          <IonCardTitle slot='start'>Firestorm Competition</IonCardTitle>
          <IonLabel slot='end'>$10</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>(8km - 10km)</IonLabel>
          <IonLabel slot='end'>41 entrants</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Start: Dec 31, 2019</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>End: Jan 31, 2020</IonLabel>
        </IonItem>
      </IonCard>
      <IonCard href='/team'>
        <IonItem>
          <IonCardTitle slot='start'>Team First</IonCardTitle>
          <IonLabel slot='end'>30 km</IonLabel>
          <IonLabel slot='end'>1st</IonLabel>
        </IonItem>
      </IonCard>
      <IonCard href='/team'>
        <IonItem>
          <IonCardTitle slot='start'>Team Win</IonCardTitle>
          <IonLabel slot='end'>25 km</IonLabel>
          <IonLabel slot='end'>2nd</IonLabel>
        </IonItem>
      </IonCard>
      <IonCard href='/team'>
        <IonItem>
          <IonCardTitle slot='start'>Team First</IonCardTitle>
          <IonLabel slot='end'>20 km</IonLabel>
          <IonLabel slot='end'>3rd</IonLabel>
        </IonItem>
      </IonCard>
      <IonCard href='/team'>
        <IonItem>
          <IonCardTitle slot='start'>Team First</IonCardTitle>
          <IonLabel slot='end'>8 km</IonLabel>
          <IonLabel slot='end'>4th</IonLabel>
        </IonItem>
      </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default CompDetailsPage;
