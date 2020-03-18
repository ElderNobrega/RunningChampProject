import { IonBackButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonItem, IonList, 
         IonLabel, IonInput, IonRadioGroup, IonListHeader, IonRadio, IonButton, IonLoading } from '@ionic/react';
import React, { useState } from 'react';
import '../css/NewCompetition.css';
import {createCompetition} from '../components/firebaseConfig'
import { toast } from '../helperFunctions/toast';


const NewCompPage: React.FC = () => {

  const [name, setName] = useState('')
  const [fee, setFee] = useState<number>(0)
  const [compType, setCompType] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [description, setDescription] = useState('')
  const [busy, setBusy] = useState<boolean>(false)

  async function newComp() {

    setBusy(true)
    const res = await createCompetition(name, fee, compType ,startDate, endDate,description)
    if(res) {
      toast('You have created a new competition')
      window.history.replaceState({}, '','/page/NewCompetition')
    } else {
      toast('Try again')
    }
    setBusy(false)
  }

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
      <IonLoading message='Creating competition...' duration={0} isOpen={busy}/>

      <IonContent id="new-competition">
        <form>
          <IonList>
            <IonItem>
              <IonLabel>Name:</IonLabel>
              <IonInput placeholder='competition name' type='text' onIonChange={(e: any) => setName(e.target.value)} clearInput required></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>Fee $:</IonLabel>
              <IonInput type='number' onIonChange={(e: any) => setFee(e.target.value)} required></IonInput>
            </IonItem>
            <IonRadioGroup value={compType} onIonChange={(e: any) => setCompType(e.detail.value)}>
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
              <IonInput type='date' onIonChange={(e: any) => setStartDate(e.target.value)} required></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>End Date:</IonLabel>
              <IonInput type='date' onIonChange={(e: any) => setEndDate(e.target.value)} required></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>Description</IonLabel>
              <IonInput type='text' onIonChange={(e: any) => setDescription(e.target.value)} clearInput></IonInput>
            </IonItem>
          </IonList>
          <IonButton type='submit' class='--padding-start' shape='round' onClick={newComp}>Create Competition</IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default NewCompPage;
