import { IonCheckbox, IonList, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonCard, IonCardContent, IonToggle, IonLabel, IonItem } from '@ionic/react';
import React from 'react';

const SettingsPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle class="ion-text-center">Settings</IonTitle>
          <IonButtons slot="end">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonCard>
          <IonCardContent>
            <IonList>
              <IonItem>
                <IonLabel><div>Account Settings???</div></IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel><div>Profile Settings???</div></IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Notifications</IonLabel>
                <IonToggle value="notifications" onChange={() => {}} />
              </IonItem>
              <IonItem>
                <IonLabel>Dark Mode</IonLabel>
                <IonToggle value="darkMode" onChange={() => {}} />
              </IonItem>
              <IonItem>
                <IonLabel>Distance Unit in km</IonLabel>
                <IonCheckbox checked={true} slot="end"/>
              </IonItem>
              <IonItem>
                <IonLabel>Distance Unit in miles</IonLabel>
                <IonCheckbox checked={false} slot="end"/>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
