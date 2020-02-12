import { withIonLifeCycle, IonCard, IonCardContent, IonButton, IonBackButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Run, Position } from '../components/classes';
import { StorageAPIWrapper } from '../helperFunctions/localDB';
import '../css/Details.css';

interface DetailPageProps extends RouteComponentProps<{
  id: string;
}> {}

class DetailsPage extends React.Component<DetailPageProps> {

  state = { isFetching: true };
  run : Run = new Run(0, "", 0, "", 0, []);
  storage : StorageAPIWrapper = new StorageAPIWrapper();

  ionViewWillEnter() {
    this.storage.openStore({ database:"local", table:"runs" }).then(result => {
      if (result) {
        this.storage.getItem(this.props.match.params.id).then(runAsString => {
          this.run = JSON.parse(runAsString);
          this.setState({ isFetching: false });
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
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/home" />
            </IonButtons>
            <IonTitle class="ion-text-center">Details</IonTitle>
            <IonButtons slot="end">
              <IonMenuButton />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
  
        <IonContent id="details">
            <section className="details-section">
              <div className="item">
                  <span className="item-label">Name:</span>
                  <span className="item-data">
                      <input id="name" defaultValue={ this.state.isFetching ? "" : this.run.name } />
                      <IonButton onClick={(e) => console.log('save button')}>Save</IonButton>
                  </span>
              </div>
              <div className="item">
                  <span className="item-label">Duration:</span>
                  <span className="item-data" id="time">{ this.state.isFetching ? "" : (this.run.duration / 1000) + ' sec' }</span>
              </div>
              <div className="item">
                  <span className="item-label">Distance:</span>
                  <span className="item-data" id="distance">{ this.state.isFetching ? "" : this.run.distance / 1000 + ' km' }</span>
              </div>
              <div className="item">
                  <span className="item-label">Date:</span>
                  <span className="item-data" id="date">{ this.state.isFetching ? "" : this.run.date }</span>
              </div>
            </section>
            
            <IonCard className="map-placeholder" id="map">          
              <IonCardContent>
                { this.state.isFetching ? "Insert Map Here": this.getPositions() }
              </IonCardContent>
            </IonCard>
        </IonContent>
      </IonPage>
    );
  }

  getPositions() {
    let output = "";
    this.run.positions.forEach((e: Position) => {
      output += `{lat: ${e.lat}, long: ${e.long}, time: ${e.timestamp}}`
    });
    return output;
  }
}

export default withIonLifeCycle(DetailsPage);