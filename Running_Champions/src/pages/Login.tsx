import { IonBackButton, 
        IonButtons,   
        IonContent, 
        IonHeader, 
        IonMenuButton, 
        IonPage, 
        IonTitle, 
        IonToolbar, 
        IonLabel, 
        IonItem, 
        IonInput,
        IonButton, IonFab, IonFabButton, } from '@ionic/react';    
import React from 'react';
import { register } from '../serviceWorker';

const LoginPage: React.FC = () => {
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
            <IonInput type='email' required></IonInput>
          </IonItem>
          <IonItem class='ion-margin-bottom ion-margin-top' >
            <IonLabel>Password:</IonLabel>
            <IonInput type='password' required></IonInput>
          </IonItem>
          <IonButton type='submit' class='ion-margin-horizontal ion-margin-top' shape='round'>Login</IonButton>
        </form>
      </IonContent>
      <IonContent>
        <IonLabel class='ion-margin-horizontal'>Forgot Password?</IonLabel>
        <IonButton fill='clear'>Click here</IonButton>
      
        <div>
          <IonLabel class='ion-margin-horizontal'>Need an Account?</IonLabel>
          <IonButton fill='clear'>Register here</IonButton>
           
        </div>

        <IonLabel className="login label" button routerLink="/register" onClick={(e) => console.log('register page')}>
          <IonHeader>
            <IonTitle>Register</IonTitle>
          </IonHeader>
          <IonContent>
            <p>
              Register Content
            </p>
          </IonContent>
        </IonLabel>

        <IonFab vertical ="button" horizontal="end" slot="fixed">
          <IonFabButton routerLink="/register" onClick={(e) => console.log('register page')}>Register here</IonFabButton>
        </IonFab>

      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
