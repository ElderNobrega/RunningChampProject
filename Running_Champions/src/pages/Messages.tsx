import { IonBackButton, IonButtons, IonContent, IonHeader, IonMenuButton,
   IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonTextarea  } from '@ionic/react';
import React from 'react';

const MessagesPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle class="ion-text-center">Messages</IonTitle>
          <IonButtons slot="end">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <form>
          <IonItem>
            <IonLabel position="floating">Title</IonLabel>
            <IonInput></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Message</IonLabel>
            <IonTextarea></IonTextarea>
          </IonItem>  
          <IonButton type='submit' class='ion-margin-horizontal ion-margin-top' shape='round'>Send</IonButton>  
        </form>
      </IonContent>
    </IonPage>
  );
};

export default MessagesPage;
