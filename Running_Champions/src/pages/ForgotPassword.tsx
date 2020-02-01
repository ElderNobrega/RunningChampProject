import { IonBackButton, IonButtons, IonContent, IonHeader, 
  IonMenuButton, IonPage, IonTitle, IonToolbar,IonItem,IonLabel,IonInput,IonButton } from '@ionic/react';
import React from 'react';

const ForgotPasswordPage: React.FC = () => {
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
            <IonInput type='email' required></IonInput>
          </IonItem>
          <IonItem class='ion-margin-bottom ion-margin-top' >
            <IonLabel>Phone number:</IonLabel>
            <IonInput type='number' required></IonInput>
          </IonItem>
          <IonButton type='submit' class='ion-margin-horizontal ion-margin-top' shape='round'>Login</IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default ForgotPasswordPage;
