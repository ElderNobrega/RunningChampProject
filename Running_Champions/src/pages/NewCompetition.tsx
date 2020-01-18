import { IonBackButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonItem, IonList, IonLabel, IonInput, IonRadioGroup, IonListHeader, IonRadio } from '@ionic/react';
import React from 'react';

const NewCompPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle class="ion-text-center">New Competition</IonTitle>
          <IonButtons slot="end">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <form>
          <IonList>
            <IonItem>
              <IonLabel>Name:</IonLabel>
              <IonInput placeholder='Type the competition name' type='text' clearInput required></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>Fee $:</IonLabel>
              <IonInput type='number' required></IonInput>
            </IonItem>
            <IonItem>
              <IonRadioGroup>
                <IonListHeader>
                  <IonLabel>Competition type</IonLabel>
                </IonListHeader>
                <IonItem>
                  <IonLabel>Private</IonLabel>
                  <IonRadio value='private'></IonRadio>
                </IonItem>
                <IonItem>
                  <IonLabel>Public</IonLabel>
                  <IonRadio slot='end' value='public'></IonRadio>
                </IonItem>
              </IonRadioGroup>
            </IonItem>
          </IonList>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default NewCompPage;
