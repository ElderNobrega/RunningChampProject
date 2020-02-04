import { withIonLifeCycle, IonSearchbar, IonListHeader, IonSelect, IonSelectOption, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonList, IonBackButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { Run, getRuns } from '../components/localDB';
import '../css/HistoryList.css';

/*
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

      <IonContent id="history">
        <IonSearchbar></IonSearchbar>
        
        <IonList className="item">
          <IonListHeader className="item-label">Sorted by:</IonListHeader>
          <IonSelect className="item-data" interface='popover'>
            <IonSelectOption value='date' selected>Date</IonSelectOption>
            <IonSelectOption value='distance'>Distance</IonSelectOption>
          </IonSelect>
        </IonList>


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

  let count = -1;
  const items = runs.map(run => {
    count += 1;
    return (
      <IonCard key={ count } button routerLink={ "/details/" + count } onClick={(e) => console.log('details page')}>
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
*/

class HistoryListPage extends React.Component {
  state = { isFetching: false };
  runs: Run[] = [];

  ionViewWillEnter() {
    console.log('ionViewWillEnter event fired')
    getRuns().then(data => {
      this.runs = data.reverse();
      this.setState({ isFetching: false });
    });
  }
  
  ionViewWillLeave() {
    console.log('ionViewWillLeave event fired')
  }
  
  ionViewDidEnter() {
    console.log('ionViewDidEnter event fired');
  }
  
  ionViewDidLeave() {
    console.log('ionViewDidLeave event fired')
  }
  
  render() {

    let items = this.runs.map(run => {
      return (
        <IonCard key={ run.id } button routerLink={ "/details/" + run.id } onClick={(e) => console.log('details page')}>
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
      
          <IonContent id="history">
            <IonSearchbar></IonSearchbar>
            
            <IonList className="item">
                <IonListHeader className="item-label">Sorted by:</IonListHeader>
                <IonSelect className="item-data" interface='popover'>
                <IonSelectOption value='date' selected>Date</IonSelectOption>
                <IonSelectOption value='distance'>Distance</IonSelectOption>
                </IonSelect>
            </IonList>
      
            <IonList>{ items }</IonList>
          </IonContent>
      </IonPage>
    );      
  }
}

export default withIonLifeCycle(HistoryListPage);
