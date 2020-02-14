import { IonBackButton,IonButtons,IonContent, IonHeader,IonMenuButton,IonPage,IonTitle, 
        IonToolbar,IonLabel,IonItem,IonInput,IonButton} from '@ionic/react';    
import React, { useState } from 'react';
import {loginUser} from '../components/firebaseConfig';
import {toast} from '../components/toast';

const LoginPage: React.FC = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function login() {
    const res = await loginUser(username, password)
    if (!res) {
      toast('Error loggin with your credentials')
    } else {
      toast('you have logged in!')
    }
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle class="ion-text-center">Login</IonTitle>
          <IonButtons slot="end">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <form>
          <IonItem class='ion-margin-bottom ion-margin-top'>
            <IonLabel>Email:</IonLabel>
            <IonInput type='email' onIonChange={(e: any) => setUsername(e.target.value)} required></IonInput>
          </IonItem>
          <IonItem class='ion-margin-bottom ion-margin-top' >
            <IonLabel>Password:</IonLabel>
            <IonInput type='password' onIonChange={(e: any) => setPassword(e.target.value)} required></IonInput>
          </IonItem>
          <IonButton class='ion-margin-horizontal ion-margin-top' shape='round' onClick={login}>Login</IonButton>
        </form>
      </IonContent>
      <IonContent>
        <IonLabel class='ion-margin-horizontal'>Forgot Password?</IonLabel>
        <IonButton class="login label" routerLink="/forgot" onClick={(e) => console.log('forgot page')}>
          Click here</IonButton>
      
        <div>
          <IonLabel class='ion-margin-horizontal'>Need an Account?</IonLabel>
          <IonButton class="login label" routerLink="/register" onClick={(e) => console.log('register page')}>
          Register here</IonButton>
           
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;



