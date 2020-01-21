import { IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonList, IonBackButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import './HistoryList.css';

const HistoryListPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle class="ion-text-center">History</IonTitle>
          <IonButtons slot="end">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
          <ListItems></ListItems>
      </IonContent>
    </IonPage>
  );
};

const ListItems = () => {
  const runs = [
      { name: "Run 1", time: 10, date: "01/01/2020", distance: 1.0 },
      { name: "Run 2", time: 20, date: "02/02/2020", distance: 2.0 },
      { name: "Run 3", time: 30, date: "03/03/2020", distance: 3.0 },
      { name: "Run 4", time: 40, date: "04/04/2020", distance: 4.0 },
      { name: "Run 5", time: 50, date: "05/05/2020", distance: 5.0 }
  ];

  let count = 0;
  const items = runs.map(run => {
    count += 1;
    return (
      <IonCard key={count} button routerLink="/details" onClick={(e) => console.log('details page')}>
          <IonCardHeader>
            <IonCardTitle>
                <span className="name">{ run.name }</span>
                <span className="time">{ run.time } min</span>
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
              <h2>
                  <span className="date">{ run.date }</span>
                  <span className="distance">{ run.distance } km</span>
              </h2>
          </IonCardContent>
      </IonCard>
    );
  });

  return <IonList>{items}</IonList>;
};

export default HistoryListPage;
