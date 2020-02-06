import { IonCol, IonRow, IonGrid, IonCard, IonBackButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';

const StatisticsPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle class="ion-text-center">Statistics</IonTitle>
          <IonButtons slot="end">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>

        <IonCard>

        <IonGrid>
          <IonRow>
            <IonCol> Runs:  </IonCol>  <IonCol><span> 23 </span></IonCol>
          </IonRow>
          <IonRow>
            <IonCol> Winnings:  </IonCol>  <IonCol><span> 15 </span></IonCol>
          </IonRow>
          <IonRow>
            <IonCol> Avg Speed: </IonCol>  <IonCol><span> 12 </span> Km/h</IonCol>
          </IonRow>
          <IonRow>
            <IonCol>Longest Distance:</IonCol>  <IonCol><span> 21 </span>Km</IonCol>
          </IonRow>
          
        </IonGrid>
        
        </IonCard>

      </IonContent>
    </IonPage>
  );
};

export default StatisticsPage;
