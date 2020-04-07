import { withIonLifeCycle, IonFab, IonFabButton, IonBackButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import React from 'react';
import { Plugins } from '@capacitor/core';
import { Run, Position } from '../components/classes';
import { getTime, getDate, getFullDate, getDuration } from '../helperFunctions/Time';
import { StorageAPIWrapper } from '../helperFunctions/localDB';
import '../css/Tracking.css';
import SimpleMap from '../components/SimpleMap';

const { Geolocation } = Plugins;

function watchPosition(arr: Position[], parent: any) {
  const watch = Geolocation.watchPosition({}, (position, err) => {
      if (err) {
        console.log(err);
      }
      else {
        console.log(position);
        arr.push(new Position(position.coords.latitude, position.coords.longitude, position.timestamp));

        var distance = 0;
        if (arr.length > 1) {
          var pos2 = arr[arr.length - 1];
          var pos1 = arr[arr.length - 2];
          distance = getDistance(pos1.lat, pos1.long, pos2.lat, pos2.long);
        }
        parent.addDistance(distance);
      }
  });
  return watch;
}

function clearWatch(id: string) {
  Geolocation.clearWatch({ id });
}

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d * 1000;
}
function deg2rad(deg: number) {
  return deg * (Math.PI/180)
}

class TrackingPage extends React.Component<RouteComponentProps> {

  state = {update: 0};
  startTime: number = 0;
  timer: NodeJS.Timeout = {} as NodeJS.Timeout;
  run = new Run(this.startTime, getDate(), 0, getFullDate(), 0, []);
  distance: number = 0;
  watch: string = "";
  storage: StorageAPIWrapper = new StorageAPIWrapper();

  addDistance(add: number) {
    this.distance += add;
  }

  ionViewWillEnter() {
    this.startTime = getTime();
    this.run = new Run(this.startTime, getDate(), 0, getFullDate(), 0, []);
    Geolocation.getCurrentPosition().then((pos) => {
      this.run.positions.push(new Position(pos.coords.latitude, pos.coords.longitude, pos.timestamp));
    })
    this.watch = watchPosition(this.run.positions, this);
    this.timer = setInterval(() => {
      let duration = document.getElementById('duration');
      if (duration != null) {
        duration.innerHTML = getDuration(this.startTime, getTime());
      }
      let distance = document.getElementById('distance');
      if (distance != null) {
        distance.innerHTML = '' + this.distance;
      }
      this.setState({update: this.state.update + 1});
    }, 500);
  }
  
  ionViewWillLeave() {
    clearWatch(this.watch);
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
          <SimpleMap lat={this.run.positions.length > 0 ? this.run.positions[0].lat : 0} long={this.run.positions.length > 0 ? this.run.positions[0].long : 0} />

          <section className="tracking-section">
            <div className="item">
                <span className="item-label">Duration:</span>
                <span className="item-data" id='duration'>0:00:00</span>
            </div>
            <div className="item">
                <span className="item-label">Distance:</span>
                <span className="item-data" id='distance'>{ "0.0" } m</span>
            </div>
          </section>

          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton onClick={() => {

              clearWatch(this.watch);

              this.storage.openStore({ database:"local", table:"runs" }).then(result => {
                if (result) {
                  this.run.duration = getTime() - this.startTime;
                  this.run.distance = this.distance;
                  this.storage.setItem(this.run.id.toString(), JSON.stringify(this.run)).then(() => {
                    this.props.history.replace("/page/Details/" + this.run.id);
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
