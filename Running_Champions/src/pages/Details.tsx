import { IonCard, IonButton, IonBackButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import { getRuns } from '../components/localDB';
import '../css/Details.css';

interface DetailPageProps extends RouteComponentProps<{
  id: string;
}> {}
  
const DetailsPage: React.FC<DetailPageProps> = ({match}) => {

  getRuns().then(data => {
    let run = data[parseInt(match.params.id)];

    let name = (document.getElementById('name') as HTMLInputElement);
    if (name != null) {
        name.defaultValue = run.name;
    }

    let time = (document.getElementById('time') as HTMLSpanElement);
    if (time != null) {
        time.innerHTML = run.time + ' min';
    }

    let distance = (document.getElementById('distance') as HTMLSpanElement);
    if (distance != null) {
        distance.innerHTML = run.distance / 1000 + ' km';
    }

    let date = (document.getElementById('date') as HTMLSpanElement);
    if (date != null) {
        date.innerHTML = run.date;
    }

  });

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
                    <input id="name" /> 
                    <IonButton onClick={(e) => console.log('save button')}>Save</IonButton>
                </span>
            </div>
            <div className="item">
                <span className="item-label">Duration:</span>
                <span className="item-data" id="time"></span>
            </div>
            <div className="item">
                <span className="item-label">Distance:</span>
                <span className="item-data" id="distance"></span>
            </div>
            <div className="item">
                <span className="item-label">Date:</span>
                <span className="item-data" id="date"></span>
            </div>
          </section>
          
          <IonCard className="map-placeholder">Insert Map Here</IonCard>
      </IonContent>
    </IonPage>
  );
};

export default DetailsPage;
