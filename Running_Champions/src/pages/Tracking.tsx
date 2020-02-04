import { IonCard, IonFab, IonFabButton, IonBackButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import React from 'react';
import { Run, getSize, addRun } from '../components/localDB';
import '../css/Tracking.css';

const TrackingPage: React.FC<RouteComponentProps> = (props) => {

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
              getSize().then(size => {
                let pos = size + 1;
                addRun(new Run(pos, "Test Run " + pos, pos, "01/01/2020 12:00pm", pos * 1500)).then(index => {
                  props.history.replace("/details/" + index);
                });
              });

              /*addRun(new Run("Test Run", 10, "01/01/2020 12:00pm", 1500)).then(index => {
                props.history.replace("/details/" + index);
              });*/
            }}>Stop Run</IonFabButton>
          </IonFab>

      </IonContent>
    </IonPage>
  );
};

export default TrackingPage;
