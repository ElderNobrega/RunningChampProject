import {
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFab, 
  IonFabButton,
  IonLabel,
  IonButton,
  IonItem,
  IonInput
  } from '@ionic/react';
import React, { useState } from 'react';
import '../css/Home.css'; 
import { useSelector } from 'react-redux';
import { getCurrentTeam, createTeam } from '../components/firebaseConfig';
import { toast } from '../helperFunctions/toast';
import { useHistory } from 'react-router';

const displayMembers = (members: any) => {
  var output: any[] = [];
  var keys = Object.keys(members);
  keys.forEach((e) => {
    output.push(<p key={members[e].userId}>{members[e].uName}</p>);
  });
  return output;
}

const teamContent = (currentTeam: any, newTeam: string, isLoggedIn: boolean, setTeam: any, history: any, isFetching: boolean) => {
  if (!isLoggedIn) {
    return (
      <p>
        Please log in to use this feature
      </p>
    )
  }
  else if (isFetching) {
    return (
      <p>
        Loading ...
      </p>
    )

  }
  else if (currentTeam.teamName) {
    return (
      <>
        <p>
          <b>Team Name</b>: {currentTeam.teamName}
        </p>
        <div>
          <b>Members</b>:
          {displayMembers(currentTeam.member)}
        </div>
      </>
    )
  }
  else {
    return (
      <>
        <IonItem class='ion-margin-bottom ion-margin-top'>
          <IonLabel>Team Name:</IonLabel>
          <IonInput type='text' onIonChange={(e: any) => setTeam(e.target.value)}></IonInput>
        </IonItem>
        <IonButton onClick={() => {
          if (newTeam === '') {
            toast('Team name cannot be empty');
          }
          else {
            createTeam(newTeam).then((res) => {
              if (res !== '') {
                 history.replace("/page/TeamDetails/" + res);
              }
            });
          }
          }}>
          Create Team
        </IonButton>
      </>
  );
  }
}

const HomePage: React.FC = () => {

  const [currentTeam, setTeam] = useState<any>({});
  const [newTeam, setNewTeam] = useState('');
  const [isFetching, setFetching] = useState(true);
  const history = useHistory();

  // undefined if not logged in
  const userEmail = useSelector((state: any) => {
    return state !== undefined ? 'Hi, ' + state.user.userEmail : undefined;
  })

  const userIsLoggedIn = useSelector((state: any) => {
    return state !== undefined;
  });

  if (isFetching) {
    getCurrentTeam().then((team) => {
      if (team) {
        setTeam(team);
      }
      setFetching(false);
    });
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonTitle class="ion-text-center home-title">Home</IonTitle>
          <IonLabel slot="end">{userEmail}</IonLabel>
          <IonButtons slot="end">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <IonCard className="home-card" button routerLink="/page/HistoryList" onClick={(e) => console.log('history page')}>
          <IonCardHeader>
            <IonCardTitle>History</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              History Content
            </p>
          </IonCardContent>
        </IonCard>

        <IonCard className="home-card" button routerLink={currentTeam.id ? "/page/TeamDetails/" + currentTeam.id : undefined} onClick={(e) => console.log('team page')} disabled={!userIsLoggedIn}>
          <IonCardHeader>
            <IonCardTitle>Team</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            {teamContent(currentTeam, newTeam, userIsLoggedIn, setNewTeam, history, isFetching)}
          </IonCardContent>
        </IonCard>

        <IonCard className="home-card" button routerLink="/page/CompetitionList" onClick={(e) => console.log('competition List page')} disabled={!userIsLoggedIn}>
          <IonCardHeader>
            <IonCardTitle>Competitions</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              { userIsLoggedIn ? "Competition Content" : "Please log in to use this feature" }
            </p>
          </IonCardContent>
        </IonCard>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton routerLink="/page/Tracking" onClick={(e) => console.log('tracking page')}>Start Run</IonFabButton>
        </IonFab>

      </IonContent>
    </IonPage>
  );
};

export default HomePage;
