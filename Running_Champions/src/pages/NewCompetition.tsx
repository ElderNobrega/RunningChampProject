import { IonBackButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonItem, IonList, 
         IonLabel, IonInput, IonRadioGroup, IonListHeader, IonRadio, IonButton, IonTextarea } from '@ionic/react';
import React from 'react';
import '../css/NewCompetition.css';

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

      <IonContent id="new-competition">
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
            <IonRadioGroup>
              <IonListHeader>
                <IonLabel>Competition type</IonLabel>
              </IonListHeader>
              <IonItem className="radio-item">
                <IonLabel>Private</IonLabel>
                <IonRadio value='private'></IonRadio>
              </IonItem>
              <IonItem className="radio-item">
                <IonLabel>Public</IonLabel>
                <IonRadio slot='end' value='public'></IonRadio>
              </IonItem>
            </IonRadioGroup>
            <IonItem>
              <IonLabel>Start Date:</IonLabel>
              <IonInput type='date' required></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>End Date:</IonLabel>
              <IonInput type='date' required></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>Description</IonLabel>
              <IonInput type='text' clearInput></IonInput>
            </IonItem>
          </IonList>
          <IonButton type='submit' class='--padding-start' shape='round'>Create Competition</IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default NewCompPage;
