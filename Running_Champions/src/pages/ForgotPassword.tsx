import { IonBackButton, IonButtons, IonContent, IonHeader, 
  IonMenuButton, IonPage, IonTitle, IonToolbar,IonItem,IonLabel,IonInput,IonButton } from '@ionic/react';
import React, { useState } from 'react';
import { toast } from '../helperFunctions/toast';
import {passwordReset} from "../components/firebaseConfig"

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [busy, setBusy] = useState<boolean>(false)

  async function forgetPassword() {
    if (email.trim() == "") {
      return toast('Email is required for this operation')
    }
    setBusy(true)
    const res = await passwordReset(email)
    if (res) {
      toast(`A email was sent to ${email}.`)
      window.history.replaceState({}, '', '/page/Login')
    } else {
      window.history.replaceState({}, '', '/page/Login')
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
          <IonTitle class="ion-text-center">Forgot Password</IonTitle>
          <IonButtons slot="end">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
      <form>
          <IonItem class='ion-margin-bottom ion-margin-top'>
            <IonLabel>Email:</IonLabel>
            <IonInput type='email' onIonChange={(e: any) => setEmail(e.target.value)} required></IonInput>
          </IonItem>
          <IonButton type='submit' class='ion-margin-horizontal ion-margin-top' shape='round' onClick={forgetPassword}>Send my password</IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default ForgotPasswordPage;
