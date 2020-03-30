import { IonCol, IonRow, IonGrid, IonCardTitle, IonCardHeader, IonCardContent, IonCard, IonBackButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonButton } from '@ionic/react';
import React from 'react';
import PaypalButton from "../components/PaypalButton"



const comp = {compName: "Firestorm Competition", fee: 25, 
              distance: "12km", position:"3rd", entrants: 41, 
              startDate: "02/31/2020", endDate: "03/31/2020"}
const team = {member1: "Alan Pintor",
              member2: "Akwasi Hima",
              member3: "Elder Guerra",
              member4: "Robert Slezak"}

const TeamDetailsPage: React.FC = () => {
  return (




    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle class="ion-text-center">Team</IonTitle>
          <IonButtons slot="end">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Current Competition</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <span>{comp.compName}</span>    $<span>{comp.fee}</span> <br></br>
            <span>{comp.distance}</span>, <span>{comp.position}</span>/<span>{comp.entrants}</span> Teams<br></br>
            Started: <span>{comp.startDate}</span><br></br>
            Ends: <span>{comp.endDate}</span>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardContent>
            <IonGrid> 
              <IonRow>
                <IonCol><IonHeader>MEMBERS</IonHeader></IonCol>  <IonCol><IonHeader>AVG</IonHeader></IonCol>
              </IonRow>
              <IonRow>
                <IonCol><span>{team.member1}</span></IonCol>  <IonCol><span> 3 </span>Km/h</IonCol>
              </IonRow>
              <IonRow>
                <IonCol><span>{team.member2}</span></IonCol>  <IonCol><span> 4 </span> Km/h</IonCol>
              </IonRow>
              <IonRow>
                <IonCol><span>{team.member3}</span></IonCol>  <IonCol><span> 3 </span>Km/h</IonCol>
              </IonRow>
              <IonRow>
                <IonCol><span>{team.member4}</span></IonCol>  <IonCol><span> 2 </span>Km/h</IonCol>
              </IonRow>
            </IonGrid>
            <IonButton color="success" slot="end">Invite</IonButton>

            <PaypalButton>

            </PaypalButton>

          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default TeamDetailsPage;
