import { IonCard, IonButton, IonBackButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import '../css/Details.css';

const DetailsPage: React.FC = () => {
  const run = { name: "Run 1", time: 10, date: "01/01/2020 1:00pm", distance: 1.0 };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
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
                    <input defaultValue={ run.name } /> 
                    <IonButton onClick={(e) => console.log('save button')}>Save</IonButton>
                </span>
            </div>
            <div className="item">
                <span className="item-label">Duration:</span>
                <span className="item-data">{ run.time } min</span>
            </div>
            <div className="item">
                <span className="item-label">Distance:</span>
                <span className="item-data">{ run.distance } km</span>
            </div>
            <div className="item">
                <span className="item-label">Date:</span>
                <span className="item-data">{ run.date }</span>
            </div>
          </section>
          
          <IonCard className="map-placeholder">Insert Map Here</IonCard>
      </IonContent>
    </IonPage>
  );
};

export default DetailsPage;
