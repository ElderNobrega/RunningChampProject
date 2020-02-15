import { IonBackButton, IonButtons, IonContent, IonHeader,
   IonMenuButton, IonPage, IonTitle, IonToolbar, IonItem,
   IonLabel,IonInput,IonButton, IonLoading } from '@ionic/react';
import React, { useState } from 'react';
import { toast } from '../helperFunctions/toast';
import {registerUser} from '../components/firebaseConfig'

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [fName, setFName] = useState('')
  const [lName, setLName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confPassword, setConfPassword] = useState('')
  const [phoneNum, setPhoneNum] = useState('')
  const [busy, setBusy] = useState<boolean>(false)

async function register() {
  setBusy(true)
  //validation
  if (password !== confPassword) {
    return toast('Passwords do not match')
  }
  if (email.trim() ==='' || password.trim() === '') {
    return toast('Username and password are required')
  }
  const res = await registerUser(email, password)
  if(res) {
    toast('You have registered successfully')
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
          <IonTitle class="ion-text-center">Register</IonTitle>
          <IonButtons slot="end">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonLoading message="Registration in progress..." duration={0} isOpen={busy}/>
      <IonContent>
      <form>
          <IonItem class='ion-margin-bottom ion-margin-top'>
            <IonLabel>Email:</IonLabel>
            <IonInput type='email' onIonChange={(e: any) => setEmail(e.target.value)} required></IonInput>
          </IonItem>
          <IonItem class='ion-margin-bottom ion-margin-top'>
            <IonLabel>First name:</IonLabel>
            <IonInput type='text' onIonChange={(e: any) => setFName(e.target.value)} required></IonInput>
          </IonItem>
          <IonItem class='ion-margin-bottom ion-margin-top'>
            <IonLabel>Last name:</IonLabel>
            <IonInput type='text' onIonChange={(e: any) => setLName(e.target.value)} required></IonInput>
          </IonItem>
          <IonItem class='ion-margin-bottom ion-margin-top'>
            <IonLabel>User name:</IonLabel>
            <IonInput type='text' onIonChange={(e: any) => setUsername(e.target.value)} required></IonInput>
          </IonItem>
          <IonItem class='ion-margin-bottom ion-margin-top' >
            <IonLabel>Password:</IonLabel>
            <IonInput type='password' onIonChange={(e: any) => setPassword(e.target.value)} required></IonInput>
          </IonItem>
          <IonItem class='ion-margin-bottom ion-margin-top'>
            <IonLabel>Confirm password:</IonLabel>
            <IonInput type='password' onIonChange={(e: any) => setConfPassword(e.target.value)} required></IonInput>
          </IonItem>
          <IonItem class='ion-margin-bottom ion-margin-top'>
            <IonLabel>Phone number:</IonLabel>
            <IonInput type='number' onIonChange={(e: any) => setPhoneNum(e.target.value)} required></IonInput>
          </IonItem>
          <IonButton class='ion-margin-horizontal ion-margin-top' shape='round' onClick={register}>Create Account</IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
