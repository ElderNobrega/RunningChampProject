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
          IonIcon,
          IonFab,
          IonFabButton,
          IonCardHeader,
          IonCardContent
          } from '@ionic/react';
import React from 'react';
import '../css/CompList.css';
import { runInContext } from 'vm';

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

      <IonContent>
        <ListItems></ListItems>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton routerLink="/compNew" onClick={(e) => console.log('new competition page')}>Create</IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

const ListItems = () => {
  const comps = [
    {compName: "Competition Name", fee: 10, avgKm: "(8km - 10km)", entrants: 41},
    {compName: "Competition Name", fee: 15, avgKm: "(12km - 15km)", entrants: 85},
    {compName: "Competition Name", fee: 7, avgKm: "(4km - 6km)", entrants: 129},
    {compName: "Competition Name", fee: 20, avgKm: "(16m - 20km)", entrants: 63}
  ];

  let count = 0;
  const items = comps.map(comp => {
    count += 1;
    return (
      <IonCard key={count} button routerLink="/competition" onClick={(e) => console.log('competition detail page')}>
        <IonCardHeader>
          <IonCardTitle>
            <span className="compName">{comp.compName}</span>
            <span className="fee">${comp.fee}</span>
          </IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <h2>
            <span className="avgKm">{comp.avgKm}</span>
            <span className="entrants">{comp.entrants} entrants</span>
          </h2>
        </IonCardContent>
      </IonCard>
    );
  });
  return <IonList>{items}</IonList>;
};

export default CompListPage;

      /*
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
      */


