import {  withIonLifeCycle, IonBackButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonSearchbar, IonToolbar, 
          IonList, IonListHeader, IonSelect, IonSelectOption, IonCard, IonCardTitle, IonFab, IonFabButton, IonCardHeader,
          IonCardContent } from '@ionic/react';
import React from 'react';
import '../css/CompList.css';
import {getCompetitions} from '../components/firebaseConfig'
//import { key } from 'ionicons/icons';

class CompetitionListPage extends React.Component {
  state = {count: 0};
  comps: Array<any> = []

  async ionViewWillEnter() {
    this.comps = []
    this.setState({count: 0})
    const comp = await getCompetitions()
    if (comp) {
      comp.forEach((element) => {
        this.comps.push(element)
        this.setState({count: this.state.count + 1 })
        //console.log()
      })
      console.log(this.comps)
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
    let items = this.comps.map(comp => {
      return(
        <IonCard key={comp.compId} button routerLink={ "/page/CompetitionDetails/" + comp.compId} onClick={(e) => console.log('competition detail page')}>
          <IonCardHeader>
            <IonCardTitle>
              <span className="compName">{comp.name}</span>
              <span className="fee">${comp.fee}</span>
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
          <h2>
              <span className="start-date">Start date: {comp.startDate}</span>
              <span className="avgKm">({comp.minRange}km - {comp.maxRange}km)</span>
            </h2>
          </IonCardContent>
          <IonCardContent>
            <h2>
              <span className="end-date">End date: {comp.endDate}</span>
              <span className="entrants">{comp.entrants} entrants</span>
            </h2>
          </IonCardContent>
        </IonCard>
      )
    }) 
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
              <IonSelectOption value='runningComp'>Active competitions</IonSelectOption>
            </IonSelect>
          </IonList>

          <IonList>{items}</IonList>
          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton routerLink="/page/NewCompetition" onClick={(e) => console.log('new competition page')}>Create</IonFabButton>
          </IonFab>
        </IonContent>
      </IonPage>
    );
  };
}

export default withIonLifeCycle(CompetitionListPage);

