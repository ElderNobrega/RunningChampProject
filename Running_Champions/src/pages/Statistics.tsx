import { IonCol, IonRow, IonGrid, IonCard, IonBackButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, withIonLifeCycle } from '@ionic/react';
import React from 'react';
import { Run } from '../components/classes';
import { StorageAPIWrapper } from '../helperFunctions/localDB';

const calcAvgSpeed = (arr: Run[]) => {
  var speeds: number = 0;
  var count: number = 0;
  arr.forEach((e) => {
    if (e.duration !== 0) {
      speeds += e.distance/e.duration;
      count += 1;
    }
  })
  var output = Math.round((count !== 0 ? speeds/count : 0) * 100) / 100; 
  return output;
}

const calcAvgDistance = (arr: Run[]) => {
  var dist: number = 0;
  var count: number = 0;
  arr.forEach((e) => {
    dist += e.distance;
    count += 1;
  })
  var output = Math.round((count !== 0 ? dist/count : 0) * 100) / 100; 
  return output;
}

const calcLongestDist = (arr: Run[]) => {
  var longest: number = 0;
  arr.forEach((e) => {
    if (e.distance > longest) {
      longest = e.distance;
    }
  })
  return longest;
}

class StatisticsPage extends React.Component {
  
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
              this.setState({ count: this.runs.length });
            });
          });
        });
      }
      else {
        console.log('Problem opening local database');
      }
    });
  }


  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton />
            </IonButtons>
            <IonTitle class="ion-text-center">Statistics</IonTitle>
            <IonButtons slot="end">
              <IonMenuButton />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
  
        <IonContent>
  
          <IonCard>
  
          <IonGrid>
            <IonRow>
              <IonCol> Runs:  </IonCol>  <IonCol><span> {this.runs.length} </span></IonCol>
            </IonRow>
            <IonRow>
              <IonCol> Winnings:  </IonCol>  <IonCol><span> 0 </span></IonCol>
            </IonRow>
            <IonRow>
              <IonCol> Avg Speed: </IonCol>  <IonCol><span> {calcAvgSpeed(this.runs)} </span> m/h</IonCol>
            </IonRow>
            <IonRow>
              <IonCol>Longest Distance:</IonCol>  <IonCol><span> {calcLongestDist(this.runs)} </span>m</IonCol>
            </IonRow>
            <IonRow>
              <IonCol>Avg Distance:</IonCol>  <IonCol><span> {calcAvgDistance(this.runs)} </span>m</IonCol>
            </IonRow>
            
          </IonGrid>
          
          </IonCard>
  
        </IonContent>
      </IonPage>
    );  
  }
};

export default withIonLifeCycle(StatisticsPage);
