import { IonCol, IonRow, IonGrid, IonCardTitle, IonCardHeader, IonCardContent, IonCard, IonBackButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, withIonLifeCycle, IonItem, IonLabel, IonInput } from '@ionic/react';
import { IonButton } from '@ionic/react';
import PaypalButton from "../components/PaypalButton"
import React from 'react';
import { RouteComponentProps } from 'react-router';
import { getTeam, getCompetition, getCurrentUser, createInvite } from '../components/firebaseConfig';
import { toast } from '../helperFunctions/toast';

// TEMPORARY REMOVE LATER
const comp = {compName: "Firestorm Competition", fee: 25, 
              distance: "12km", position:"3rd", entrants: 41, 
              startDate: "02/31/2020", endDate: "03/31/2020"}

const displayMembers = (captain: string, members: any) => {
  var output: any[] = [];
  var keys = Object.keys(members);
  keys.forEach((e) => {
    let name = captain === members[e].userId ? members[e].uName + " (Captain)": members[e].uName;
    output.push(<IonRow key={members[e].userId}><IonCol><span>{name}</span></IonCol>  <IonCol><span>{members[e].distance} </span>Km</IonCol></IonRow>);
  });
  return output;
}

const displayCompetition = (competition: any) => {
  if (competition.name !== undefined) {
    console.log(competition);
    return(
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
    );  
  }
  else {
    return '';
  }
}

const displayInvite = (display: boolean, parent: any, team: string) => {
  if (display) {
    return(
      <IonCard>
      <IonCardContent>
        <IonItem class='ion-margin-bottom ion-margin-top'>
            <IonLabel>Email Address:</IonLabel>
            <IonInput type='email' onIonChange={(e: any) => parent.setState({isFetching: parent.state.isFetching, email: e.target.value})}></IonInput>
          </IonItem>
          <IonButton onClick={() => {
            if (parent.state.email === '') {
              toast('Email Address cannot be empty');
            }
            else {
              createInvite(parent.state.email, parent.team.id, parent.team.teamName).then((res) => {
                if (res) {
                  toast("Invite Sent");
                }
                else {
                  toast("No user with this email found");
                }
              });
            }
            }}>
            Invite New Member
          </IonButton>
      </IonCardContent>
    </IonCard>
    )  
  }
  else {
    return '';
  }
}

interface TeamDetailProps extends RouteComponentProps<{
  id: string;
}>{}

class TeamDetailsPage extends React.Component<TeamDetailProps> {

  state = {isFetching: true, email: ''};
  currentUser: string = '';
  team: any = {};
  comp: any = {};

  async ionViewWillEnter() {
    const user: any = await getCurrentUser();
    this.currentUser = user.uid;

    const team = await getTeam(this.props.match.params.id);
    if (team) {
      this.team = team;
      if (team.competitionId !== '') {
        const comp = await getCompetition(team.competitionId);
        if (comp) {
          this.comp = comp;
        }
      }
    }
    this.setState({isFetching: false, email: this.state.email});
  }

  render() {
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
        {displayCompetition(this.comp)}

        <IonCard>
          <IonCardContent>
            <IonCardHeader>
              <IonCardTitle>{this.team.teamName !== undefined ? this.team.teamName : ''}</IonCardTitle>
            </IonCardHeader>
            <IonGrid> 
              <IonRow>
                <IonCol><IonHeader>MEMBERS</IonHeader></IonCol>  <IonCol><IonHeader>DISTANCE</IonHeader></IonCol>
              </IonRow>
              {this.team.member !== undefined ? displayMembers(this.team.captain, this.team.member) : ''}
            </IonGrid>
          </IonCardContent>
        </IonCard>
        {displayInvite(this.currentUser === this.team.captain, this, this.team.id)}
        <PaypalButton />
      </IonContent>
    </IonPage>
  );
}
}

export default withIonLifeCycle(TeamDetailsPage);
