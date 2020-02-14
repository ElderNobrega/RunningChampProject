import { withIonLifeCycle, IonSearchbar, IonListHeader, IonSelect, IonSelectOption, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonList, IonBackButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { Run } from '../components/classes';
import { StorageAPIWrapper } from '../helperFunctions/localDB';
import '../css/HistoryList.css';

class HistoryListPage extends React.Component {
  state = { count: 0 };
  runs: Run[] = [];
  storage : StorageAPIWrapper = new StorageAPIWrapper();

  ionViewWillEnter() {
    this.runs = [];
    this.setState({ count: 0 });

    this.storage.openStore({ database:"local", table:"runs" }).then(result => {
      if (result) {
        this.storage.getAllKeys().then(keys => {
          // Sorts keys in reverse order
          keys.sort((a: string, b: string) => {
            let intA = parseInt(a);
            let intB = parseInt(b);
            return (intA < intB) ? 1 : ((intA === intB) ? 0 : -1);
          });
    
          // Gets each run in the database
          keys.forEach(key => {
            this.storage.getItem(key).then(runAsString => {
              this.runs.push(JSON.parse(runAsString));
              this.setState({ count: this.state.count + 1 });
            });
          });
        });
      }
      else {
        console.log('Problem opening local database');
      }
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
                  <span className="time">{ run.duration / 1000 } sec</span>
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
