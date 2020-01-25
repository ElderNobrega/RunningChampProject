import { IonCard, IonFab, IonFabButton, IonBackButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import React from 'react';
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
                props.history.replace("/details");
            }}>Stop Run</IonFabButton>
          </IonFab>

      </IonContent>
    </IonPage>
  );
};

export default TrackingPage;
