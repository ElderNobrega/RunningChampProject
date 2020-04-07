import { IonButtons, IonContent, IonHeader, IonMenuButton,
   IonPage, IonTitle, IonToolbar, IonButton, withIonLifeCycle, IonList, IonCard, IonCardHeader, IonCardTitle, IonCardContent  } from '@ionic/react';
import React from 'react';
import { getInvites, joinTeam } from '../components/firebaseConfig';
import { RouteComponentProps } from 'react-router';

class MessagesPage extends React.Component<RouteComponentProps> {

  state = {isFetching: true};
  invites: Array<any> = [];

  ionViewWillEnter() {
    getInvites().then((invites) => {
      this.invites = invites;
      console.log(invites);
      this.setState({isFetching: false});
    })
  }

  render() {
    let count = 0;
    let items = this.invites.map(invite => {
      count += 1;
      return (
        <IonCard key={ count } >
            <IonCardHeader>
              <IonCardTitle>
                  Team Invite
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <h2>
                You have been invited to join {invite.teamName}.
              </h2>
              <h2>
                Click the button below to join the team.
              </h2>
              <IonButton onClick={async () => {
                  var res = await joinTeam(invite.userId, invite.teamId);
                  if (res) {
                    this.props.history.replace("/page/TeamDetails/" + invite.teamId);
                  }
                }}>
                Join Team
              </IonButton>
            </IonCardContent>
        </IonCard>
      );
    });

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle class="ion-text-center">Messages</IonTitle>
            <IonButtons slot="end">
              <IonMenuButton />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
  
        <IonContent>
          <IonList>{ items }</IonList>
        </IonContent>
      </IonPage>
    );  
  }
};

export default withIonLifeCycle(MessagesPage);
