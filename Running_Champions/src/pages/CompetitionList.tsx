import {  IonBackButton, 
          IonButtons, 
          IonContent, 
          IonHeader, 
          IonMenuButton, 
          IonPage, 
          IonTitle, 
          IonSearchbar, 
          IonToolbar, 
          IonList,
          IonListHeader,
          IonItem,
          IonLabel,
          IonSelect,
          IonSelectOption,
          IonCard,
          IonCardTitle,
          IonButton,
          IonIcon
          } from '@ionic/react';
import React from 'react';

const CompListPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle class="ion-text-center">Competitions</IonTitle>
          <IonButtons slot="end">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonSearchbar></IonSearchbar>
      <IonList>
        <IonListHeader>Select your sorting method</IonListHeader>
        <IonSelect interface='alert' multiple={true} placeholder='Select one'>
          <IonSelectOption value='all'>All</IonSelectOption>
          <IonSelectOption value='eligible'>Eligible</IonSelectOption>
          <IonSelectOption value='signed-up'>Signed up</IonSelectOption>
          <IonSelectOption value='runningComp'>Running competitions</IonSelectOption>
        </IonSelect>
      </IonList>
      <IonCard  href='/competition'>
        <IonItem>
          <IonCardTitle slot='start'>Competition name</IonCardTitle>
          <IonLabel slot='end'>$10</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>(8km - 10km)</IonLabel>
          <IonLabel slot='end'>41 entrants</IonLabel>
        </IonItem>
      </IonCard>

      <IonCard  href='/competition'>
        <IonItem>
          <IonCardTitle slot='start'>Competition name</IonCardTitle>
          <IonLabel slot='end'>$15</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>(12km - 15km)</IonLabel>
          <IonLabel slot='end'>85 entrants</IonLabel>
        </IonItem>
      </IonCard>

      <IonCard  href='/competition'>
        <IonItem>
          <IonCardTitle slot='start'>Competition name</IonCardTitle>
          <IonLabel slot='end'>$7</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>(4km - 6km)</IonLabel>
          <IonLabel slot='end'>129 entrants</IonLabel>
        </IonItem>
      </IonCard>

      <section>
      <IonButton href="/compNew" shape='round'>
        Create
      </IonButton>
      </section>
      </IonContent>
    </IonPage>
  );
};

export default CompListPage;
