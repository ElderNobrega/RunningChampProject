import { withIonLifeCycle, IonCard, IonFab, IonFabButton, IonBackButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import React from 'react';
import { Plugins } from '@capacitor/core';
import { Run, Position } from '../components/classes';
import { StorageAPIWrapper } from '../components/localDB';
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
  storage: StorageAPIWrapper = new StorageAPIWrapper();

  ionViewWillEnter() {
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

              this.storage.openStore({ database:"local", table:"runs" }).then(result => {
                if (result) {
                  this.storage.getAllKeys().then(keys => {
                    let pos = keys.length + 1;
                    let run = new Run(pos, "Test Run " + pos, pos, "01/01/2020 12:00pm", pos * 1500, this.positions);
                    this.storage.setItem(pos.toString(), JSON.stringify(run)).then(() => {
                      this.props.history.replace("/details/" + pos);
                    });
                  });
                }
                else {
                  console.log('Problem opening local database');
                }
              });

            }}>Stop Run</IonFabButton>
          </IonFab>

      </IonContent>
    </IonPage>
    );      
  }
}

export default withIonLifeCycle(TrackingPage);
