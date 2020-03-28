import {  withIonLifeCycle, IonBackButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonSearchbar, IonToolbar, 
          IonList, IonListHeader, IonSelect, IonSelectOption, IonCard, IonCardTitle, IonFab, IonFabButton, IonCardHeader,
          IonCardContent } from '@ionic/react';
import React from 'react';
import '../css/CompList.css';
import {getCompetitions} from '../components/firebaseConfig'
import { key } from 'ionicons/icons';

class CompetitionListPage extends React.Component {
  state = {count: 0};
  comps = []

  async ionViewWillEnter() {
    this.comps = []
    this.setState({count: 0})
    const comp = await getCompetitions()
    if (comp) {
      //console.log(comp)
      comp.forEach(key => {
        console.log(key)
      })
      /* this.comps = comp
      console.log(this.comps)
      this.setState({count: this.state.count + comp.length -1}) */
    } else {
      console.log('Problem loading the database')
    }
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
    /* let items = this.comps.map(comp => {
      return(
        <IonCard key={comp.compId} button routerLink="/page/CompetitionDetails" onClick={(e) => console.log('competition detail page')}>
          <IonCardHeader>
            <IonCardTitle>
              <span className="compName">{comp.name}</span>
              <span className="fee">${comp.fee}</span>
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <h2>
              <span className="avgKm">({comp.minKm}km - {comp.maxKm}km)</span>
              <span className="entrants">{comp.entrants} entrants</span>
            </h2>
          </IonCardContent>
        </IonCard>
      )
    }) */
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

        <IonContent id="competition-list">
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

          {/* <ListItems></ListItems> */}
          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton routerLink="/page/NewCompetition" onClick={(e) => console.log('new competition page')}>Create</IonFabButton>
          </IonFab>
        </IonContent>
      </IonPage>
    );
  };

  /* const ListItems = () => {
    const comps = [
      {compName: "Competition Name", fee: 10, minKm: "8", maxKm: "10", entrants: 41},
      {compName: "Competition Name", fee: 15, minKm: "12", maxKm: "10", entrants: 85},
      {compName: "Competition Name", fee: 7, minKm: "4", maxKm: "10", entrants: 129},
      {compName: "Competition Name", fee: 20, minKm: "16", maxKm: "10", entrants: 63}
    ];

    let count = 0;
    const items = comps.map(comp => {
      count += 1;
      return (
        <IonCard key={count} button routerLink="/page/CompetitionDetails" onClick={(e) => console.log('competition detail page')}>
          <IonCardHeader>
            <IonCardTitle>
              <span className="compName">{comp.compName}</span>
              <span className="fee">${comp.fee}</span>
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <h2>
              <span className="avgKm">({comp.minKm}km - {comp.maxKm}km)</span>
              <span className="entrants">{comp.entrants} entrants</span>
            </h2>
          </IonCardContent>
        </IonCard>
      );
    });
    return <IonList>{items}</IonList>;
  } */
}

export default withIonLifeCycle(CompetitionListPage);

