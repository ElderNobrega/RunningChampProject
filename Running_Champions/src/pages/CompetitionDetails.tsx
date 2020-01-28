import { IonBackButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonCard,
        IonCardTitle, IonCardHeader, IonList} from '@ionic/react';
import React from 'react';
import '../css/CompDetail.css';
import { runInContext } from 'vm';

const CompDetailsPage: React.FC = () => {
  const comp = {compName: "Competition Name", fee: 10, avgKm: "(8km - 10km)", entrants: 41, startDate: "02/31/2020", endDate: "03/31/2020"}

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

      <IonContent id="compDetail">
        <section>
          <div className="comp-detail">
            <span>{comp.compName}</span>
            <span className="fee">${comp.fee}</span>
          </div>
          <div className="comp-detail">
              <span>{comp.avgKm}</span>
              <span className="entrants">{comp.entrants} entrants</span>
          </div>
          <div className="comp-detail">
            <span className="comp-item">Start: </span>
            <span>{comp.startDate}</span>
          </div>
          <div className="comp-detail">
            <span className="comp-item">End: </span>
            <span>{comp.endDate}</span>
          </div>
        </section>
        <ListItems></ListItems>
      </IonContent>
      
    </IonPage>
    
  );
};

const ListItems = () => {
  const teams = [
    {tName: "Team First", distance: 30.0, place: "1st"},
    {tName: "Team Win", distance: 25.0, place: "2nd"},
    {tName: "Team Good", distance: 20.4, place: "3rd"},
    {tName: "Team Trying", distance: 17.0, place: "4th"},
    {tName: "Team Never Give Up", distance: 6.3, place: "5th"}
  ];

  let count = 0;
  const items = teams.map(team => {
    count += 1;
    return (
      <IonCard id="list" key={count} button routerLink="/team" onClick={(e) => console.log("teams page")}>
        <IonCardHeader>
          <IonCardTitle>
            <span className="comp-item-first">{team.tName}</span>
            <span className="comp-item-list">{team.distance } km</span>
            <span className="comp-item-list">{team.place}</span>
          </IonCardTitle>
        </IonCardHeader>
      </IonCard>
    )
  })
  return <IonList>{items}</IonList>;
}

export default CompDetailsPage;
