import { withIonLifeCycle, IonCard, IonFab, IonFabButton, IonBackButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import React from 'react';
import { Plugins } from '@capacitor/core';
import { Position, Run, getSize, addRun } from '../components/localDB';
import '../css/Tracking.css';

const { Geolocation } = Plugins;

function watchPosition(arr: Position[]) {
  const watch = Geolocation.watchPosition({}, (position, err) => {
      if (err) {
        console.log(err);
      }
      else {
        console.log(position);
        arr.push(new Position(position.coords.latitude, position.coords.longitude, position.timestamp));
      }
  });
  return watch;
}

function clearWatch(id: string) {
  Geolocation.clearWatch({ id });
}

class TrackingPage extends React.Component<RouteComponentProps> {

  watch: string = "";
  positions: Position[] = [];

  ionViewWillEnter() {
    console.log('ionViewWillEnter event fired');
    this.watch = watchPosition(this.positions);
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
            <IonBackButton />
          </IonButtons>
          <IonTitle class="ion-text-center">Tracking</IonTitle>
          <IonButtons slot="end">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent id="tracking">
          <IonCard className="map-placeholder">Insert Map Here</IonCard>

          <section className="tracking-section">
            <div className="item">
                <span className="item-label">Duration:</span>
                <span className="item-data">{ "0:00:00" }</span>
            </div>
            <div className="item">
                <span className="item-label">Distance:</span>
                <span className="item-data">{ "0.0" } m</span>
            </div>
          </section>

          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton onClick={() => {

              clearWatch(this.watch);

              getSize().then(size => {
                let pos = size + 1;
                let run = new Run(pos, "Test Run " + pos, pos, "01/01/2020 12:00pm", pos * 1500, this.positions);
                addRun(run).then(index => {
                  this.props.history.replace("/details/" + index);
                });
              });

              /*
              addRun(new Run("Test Run", 10, "01/01/2020 12:00pm", 1500)).then(index => {
                props.history.replace("/details/" + index);
              });
              */
            }}>Stop Run</IonFabButton>
          </IonFab>

      </IonContent>
    </IonPage>
    );      
  }
}

export default withIonLifeCycle(TrackingPage);
