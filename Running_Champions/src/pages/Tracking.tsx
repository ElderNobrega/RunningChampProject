import { withIonLifeCycle, IonCard, IonFab, IonFabButton, IonBackButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import React from 'react';
import { Plugins } from '@capacitor/core';
import { Run, Position } from '../components/classes';
import { getTime, getDate, getFullDate, getDuration } from '../helperFunctions/Time';
import { StorageAPIWrapper } from '../helperFunctions/localDB';
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

  startTime: number = 0;
  timer: NodeJS.Timeout = {} as NodeJS.Timeout;
  run: Run = {} as Run;
  watch: string = "";
  storage: StorageAPIWrapper = new StorageAPIWrapper();

  ionViewWillEnter() {
    this.startTime = getTime();
    this.run = new Run(this.startTime, getDate(), 0, getFullDate(), 0, []);
    this.watch = watchPosition(this.run.positions);
    this.timer = setInterval(() => {
      let duration = document.getElementById('duration');
      if (duration != null) {
        duration.innerHTML = getDuration(this.startTime, getTime());
      }
    }, 500);
  }
  
  ionViewWillLeave() {
    clearInterval(this.timer);
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
                <span className="item-data" id='duration'>0:00:00</span>
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
                  this.run.duration = getTime() - this.startTime;
                  this.storage.setItem(this.run.id.toString(), JSON.stringify(this.run)).then(() => {
                    this.props.history.replace("/details/" + this.run.id);
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
